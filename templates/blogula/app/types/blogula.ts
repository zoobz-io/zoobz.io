export interface BlogulaSocial {
  label: string;
  to: string;
  icon: string;
}

export interface BlogulaEvent {
  date: string;
  title: string;
  icon: string;
  description: string;
  link?: string;
}

export interface EnrichedProject {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}
