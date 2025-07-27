/*
  # Create blogs and blog suggestions tables

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text, unique)
      - `slug` (text, unique)
      - `content` (jsonb)
      - `banner_image` (text)
      - `tags` (text[])
      - `status` (text)
      - `author_id` (uuid, references auth.users)
      - `scheduled_for` (timestamptz)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `blog_suggestions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage blogs
    - Add policies for public users to read published blogs
    - Add policies for public users to create blog suggestions
*/

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  banner_image text,
  tags text[] DEFAULT ARRAY[]::text[],
  status text NOT NULL DEFAULT 'draft',
  author_id uuid REFERENCES auth.users NOT NULL,
  scheduled_for timestamptz,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'pending', 'published'))
);

-- Create blog suggestions table
CREATE TABLE IF NOT EXISTS blog_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected', 'used'))
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_suggestions ENABLE ROW LEVEL SECURITY;

-- Blogs policies
CREATE POLICY "Admins can do everything with blogs"
  ON blogs
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ))
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "Public can read published blogs"
  ON blogs
  FOR SELECT
  TO public
  USING (status = 'published' AND (scheduled_for IS NULL OR scheduled_for <= now()));

-- Blog suggestions policies
CREATE POLICY "Anyone can create blog suggestions"
  ON blog_suggestions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can manage blog suggestions"
  ON blog_suggestions
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ))
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "Public can read approved blog suggestions"
  ON blog_suggestions
  FOR SELECT
  TO public
  USING (status = 'approved');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_blog_suggestions_updated_at
  BEFORE UPDATE ON blog_suggestions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();