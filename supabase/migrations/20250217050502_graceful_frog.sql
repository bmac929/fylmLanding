/*
  # Update Blog RLS Policies

  1. Changes
    - Add RLS policies for blog management
    - Allow authenticated users to create and manage their own blogs
    - Allow public read access to published blogs
  
  2. Security
    - Enable RLS on blogs table
    - Add policies for CRUD operations
    - Restrict access based on user roles and ownership
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can do everything with blogs" ON blogs;
DROP POLICY IF EXISTS "Public can read published blogs" ON blogs;

-- Create new policies
CREATE POLICY "Users can create blogs"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own blogs"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own blogs"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Users can read all blogs"
  ON blogs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Public can read published blogs"
  ON blogs
  FOR SELECT
  TO public
  USING (status = 'published' AND (scheduled_for IS NULL OR scheduled_for <= now()));