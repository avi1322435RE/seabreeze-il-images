// SeaBreeze IL — Projects

const projects = [
  {
    name: "BRABUS Island",
    subtitle: "BRABUS ISLAND BAKU",
    description: "פרויקט מגורים יוקרתי בבאקו.",
    selectName: "BRABUS Island Baku",
    image: "./SeaBreeze_BRABUS_page/brabus-images/garden.jpg",
    link: "brabus.html"
  },
  {
    name: "Panorama",
    subtitle: "BY ELIE SAAB",
    description: "פרויקט מגורים בעיצוב ייחודי.",
    selectName: "Panorama by ELIE SAAB",
    image: "./panorama-images/panorama-main.jpg",
    link: "#contact"
  },
  {
    name: "Reportage Heights",
    subtitle: "BAKU",
    description: "פרויקט מגורים בבאקו.",
    selectName: "Reportage Heights",
    image: "./reportage-images/reportage-main.jpg",
    link: "#contact"
  },
  {
    name: "Sabah Towers",
    subtitle: "BAKU",
    description: "פרויקט מגורים בבאקו.",
    selectName: "Sabah Towers",
    image: "./sabah-images/sabah-main.jpg",
    link: "#contact"
  },
  {
    name: "Arabian Ranches",
    subtitle: "SEA BREEZE",
    description: "פרויקט מגורים יוקרתי באזור Sea Breeze, בהשראת אדריכלות מזרחית.",
    selectName: "Arabian Ranches",
    image: "./arabian-images/arabian-images/arabian-main.jpg",
    link: "#contact"
  },
  {
    name: "Marina Village",
    subtitle: "SEA BREEZE",
    description: "פרויקט מגורים באזור Sea Breeze.",
    selectName: "Marina Village",
    image: "./marina-images/marina-main.jpg",
    link: "#contact"
  }
];

// יצירת כרטיסי הפרויקטים
const projectGrid = document.getElementById("projectGrid");

if (projectGrid) {
  projectGrid.innerHTML = projects.map(project => `
    <article class="project-card">

      <div class="project-image">
        ${project.image
          ? `<img src="${project.image}" alt="${project.selectName}" loading="lazy">`
          : ""}
      </div>

      <div class="project-info">

        <h3>${project.name}</h3>

        <div style="
          color:#b18a52;
          font-size:11px;
          letter-spacing:2px;
          margin-top:5px;
        ">
          ${project.subtitle}
        </div>

        <p>${project.description}</p>

        <div class="project-price">
          מחיר התחלתי: יעודכן לאחר אימות
          <br>
          USD · ILS · AZN
        </div>

        <a href="${project.link}"
           class="gold-btn project-link"
           data-project="${project.selectName}">
          קבלת פרטים ומחירון ←
        </a>

      </div>
    </article>
  `).join("");
}

// לחיצה על פרויקט בוחרת אותו בטופס
document.querySelectorAll(".project-link").forEach(link => {
  link.addEventListener("click", () => {
    const selectedProject = link.dataset.project;
    const projectSelect = document.querySelector("#leadForm select");

    if (projectSelect) {
      projectSelect.value = selectedProject;
    }
  });
});

// טופס הדגמה — עדיין אינו שולח פניות
const leadForm = document.getElementById("leadForm");

if (leadForm) {
  leadForm.addEventListener("submit", event => {
    event.preventDefault();

    alert(
      "הטופס פועל בגרסת הדגמה. בשלב הבא נחבר אותו לקבלת פניות אמיתיות."
    );
  });
}
