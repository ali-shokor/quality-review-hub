async function loadProjects() {

  const res = await apiFetch("/api/projects/");

  const projects = await res.json();

  const container =
    document.getElementById("projectsList");

  if (!projects.length) {

    container.innerHTML = `
      <div class="text-muted">
        No projects yet
      </div>
    `;

    return;
  }

  container.innerHTML = projects.map(project => `

    <div class="list-group-item bg-transparent text-light border-secondary mb-3">

      <h5>${project.name}</h5>

      <p class="mb-0">
        ${project.description || ""}
      </p>

    </div>

  `).join("");
}

document
  .getElementById("projectForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {

      name:
        document.getElementById("projectName").value,

      description:
        document.getElementById("projectDescription").value,
    };

    const res = await apiFetch("/api/projects/", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    if (res.ok) {

      document
        .getElementById("projectForm")
        .reset();

      loadProjects();
    }
  });

loadProjects();