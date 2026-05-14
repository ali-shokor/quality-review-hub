async function loadProjects() {
  const res = await apiFetch("/api/projects/");
  const projects = await res.json();

  const select = document.getElementById("projectSelect");

  select.innerHTML = `
    <option value="">Choose Project</option>
  `;

  projects.forEach(project => {
    select.innerHTML += `
      <option value="${project.id}">
        ${project.name}
      </option>
    `;
  });
}

async function loadSubmissions() {
  const res = await apiFetch("/api/submissions/");
  const submissions = await res.json();

  const container = document.getElementById("submissionsList");

  if (!submissions.length) {
    container.innerHTML = `
      <div class="text-muted">No submissions yet</div>
    `;
    return;
  }

  container.innerHTML = submissions.map(submission => `
    <div class="list-group-item bg-transparent text-light border-secondary mb-3">

      <h5>${submission.title}</h5>

      <div class="small text-warning mb-2">
        Project ID: ${submission.project}
      </div>

      <p class="mb-0">
        ${submission.content}
      </p>

    </div>
  `).join("");
}

document
  .getElementById("submissionForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {
      project: document.getElementById("projectSelect").value,
      title: document.getElementById("submissionTitle").value,
      content: document.getElementById("submissionContent").value,
    };

    const res = await apiFetch("/api/submissions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      document.getElementById("submissionForm").reset();

      loadSubmissions();
    }
  });

loadProjects();
loadSubmissions();