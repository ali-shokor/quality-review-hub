async function loadSubmissions() {
  const container = document.getElementById("submissionsContainer");

  try {
    const res = await apiFetch("/api/submissions/");
    const submissions = await res.json();

    if (!submissions.length) {
      container.innerHTML = `<div class="text-muted">No submissions found</div>`;
      return;
    }

    container.innerHTML = submissions.map(s => `
      <div class="col-md-6">
        <div class="card p-3 h-100">
          <div class="d-flex justify-content-between">
            <h5>${s.title}</h5>
            <span class="badge bg-${getStatusColor(s.status)}">${s.status}</span>
          </div>

          <p class="text-secondary">${s.content.slice(0, 120)}...</p>

          <div class="mt-auto">
            <small class="text-muted">
              Project ID: ${s.project}
            </small>
          </div>
        </div>
      </div>
    `).join("");

  } catch (err) {
    container.innerHTML = `<div class="text-danger">Failed to load submissions</div>`;
  }
}

function getStatusColor(status) {
  if (status === "pending") return "warning";
  if (status === "in_review") return "info";
  if (status === "reviewed") return "success";
  return "secondary";
}

document.addEventListener("DOMContentLoaded", loadSubmissions);