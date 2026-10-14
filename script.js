// SeaBreeze IL — Projects

const projects = [
  {
    name: "BRABUS Island",
    subtitle: "BRABUS ISLAND BAKU",
    description: "פרויקט מגורים יוקרתי בבאקו.",
    selectName: "BRABUS Island Baku"
  },
  {
    name: "Panorama",
    subtitle: "BY ELIE SAAB",
    description: "פרויקט מגורים בעיצוב ייחודי.",
    selectName: "Panorama by ELIE SAAB"
  },
  {
    name: "Reportage Heights",
    subtitle: "BAKU",
    description: "פרויקט מגורים בבאקו.",
    selectName: "Reportage Heights"
  },
  {
    name: "Sabah Towers",
    subtitle: "BAKU",
    description: "פרויקט מגורים בבאקו.",
    selectName: "Sabah Towers"
  },
  {
    name: "Arabian Ranches",
    subtitle: "BAKU",
    description: "פרויקט מגורים בבאקו.",
    selectName: "Arabian Ranches"
  },
  {
    name: "Marina Village",
    subtitle: "SEA BREEZE",
    description: "פרויקט מגורים באזור Sea Breeze.",
    selectName: "Marina Village"
  }
];
  {
    name: "Panorama",
    subtitle: "BY ELIE SAAB",
    description: "פרויקט מגורים בעיצוב ייחודי.",
    selectName: "Panorama by ELIE SAAB"
  },
  {
 
  },
  {
    name: "Reportage Heights",
    subtitle: "BAKU",
    description: "פרויקט מגורים בבאקו.",
    selectName: "Reportage Heights"
  },
  {
    name: "Sabah Towers",
    subtitle: "BAKU",
    description: "פרויקט מגורים בבאקו.",
    selectName: "Sabah Towers"
  },
  {
  {
    name: "Arabian Ranches",
    subtitle: "BAKU",
    description: "פרויקט מגורים בבאקו.",
    selectName: "Arabian Ranches"
  },
  {
    name: "Marina Village",
    subtitle: "SEA BREEZE",
    description: "פרויקט מגורים באזור Sea Breeze.",
    selectName: "Marina Village"
  }
  }
];

// יצירת כרטיסי הפרויקטים
const projectGrid = document.getElementById("projectGrid");

projectGrid.innerHTML = projects.map(project => `
  <article class="project-card">

    <div class="project-image">
      ${project.name === "BRABUS Island"
        ? '<img src="./SeaBreeze_BRABUS_page/brabus-images/garden.jpg" alt="BRABUS Island Baku" loading="lazy">'
        : project.name === "Panorama"
        ? '<img src="./panorama-images/panorama-main.jpg" alt="Panorama by ELIE SAAB" loading="lazy">'
       : project.name === "Marina Village"
? '<img src="./marina-images/marina-main.jpg" alt="Marina Village Sea Breeze" loading="lazy">'
: project.name === "Reportage Heights"
? '<img src="./reportage-images/reportage-main.jpg" alt="Reportage Heights Baku" loading="lazy">'
: ''}
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

      <a href="${project.name === 'BRABUS Island' ? 'brabus.html' : '#contact'}"
         class="gold-btn project-link"
         data-project="${project.selectName}">
        קבלת פרטים ומחירון ←
      </a>

    </div>
  </article>
`).join("");

// לחיצה על פרויקט בוחרת אותו בטופס
document.querySelectorAll(".project-link").forEach(link => {
  link.addEventListener("click", () => {
    const selectedProject = link.dataset.project;
    const projectSelect = document.querySelector("#leadForm select");

    projectSelect.value = selectedProject;
  });
});

// טופס הדגמה — עדיין אינו שולח פניות
document.getElementById("leadForm").addEventListener("submit", event => {
  event.preventDefault();

  alert(
    "הטופס פועל בגרסת הדגמה. בשלב הבא נחבר אותו לקבלת פניות אמיתיות."
  );
});
