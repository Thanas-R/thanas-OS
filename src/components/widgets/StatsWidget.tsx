import { useState, useEffect } from 'react';
import { FolderGit2, GitBranch, Star } from 'lucide-react';

export const StatsWidget = () => {
  const [stats, setStats] = useState({ repos: 0, stars: 0, projects: 0 });

  useEffect(() => {
    fetch('https://api.github.com/users/Thanas-R')
      .then(res => res.json())
      .then(data => {
        setStats({
          repos: data.public_repos || 0,
          stars: data.followers || 0,
          projects: 12, // Static for now
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="backdrop-blur-macos-heavy rounded-2xl p-4 shadow-macos-glass w-64"
      style={{
        background: 'hsl(var(--macos-glass))',
        border: '1px solid hsl(var(--macos-glass-border))',
      }}
    >
      <h3 className="text-sm font-semibold mb-3 opacity-90">Quick Stats</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-primary" />
            <span className="text-sm">Repositories</span>
          </div>
          <span className="text-lg font-bold">{stats.repos}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-primary" />
            <span className="text-sm">Projects</span>
          </div>
          <span className="text-lg font-bold">{stats.projects}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm">Followers</span>
          </div>
          <span className="text-lg font-bold">{stats.stars}</span>
        </div>
      </div>
    </div>
  );
};
