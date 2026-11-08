// 构建时从 GitHub API 补全仓库元数据。CI 中有 GITHUB_TOKEN，本地无 token 时走匿名额度
// （60 次/小时，足够）。任何失败都只打印警告并返回 null，不阻断构建。

export interface RepoMeta {
  stars: number;
  pushedAt: string;
  language: string | null;
  archived: boolean;
}

const cache = new Map<string, Promise<RepoMeta | null>>();

export function repoMeta(repo: string): Promise<RepoMeta | null> {
  let hit = cache.get(repo);
  if (!hit) {
    hit = fetchRepo(repo);
    cache.set(repo, hit);
  }
  return hit;
}

async function fetchRepo(repo: string): Promise<RepoMeta | null> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'zuoliangyu-pages-hub',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
    if (!res.ok) {
      console.warn(`[github] ${repo}: HTTP ${res.status}`);
      return null;
    }
    const d = await res.json();
    return {
      stars: d.stargazers_count,
      pushedAt: d.pushed_at,
      language: d.language,
      archived: d.archived,
    };
  } catch (err) {
    console.warn(`[github] ${repo}: ${(err as Error).message}`);
    return null;
  }
}
