const username = "shXX1F";

const fallbackProjects = [
  {
    name: "个人主页多页面版",
    description: "把个人主页拆成首页、个人作品、人生历程和关于联系几个页面，方便长期更新。",
    language: "HTML",
    stargazers_count: 0,
    forks_count: 0,
    html_url: `https://github.com/${username}/${username.toLowerCase()}.github.io`,
    homepage: `https://${username.toLowerCase()}.github.io/`,
    updated_at: new Date().toISOString()
  },
  {
    name: "Web 作品集",
    description: "可以替换成课程页面、前端练习、交互小作品或其他已经完成的项目。",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: `https://github.com/${username}`,
    homepage: "",
    updated_at: new Date().toISOString()
  },
  {
    name: "学习实验记录",
    description: "用来整理学习过程中的实验、笔记、脚本和阶段性成果。",
    language: "Project",
    stargazers_count: 0,
    forks_count: 0,
    html_url: `https://github.com/${username}?tab=repositories`,
    homepage: "",
    updated_at: new Date().toISOString()
  }
];

const projectGrids = [...document.querySelectorAll("[data-project-grid]")];

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "最近";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short"
  }).format(date);
}

function metaItem(value) {
  return value ? `<span>${escapeHtml(value)}</span>` : "";
}

function projectCard(project) {
  const description = project.description || "这个项目暂时还没有描述，可以稍后补充项目目标、技术栈和完成情况。";
  const language = project.language || "Project";
  const repoUrl = project.html_url || `https://github.com/${username}`;
  const liveUrl = project.homepage && project.homepage.startsWith("http") ? project.homepage : "";
  const stars = project.stargazers_count ?? project.stars ?? 0;
  const forks = project.forks_count ?? project.forks ?? 0;

  return `
    <article class="project-card">
      <div>
        <h3>${escapeHtml(project.name)}</h3>
        <p>${escapeHtml(description)}</p>
        <div class="project-meta" aria-label="项目元信息">
          ${metaItem(language)}
          ${metaItem(`${stars} stars`)}
          ${metaItem(`${forks} forks`)}
          ${metaItem(`更新于 ${formatDate(project.updated_at)}`)}
        </div>
      </div>
      <div class="project-links">
        <a href="${escapeHtml(repoUrl)}" target="_blank" rel="noreferrer">
          <i data-lucide="github" aria-hidden="true"></i>
          Repo
        </a>
        ${
          liveUrl
            ? `<a href="${escapeHtml(liveUrl)}" target="_blank" rel="noreferrer">
                <i data-lucide="external-link" aria-hidden="true"></i>
                Live
              </a>`
            : ""
        }
      </div>
    </article>
  `;
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderProjects(projects) {
  projectGrids.forEach((grid) => {
    const limit = Number.parseInt(grid.dataset.projectLimit || "6", 10);
    grid.innerHTML = projects.slice(0, limit).map(projectCard).join("");
  });

  refreshIcons();
}

async function loadProjects() {
  if (projectGrids.length === 0) {
    refreshIcons();
    return;
  }

  const endpoint = `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2600);

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = await response.json();
    const ownRepos = repos.filter((repo) => !repo.fork);
    renderProjects(ownRepos.length > 0 ? ownRepos : fallbackProjects);
  } catch (error) {
    renderProjects(fallbackProjects);
  } finally {
    window.clearTimeout(timeout);
  }
}

loadProjects();
refreshIcons();
