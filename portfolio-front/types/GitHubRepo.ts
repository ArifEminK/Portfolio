export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    fork: boolean;
    owner: {
      login: string;
    };
    created_at: string;
    updated_at: string;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
  }