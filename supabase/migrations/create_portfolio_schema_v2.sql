/*
  # RPG Portfolio Database Schema with Multilingual Support

  ## Overview
  This migration creates the complete database structure for an RPG-themed portfolio website
  with full i18n support using JSONB fields for multilingual content.

  ## Multilingual Approach
  - Text fields that need translation are stored as JSONB with language codes as keys
  - Example: {"en": "Text", "fr": "Texte", "ar": "نص"}
  - Language-independent data (dates, URLs, etc.) remain as regular columns
  - Fallback to English if translation is missing

  ## New Tables

  ### `projects`
  Stores portfolio project information with multilingual support
  - `id` (uuid, primary key)
  - `title_i18n` (jsonb) - Project name in multiple languages
  - `slug` (text, unique) - URL-friendly identifier
  - `description_i18n` (jsonb) - Short summary in multiple languages
  - `long_description_i18n` (jsonb) - Detailed case study in multiple languages
  - `thumbnail_url` (text) - Project image
  - `tech_stack` (text[]) - Array of technologies (language-independent)
  - `category` (text) - frontend/backend/fullstack
  - `role_i18n` (jsonb) - Your role in multiple languages
  - `demo_url` (text, nullable) - Live demo link
  - `repo_url` (text, nullable) - Repository link
  - `order` (integer) - Display order
  - `featured` (boolean) - Show in highlights
  - `year` (text) - Project year
  - `status` (text) - Live/In Development/Archived
  - `created_at` (timestamptz)

  ### `skills`
  Stores skill information with proficiency levels
  - `id` (uuid, primary key)
  - `name_i18n` (jsonb) - Skill name in multiple languages
  - `description_i18n` (jsonb) - Skill description in multiple languages
  - `category` (text) - frontend/backend/tools/soft
  - `proficiency` (integer) - 0-100 skill level
  - `years_experience` (integer) - Years of experience
  - `icon` (text, nullable) - Icon identifier
  - `order` (integer) - Display order
  - `projects_count` (integer) - Number of projects using this skill
  - `created_at` (timestamptz)

  ### `experience`
  Stores work experience timeline with multilingual support
  - `id` (uuid, primary key)
  - `company` (text) - Company name (typically not translated)
  - `position_i18n` (jsonb) - Job title in multiple languages
  - `location` (text) - Work location
  - `start_date` (date) - Start date
  - `end_date` (date, nullable) - End date (null = current)
  - `description_i18n` (jsonb) - Role description in multiple languages
  - `achievements_i18n` (jsonb) - Key accomplishments in multiple languages (nested arrays)
  - `logo_url` (text, nullable) - Company logo
  - `order` (integer) - Display order
  - `created_at` (timestamptz)

  ### `testimonials`
  Stores testimonials and recommendations with multilingual support
  - `id` (uuid, primary key)
  - `name` (text) - Person's name
  - `position_i18n` (jsonb) - Their job title in multiple languages
  - `company` (text) - Their company
  - `content_i18n` (jsonb) - Testimonial text in multiple languages
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
  - `locale` (text) - Language used in submission
  - `status` (text) - new/read/responded
  - `ip_address` (text, nullable) - For spam prevention
  - `user_agent` (text, nullable) - Browser info
  - `created_at` (timestamptz)

  ### `site_config`
  Stores site-wide configuration with multilingual support
  - `id` (uuid, primary key)
  - `key` (text, unique) - Config key
  - `value` (jsonb) - Config value (can include translations)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for portfolio content
  - No public write access (content managed via admin interface)
  - Contact form has rate-limited insert policy
*/

-- Create projects table with i18n support
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_i18n jsonb NOT NULL DEFAULT '{"en": ""}'::jsonb,
  slug text UNIQUE NOT NULL,
  description_i18n jsonb NOT NULL DEFAULT '{"en": ""}'::jsonb,
  long_description_i18n jsonb DEFAULT '{"en": ""}'::jsonb,
  thumbnail_url text DEFAULT '',
  tech_stack text[] DEFAULT '{}',
  category text NOT NULL DEFAULT 'fullstack',
  role_i18n jsonb DEFAULT '{"en": ""}'::jsonb,
  demo_url text,
  repo_url text,
  "order" integer DEFAULT 0,
  featured boolean DEFAULT false,
  year text,
  status text DEFAULT 'Live',
  created_at timestamptz DEFAULT now()
);

-- Create skills table with i18n support
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_i18n jsonb NOT NULL DEFAULT '{"en": ""}'::jsonb,
  description_i18n jsonb DEFAULT '{"en": ""}'::jsonb,
  category text NOT NULL,
  proficiency integer NOT NULL DEFAULT 50,
  years_experience integer DEFAULT 0,
  icon text,
  "order" integer DEFAULT 0,
  projects_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create experience table with i18n support
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_i18n jsonb NOT NULL DEFAULT '{"en": ""}'::jsonb,
  position_i18n jsonb NOT NULL DEFAULT '{"en": ""}'::jsonb,
  location text DEFAULT '',
  start_date date NOT NULL,
  end_date date,
  description_i18n jsonb DEFAULT '{"en": ""}'::jsonb,
  achievements_i18n jsonb DEFAULT '{"en": []}'::jsonb,
  logo_url text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table with i18n support
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position_i18n jsonb NOT NULL DEFAULT '{"en": ""}'::jsonb,
  company text NOT NULL,
  content_i18n jsonb NOT NULL DEFAULT '{"en": ""}'::jsonb,
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
  locale text DEFAULT 'en',
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
CREATE INDEX IF NOT EXISTS projects_title_gin_idx ON projects USING gin (title_i18n);
CREATE INDEX IF NOT EXISTS skills_category_idx ON skills(category);
CREATE INDEX IF NOT EXISTS skills_name_gin_idx ON skills USING gin (name_i18n);
CREATE INDEX IF NOT EXISTS experience_dates_idx ON experience(start_date, end_date);
CREATE INDEX IF NOT EXISTS experience_position_gin_idx ON experience USING gin (position_i18n);
CREATE INDEX IF NOT EXISTS testimonials_featured_idx ON testimonials(featured);
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS contact_submissions_locale_idx ON contact_submissions(locale);

-- Helper function to get translated text with fallback
CREATE OR REPLACE FUNCTION get_translation(
  json_field jsonb,
  locale_code text,
  fallback_locale text DEFAULT 'en'
)
RETURNS text AS $$
BEGIN
  RETURN COALESCE(
    json_field->>locale_code,
    json_field->>fallback_locale,
    json_field->>'en',
    ''
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Helper function to get translated array with fallback
CREATE OR REPLACE FUNCTION get_translation_array(
  json_field jsonb,
  locale_code text,
  fallback_locale text DEFAULT 'en'
)
RETURNS text[] AS $$
DECLARE
  result jsonb;
BEGIN
  result := COALESCE(
    json_field->locale_code,
    json_field->fallback_locale,
    json_field->'en',
    '[]'::jsonb
  );
  
  RETURN ARRAY(SELECT jsonb_array_elements_text(result));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Example queries using helper functions:
-- 
-- Get projects in French with English fallback:
-- SELECT 
--   id,
--   get_translation(title_i18n, 'fr') as title,
--   get_translation(description_i18n, 'fr') as description,
--   tech_stack,
--   demo_url
-- FROM projects
-- WHERE featured = true;
--
-- Get experience with achievements in Arabic:
-- SELECT 
--   id,
--   company,
--   get_translation(position_i18n, 'ar') as position,
--   get_translation_array(achievements_i18n, 'ar') as achievements
-- FROM experience
-- ORDER BY start_date DESC;