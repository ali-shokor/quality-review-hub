console.log("PROJECTS JS LOADED");

async function loadProjects() {
  const container = document.getElementById("projectsContainer");

  try {
    const res = await apiFetch("/api/projects/");
    const projects = await res.json();

    if (!projects.length) {
      container.innerHTML = `
        <div class="text-muted">No projects found</div>
      `;
      return;
    }

    container.innerHTML = projects.map(p => `
      <div class="col-md-4">
        <div class="card p-3 h-100">
          <h5>${p.name}</h5>
          <p class="text-secondary">${p.description || "No description"}</p>

          <div class="mt-auto">
            <small class="text-muted">
              Owner ID: ${p.owner}
            </small>
          </div>
        </div>
      </div>
    `).join("");

  } catch (err) {
    container.innerHTML = `
      <div class="text-danger">Failed to load projects</div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadProjects);