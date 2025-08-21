import { useState, useEffect, useCallback } from "react";
import { GitHubRepo } from "../../types/GitHubRepo";

interface UseGitHubReposReturn {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useGitHubRepos = (
  username: string = "ArifEminK",
  excludeForks: boolean = true
): UseGitHubReposReturn => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `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`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `GitHub API error: ${response.status} - ${response.statusText}`
        );
      }

      const data: GitHubRepo[] = await response.json();

      // Fork olan projeleri filtrele (isteğe bağlı)
      const filteredRepos = excludeForks
        ? data.filter((repo: GitHubRepo) => !repo.fork)
        : data;

      // Repoları created_at alanına göre sırala (en yeni olanlar önce)
      const sortedRepos = filteredRepos.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setRepos(sortedRepos);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu";
      setError(errorMessage);
      console.error("GitHub repos fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [username, excludeForks]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return {
    repos,
    loading,
    error,
    refetch: fetchRepos,
  };
};

export default useGitHubRepos;
export type { UseGitHubReposReturn };
