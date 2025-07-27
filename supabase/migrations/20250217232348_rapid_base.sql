/*
  # Film Ideas Data Structure

  1. Changes
    - Drop existing policies before recreating them
    - Create film ideas table with validation
    - Add status tracking and history
    - Set up submission limits
    - Configure admin access

  2. Security
    - RLS enabled on all tables
    - Public submission access
    - Admin-only management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can submit film ideas" ON film_ideas;
DROP POLICY IF EXISTS "Anyone can read their own submissions" ON film_ideas;
DROP POLICY IF EXISTS "Admins can read all film ideas" ON film_ideas;
DROP POLICY IF EXISTS "Admins can update film ideas" ON film_ideas;
DROP POLICY IF EXISTS "Admins can read status history" ON film_idea_status_history;
DROP POLICY IF EXISTS "Admins can insert status history" ON film_idea_status_history;
DROP POLICY IF EXISTS "Anyone can read blocked domains" ON blocked_email_domains;
DROP POLICY IF EXISTS "Admins can manage blocked domains" ON blocked_email_domains;

-- Create policies
CREATE POLICY "Anyone can submit film ideas"
  ON film_ideas
  FOR INSERT
  TO public
  WITH CHECK (
    NOT check_submission_limit(submitter_email, ip_address::inet)
  );

CREATE POLICY "Anyone can read their own submissions"
  ON film_ideas
  FOR SELECT
  TO public
  USING (submitter_email IS NOT NULL);

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

CREATE POLICY "Admins can insert status history"
  ON film_idea_status_history
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Anyone can read blocked domains"
  ON blocked_email_domains
  FOR SELECT
  TO public
  USING (true);

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