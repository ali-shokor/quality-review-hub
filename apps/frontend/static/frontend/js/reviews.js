async function loadReviews() {
  const container = document.getElementById("reviewsContainer");

  try {
    const res = await apiFetch("/api/reviews/");
    const reviews = await res.json();

    if (!reviews.length) {
      container.innerHTML = `<div class="text-muted">No reviews yet</div>`;
      return;
    }

    container.innerHTML = reviews.map(r => `
      <div class="col-md-6">
        <div class="card p-3 h-100">
          <div class="d-flex justify-content-between">
            <h5>Score: ${r.score}/10</h5>
            <span class="badge bg-primary">Review</span>
          </div>

          <p class="text-secondary">${r.feedback || "No feedback"}</p>

          <div class="mt-auto">
            <small class="text-muted">
              Submission ID: ${r.submission} | Criterion ID: ${r.criterion}
            </small>
          </div>
        </div>
      </div>
    `).join("");

  } catch (err) {
    container.innerHTML = `<div class="text-danger">Failed to load reviews</div>`;
  }
}

document.addEventListener("DOMContentLoaded", loadReviews);