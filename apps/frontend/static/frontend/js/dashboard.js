async function safeFetch(url) {
  try {
    const res = await apiFetch(url);

    if (!res || !res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error for:", url, error);
    return [];
  }
}

async function loadDashboard() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    window.location.href = "/";
    return;
  }

  const projects = await safeFetch("/api/projects/");
  const submissions = await safeFetch("/api/submissions/");
  const reviews = await safeFetch("/api/reviews/");

  const projectsCount = document.getElementById("projectsCount");
  const submissionsCount = document.getElementById("submissionsCount");
  const reviewsCount = document.getElementById("reviewsCount");
  const pendingCount = document.getElementById("pendingCount");
  const list = document.getElementById("projectsList");

  if (projectsCount) projectsCount.textContent = projects.length;
  if (submissionsCount) submissionsCount.textContent = submissions.length;
  if (reviewsCount) reviewsCount.textContent = reviews.length;

  const pending = submissions.filter((s) => s.status === "pending").length;
  if (pendingCount) pendingCount.textContent = pending;

  if (!list) return;

  if (!projects.length) {
    list.innerHTML = `<div class="text-muted">No projects yet</div>`;
    return;
  }

  list.innerHTML = projects
    .map(
      (p) => `
      <div class="list-group-item bg-transparent text-light border-secondary">
        <div class="fw-bold">${p.name}</div>
        <small>${p.description || ""}</small>
      </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", loadDashboard);