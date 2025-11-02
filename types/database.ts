export interface I18nText {
  en: string;
  fr?: string;
  ar?: string;
  es?: string;
  [key: string]: string | undefined;
}

export interface I18nArray {
  en: string[];
  fr?: string[];
  ar?: string[];
  es?: string[];
  [key: string]: string[] | undefined;
}

export interface Project {
  id: string;
  title_i18n: I18nText;
  slug: string;
  description_i18n: I18nText;
  long_description_i18n?: I18nText;
  thumbnail_url: string;
  tech_stack: string[];
  category: string;
  role_i18n?: I18nText;
  demo_url?: string;
  repo_url?: string;
  order: number;
  featured: boolean;
  year?: string;
  status?: string;
  created_at: string;
}

export interface Experience {
  id: string;
  institution_i18n?: I18nText;
  position_i18n: I18nText;
  location: string;
  start_date: string;
  end_date?: string;
  description_i18n?: I18nText;
  achievements_i18n?: I18nArray;
  logo_url?: string;
  order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name_i18n: I18nText;
  description_i18n?: I18nText;
  category: string;
  proficiency: number;
  years_experience: number;
  icon?: string;
  order: number;
  projects_count: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position_i18n: I18nText;
  company: string;
  content_i18n: I18nText;
  avatar_url?: string;
  company_logo_url?: string;
  featured: boolean;
  order: number;
  created_at: string;
}