'use client';

import ProjectCart from "@/components/ProjectCart";
import useGitHubRepos from "@/hooks/useGitHubRepos";
import { useTranslations } from "next-intl";
import React from "react";

export default function Projects() {
  const { repos, loading, error, refetch } = useGitHubRepos('ArifEminK', true);
  const t = useTranslations('projects');
  return (
    <div className="bg-bg-primary min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-b from-card to-bg-primary border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground font-GoogleSansCode-Medium">
                {t('projectsTitle')}
              </h1>
              <p className="text-muted font-GoogleSansCode-Light mt-2">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 flex flex-col items-center justify-center lg:justify-between">
        <div className="mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-danger font-GoogleSansCode-Light text-lg mb-4">
                {error}
              </p>
              <button
                onClick={refetch}
                className="bg-accent hover:bg-accent-light text-foreground px-4 py-2 rounded-lg font-GoogleSansCode-Medium transition-colors duration-300"
              >
                Tekrar Dene
              </button>
            </div>
          ) : repos && repos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-4 lg:gap-4">
              {repos.map((repo) => (
                <ProjectCart key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted font-GoogleSansCode-Light text-lg">
                Henüz proje bulunmuyor.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}