/* ==========================================
   SeaBreeze IL
   Luxury Projects — Clean Card Layout
   ========================================== */

const projects = [
  {
    name: "BRABUS Island",
    subtitle: "BRABUS ISLAND BAKU",
    description: "מגורי יוקרה בסטנדרט בינלאומי",
    selectName: "BRABUS Island Baku",
    image: "./SeaBreeze_BRABUS_page/brabus-images/garden.jpg",
    link: "brabus.html"
  },
  {
    name: "Panorama",
    subtitle: "BY ELIE SAAB",
    description: "מגורים יוקרתיים בעיצוב ייחודי",
    selectName: "Panorama by ELIE SAAB",
    image: "./panorama-images/panorama-main.jpg",
    link: "#contact"
  },
  {
    name: "Reportage Heights",
    subtitle: "BAKU",
    description: "דירות מגורים בפרויקט מודרני",
    selectName: "Reportage Heights",
    image: "./reportage-images/reportage-main.jpg",
    link: "#contact"
  },
  {
    name: "Sabah Towers",
    subtitle: "BAKU",
    description: "מגדלי מגורים בעיצוב מודרני",
    selectName: "Sabah Towers",
    image: "./sabah-images/sabah-main.jpg",
    link: "#contact"
  },
  {
    name: "Arabian Ranches",
    subtitle: "SEA BREEZE",
    description: "מגורי יוקרה בהשראת אדריכלות מזרחית",
    selectName: "Arabian Ranches",
    image: "./arabian-images/arabian-images/arabian-main.jpg",
    link: "#contact"
  },
  {
    name: "Marina Village",
    subtitle: "SEA BREEZE",
    description: "מגורים באווירת חוף ומרינה",
    selectName: "Marina Village",
    image: "./marina-images/marina-main.jpg",
    link: "#contact"
  }
];

/* ==========================================
   CREATE PROJECT CARDS
   ========================================== */

const projectGrid = document.getElementById("projectGrid");

if (projectGrid) {
  projectGrid.innerHTML = projects.map(project => `
    <article class="project-card">

      <div class="project-image">
        <img
          src="${project.image}"
          alt="${project.selectName}"
          loading="lazy"
        >
      </div>

      <div class="project-info">

        <h3>${project.name}</h3>

        <div class="project-subtitle">
          ${project.subtitle}
        </div>

        <p>${project.description}</p>

        <a
          href="${project.link}"
          class="gold-btn project-link"
          data-project="${project.selectName}"
        >
          צפייה בפרויקט ←
        </a>

      </div>

    </article>
  `).join("");
}

/* ==========================================
   SELECT PROJECT IN CONTACT FORM
   ========================================== */

document.querySelectorAll(".project-link").forEach(link => {

  link.addEventListener("click", () => {

    const selectedProject = link.dataset.project;

    const projectSelect = document.querySelector(
      "#leadForm select"
    );

    if (projectSelect) {
      projectSelect.value = selectedProject;
    }

  });

});

/* ==========================================
   DEMO CONTACT FORM
   ========================================== */

const leadForm = document.getElementById("leadForm");

if (leadForm) {

  leadForm.addEventListener("submit", event => {

    event.preventDefault();

    alert(
      "הטופס פועל בגרסת הדגמה. בשלב הבא נחבר אותו לקבלת פניות אמיתיות."
    );

  });

}
