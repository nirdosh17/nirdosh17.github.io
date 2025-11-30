function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const projectData = [
  {
    imgSrc: "./assets/project_cfn_teardown.png",
    imgAlt: "Project CFN Teardown",
    title: "CFN Teardown",
    tags: ["Go", "AWS", "DevOps", "CLI", "CloudFormation", "Infra as Code"],
    githubLink: "https://github.com/nirdosh17/cfn-teardown",
    liveDemo: null
  },
  {
    imgSrc: "./assets/project_go_playground.png",
    imgAlt: "Project Go Playground",
    title: "Go Playground",
    tags: ["Go", "React", "Docker", "Linux"],
    githubLink: "https://github.com/nirdosh17/go-sandbox",
    liveDemo: "https://goplayground.dev/"
  },
  {
    imgSrc: "./assets/project_tracer.png",
    imgAlt: "Project Packet Tracer",
    title: "Packet Tracer",
    tags: ["Go", "CLI", "Networking"],
    githubLink: "https://github.com/nirdosh17/tracer",
    liveDemo: null
  },
  {
    imgSrc: "./assets/project_go_sdk_template.png",
    imgAlt: "Project Go SDK Template",
    title: "Go SDK Template",
    tags: ["Go", "SDK"],
    githubLink: "https://github.com/nirdosh17/go-sdk-template",
    liveDemo: null
  },
  {
    imgSrc: "./assets/project_go_lsp.png",
    imgAlt: "Project Go LSP",
    title: "Go Language Server",
    tags: ["Go", "LSP", "Neovim"],
    githubLink: "https://github.com/nirdosh17/golsp",
    liveDemo: null
  },
  {
    imgSrc: "./assets/project_cv.png",
    imgAlt: "Project Computer Vision",
    title: "Computer Vision",
    tags: ["Python", "OpenCV"],
    githubLink: "https://github.com/nirdosh17/computer-vision-examples",
    liveDemo: null
  }
];


function createProjectElement(project) {
  const projectElement = document.createElement('div');
  projectElement.className = 'details-container color-container project-list-item';

  projectElement.innerHTML = `
    <div class="article-container">
      <img
        src="${project.imgSrc}"
        alt="${project.imgAlt}"
        class="project-img"
      />
    </div>
    <h2 class="experience-sub-title project-title">${project.title}</h2>
    <div class="tags_container">
      ${project.tags.map(tag => `<div class="tag">${tag}</div>`).join('')}
    </div>
    <div class="btn-container">
      <button
        class="btn btn-color-2 project-btn"
        onclick="window.open('${project.githubLink}', '_blank')"
      >
        Github
      </button>
      ${project.liveDemo ? `
        <button
          class="btn btn-color-2 project-btn"
          onclick="window.open('${project.liveDemo}', '_blank')"
        >
          Live Demo
        </button>
      ` : ''}
    </div>
  `;

  return projectElement;
}

let showingAllProjects = false;
const numProjectsToShow = 3;

function toggleProjects() {
  const hiddenContainer = document.getElementById("hidden-projects");
  const button = document.querySelector("#show-more-container button");

  if (showingAllProjects) {
    // Hide additional projects
    hiddenContainer.style.maxHeight = "0";
    button.textContent = "Show More";
  } else {
    // Show all projects
    const hiddenProjects = projectData.slice(numProjectsToShow).map(createProjectElement);
    hiddenContainer.innerHTML = "";
    hiddenProjects.forEach(project => hiddenContainer.appendChild(project));

    // Use setTimeout to ensure the transition happens
    setTimeout(() => {
      hiddenContainer.style.maxHeight = hiddenContainer.scrollHeight + "px";
    }, 10);

    button.textContent = "Show Less";
  }

  showingAllProjects = !showingAllProjects;
}

// Initial load of first N projects
window.addEventListener("load", () => {
  const container = document.getElementById("project-container");
  projectData.slice(0, numProjectsToShow).forEach(project => {
    container.appendChild(createProjectElement(project));
  });

  // Set copyright year dynamically
  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // Initialize scroll animations
  initScrollAnimations();
});

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(section);
  });

  // Observe cards and containers
  const animatedElements = document.querySelectorAll('.details-container, .color-container, .blog-card');
  animatedElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(element);
  });
}
