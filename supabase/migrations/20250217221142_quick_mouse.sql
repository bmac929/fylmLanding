/*
  # Film Ideas Feature

  1. New Tables
    - `film_ideas`
      - Core table for storing film idea submissions
      - Includes reference number, user info, and idea details
    - `film_idea_status_history`
      - Tracks status changes and admin actions
    - `blocked_email_domains`
      - Stores list of blocked disposable email domains

  2. Functions
    - `generate_reference_number()`
      - Generates unique FILM-XXXXX reference numbers
    - `check_submission_limit()`
      - Enforces 2 submissions per day limit

  3. Security
    - RLS policies for public submission and admin management
*/

-- Create enum for film idea status
CREATE TYPE film_idea_status AS ENUM (
  'pending',
  'reviewed',
  'approved',
  'rejected'
);

-- Create film ideas table
CREATE TABLE IF NOT EXISTS film_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text UNIQUE NOT NULL,
  submitter_name text NOT NULL,
  submitter_email text NOT NULL,
  submitter_phone text,
  submitter_career text,
  idea_name text NOT NULL,
  genres text[] NOT NULL,
  description text NOT NULL,
  status film_idea_status NOT NULL DEFAULT 'pending',
  admin_notes text,
  contact_agreed boolean NOT NULL DEFAULT false,
  ip_address inet NOT NULL,
  submission_count integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT description_min_length CHECK (length(description) >= 100),
  CONSTRAINT idea_name_max_length CHECK (length(idea_name) <= 45)
);

-- Create status history table
CREATE TABLE IF NOT EXISTS film_idea_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  film_idea_id uuid NOT NULL REFERENCES film_ideas(id) ON DELETE CASCADE,
  old_status film_idea_status,
  new_status film_idea_status NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  changed_at timestamptz NOT NULL DEFAULT now()
);

-- Create blocked email domains table
CREATE TABLE IF NOT EXISTS blocked_email_domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text NOT NULL UNIQUE,
  is_wildcard boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Function to generate reference numbers
CREATE OR REPLACE FUNCTION generate_reference_number()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  new_ref text;
  exists boolean;
BEGIN
  LOOP
    -- Generate a random 5-digit number
    new_ref := 'FILM-' || lpad(floor(random() * 100000)::text, 5, '0');
    
    -- Check if it exists
    SELECT EXISTS (
      SELECT 1 FROM film_ideas WHERE reference_number = new_ref
    ) INTO exists;
    
    -- Exit loop if unique
    EXIT WHEN NOT exists;
  END LOOP;
  
  RETURN new_ref;
END;
$$;

-- Function to check submission limit
CREATE OR REPLACE FUNCTION check_submission_limit(p_email text, p_ip inet)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  email_count integer;
  ip_count integer;
BEGIN
  -- Count submissions for email in last 24 hours
  SELECT COUNT(*)
  INTO email_count
  FROM film_ideas
  WHERE submitter_email = p_email
  AND created_at > now() - interval '24 hours';

  -- Count submissions for IP in last 24 hours
  SELECT COUNT(*)
  INTO ip_count
  FROM film_ideas
  WHERE ip_address = p_ip
  AND created_at > now() - interval '24 hours';

  -- Return true if either limit is reached
  RETURN email_count >= 2 OR ip_count >= 2;
END;
$$;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_film_ideas_updated_at
  BEFORE UPDATE ON film_ideas
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Trigger to track status changes
CREATE OR REPLACE FUNCTION track_status_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO film_idea_status_history (
      film_idea_id,
      old_status,
      new_status,
      changed_by
    ) VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER track_film_ideas_status_changes
  AFTER UPDATE ON film_ideas
  FOR EACH ROW
  EXECUTE PROCEDURE track_status_changes();

-- Enable RLS
ALTER TABLE film_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE film_idea_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_email_domains ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Film Ideas policies
CREATE POLICY "Anyone can submit film ideas"
  ON film_ideas
  FOR INSERT
  TO public
  WITH CHECK (
    NOT check_submission_limit(submitter_email, ip_address::inet)
  );

CREATE POLICY "Admins can read all film ideas"
  ON film_ideas
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can update film ideas"
  ON film_ideas
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Status History policies
CREATE POLICY "Admins can read status history"
  ON film_idea_status_history
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Blocked Domains policies
CREATE POLICY "Admins can manage blocked domains"
  ON blocked_email_domains
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Public can read blocked domains"
  ON blocked_email_domains
  FOR SELECT
  TO public
  USING (true);

-- Insert initial blocked domains
INSERT INTO blocked_email_domains (domain, is_wildcard) VALUES
  ('tempmail.com', true),
  ('10minutemail.com', false),
  ('guerrillamail.com', false),
  ('throwawaymail.com', true),
  ('mailinator.com', true),
  ('yopmail.com', true),
  ('tempinbox.com', true),
  ('disposablemail.com', true),
  ('trashmail.com', true),
  ('sharklasers.com', false)
ON CONFLICT (domain) DO NOTHING;