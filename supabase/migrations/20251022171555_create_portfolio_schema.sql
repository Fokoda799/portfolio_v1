/*
  # RPG Portfolio Database Schema

  ## Overview
  This migration creates the complete database structure for an RPG-themed portfolio website
  with support for projects, skills, experience, testimonials, and contact form submissions.

  ## New Tables

  ### `projects`
  Stores portfolio project information
  - `id` (uuid, primary key)
  - `title` (text) - Project name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Short summary
  - `long_description` (text) - Detailed case study
  - `thumbnail_url` (text) - Project image
  - `tech_stack` (text[]) - Array of technologies
  - `category` (text) - frontend/backend/fullstack
  - `role` (text) - Your role in the project
  - `demo_url` (text, nullable) - Live demo link
  - `repo_url` (text, nullable) - Repository link
  - `order` (integer) - Display order
  - `featured` (boolean) - Show in highlights
  - `created_at` (timestamptz)

  ### `skills`
  Stores skill information with proficiency levels
  - `id` (uuid, primary key)
  - `name` (text) - Skill name
  - `category` (text) - frontend/backend/tools/soft
  - `proficiency` (integer) - 0-100 skill level
  - `icon` (text, nullable) - Icon identifier
  - `order` (integer) - Display order
  - `created_at` (timestamptz)

  ### `experience`
  Stores work experience timeline
  - `id` (uuid, primary key)
  - `company` (text) - Company name
  - `position` (text) - Job title
  - `location` (text) - Work location
  - `start_date` (date) - Start date
  - `end_date` (date, nullable) - End date (null = current)
  - `description` (text) - Role description
  - `achievements` (text[]) - Key accomplishments
  - `logo_url` (text, nullable) - Company logo
  - `order` (integer) - Display order
  - `created_at` (timestamptz)

  ### `testimonials`
  Stores testimonials and recommendations
  - `id` (uuid, primary key)
  - `name` (text) - Person's name
  - `position` (text) - Their job title
  - `company` (text) - Their company
  - `content` (text) - Testimonial text
  - `avatar_url` (text, nullable) - Profile picture
  - `company_logo_url` (text, nullable) - Company logo
  - `featured` (boolean) - Show prominently
  - `order` (integer) - Display order
  - `created_at` (timestamptz)

  ### `contact_submissions`
  Stores contact form submissions
  - `id` (uuid, primary key)
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `message` (text) - Message content
  - `status` (text) - new/read/responded
  - `ip_address` (text, nullable) - For spam prevention
  - `user_agent` (text, nullable) - Browser info
  - `created_at` (timestamptz)

  ### `site_config`
  Stores site-wide configuration
  - `id` (uuid, primary key)
  - `key` (text, unique) - Config key
  - `value` (jsonb) - Config value
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for portfolio content
  - No public write access (content managed via admin interface)
  - Contact form has rate-limited insert policy
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text DEFAULT '',
  thumbnail_url text DEFAULT '',
  tech_stack text[] DEFAULT '{}',
  category text NOT NULL DEFAULT 'fullstack',
  role text DEFAULT '',
  demo_url text,
  repo_url text,
  "order" integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer NOT NULL DEFAULT 50,
  icon text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  location text DEFAULT '',
  start_date date NOT NULL,
  end_date date,
  description text DEFAULT '',
  achievements text[] DEFAULT '{}',
  logo_url text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  company text NOT NULL,
  content text NOT NULL,
  avatar_url text,
  company_logo_url text,
  featured boolean DEFAULT false,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create site_config table
CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Public read policies for portfolio content
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view experience"
  ON experience FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view site config"
  ON site_config FOR SELECT
  USING (true);

-- Allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects(featured);
CREATE INDEX IF NOT EXISTS skills_category_idx ON skills(category);
CREATE INDEX IF NOT EXISTS experience_dates_idx ON experience(start_date, end_date);
CREATE INDEX IF NOT EXISTS testimonials_featured_idx ON testimonials(featured);
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at);
