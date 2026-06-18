const username = "shXX1F";
const pagesRepo = `${username.toLowerCase()}.github.io`;

const fallbackProjects = [
  {
    name: "personal-homepage",
    description: "用于展示个人介绍、项目入口和 GitHub 资料的静态主页。",
    language: "HTML",
    stars: 0,
    forks: 0,
    html_url: `https://github.com/${username}/${pagesRepo}`,
    homepage: "",
    updated_at: new Date().toISOString()
  },
  {
    name: "web-toolkit",
    description: "可替换为你做过的 Web 小工具、课程作品或完整应用。",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    html_url: `https://github.com/${username}`,
    homepage: "",
    updated_at: new Date().toISOString()
  },
  {
    name: "automation-lab",
    description: "可替换为自动化脚本、数据处理项目或 AI 实验项目。",
    language: "Python",
    stars: 0,
    forks: 0,
    html_url: `https://github.com/${username}`,
    homepage: "",
    updated_at: new Date().toISOString()
  }
];

const grid = document.querySelector("#project-grid");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short"
  }).format(new Date(value));
}

function metaItem(value) {
  return value ? `<span>${value}</span>` : "";
}

function projectCard(project) {
  const description = project.description || "这个项目暂时还没有描述。";
  const language = project.language || "Project";
  const liveUrl = project.homepage && project.homepage.startsWith("http") ? project.homepage : "";

  return `
    <article class="project-card">
      <div>
        <h3>${project.name}</h3>
        <p>${description}</p>
        <div class="project-meta" aria-label="Project metadata">
          ${metaItem(language)}
          ${metaItem(`${project.stargazers_count ?? project.stars ?? 0} stars`)}
          ${metaItem(`${project.forks_count ?? project.forks ?? 0} forks`)}
          ${metaItem(`更新于 ${formatDate(project.updated_at)}`)}
        </div>
      </div>
      <div class="project-links">
        <a href="${project.html_url}" target="_blank" rel="noreferrer">
          <i data-lucide="github" aria-hidden="true"></i>
          Repo
        </a>
        ${
          liveUrl
            ? `<a href="${liveUrl}" target="_blank" rel="noreferrer">
                <i data-lucide="external-link" aria-hidden="true"></i>
                Live
              </a>`
            : ""
        }
      </div>
    </article>
  `;
}

function renderProjects(projects) {
  grid.innerHTML = projects.map(projectCard).join("");
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

async function loadProjects() {
  const endpoint = `https://api.github.com/users/${username}/repos?sort=updated&per_page=9`;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = await response.json();
    const ownRepos = repos.filter((repo) => !repo.fork).slice(0, 6);
    renderProjects(ownRepos.length > 0 ? ownRepos : fallbackProjects);
  } catch (error) {
    renderProjects(fallbackProjects);
  } finally {
    window.clearTimeout(timeout);
  }
}

loadProjects();

if (window.lucide) {
  window.lucide.createIcons();
}
