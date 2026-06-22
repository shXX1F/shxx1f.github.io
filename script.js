const username = "shXX1F";

const fallbackProjects = [
  {
    name: "基于 Python 的智能网联汽车设计",
    description: "在仿真平台开发动态换线决策与博弈算法，负责 ADA 场景和连续变道场景代码开发与仿真测试。",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    html_url: `https://github.com/${username}`,
    homepage: "",
    updated_at: "2025-03-01"
  },
  {
    name: "基于AI+区块链的双引擎驱动的智能投融资平台",
    description: "面向实时数据分析与动态风险预警需求，参与平台设计、需求预测、部分技术实现和研究报告撰写。",
    language: "AI / Blockchain",
    stargazers_count: 0,
    forks_count: 0,
    html_url: `https://github.com/${username}`,
    homepage: "",
    updated_at: "2023-05-01"
  },
  {
    name: "轻量化仿生式水面救援机器人",
    description: "负责 3D 建模与 CFD 仿真，围绕流场、阻力分布和推进效率进行分析，为结构优化提供依据。",
    language: "CFD",
    stargazers_count: 0,
    forks_count: 0,
    html_url: `https://github.com/${username}`,
    homepage: "",
    updated_at: "2025-06-01"
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
