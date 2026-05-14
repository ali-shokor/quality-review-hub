async function loadReviews() {

  const reviewsContainer =
    document.getElementById("reviewsContainer");

  const submissionSelect =
    document.getElementById("submissionSelect");

  const criterionSelect =
    document.getElementById("criterionSelect");

  // FETCH DATA
  const reviewsRes =
    await apiFetch("/api/reviews/");

  const submissionsRes =
    await apiFetch("/api/submissions/");

  const criteriaRes =
    await apiFetch("/api/criteria/");

  const reviews =
    await reviewsRes.json();

  const submissions =
    await submissionsRes.json();

  const criteria =
    await criteriaRes.json();

  // LOAD SUBMISSIONS
  submissionSelect.innerHTML =
    submissions.map(sub => `
      <option value="${sub.id}">
        ${sub.title}
      </option>
    `).join("");

  // LOAD CRITERIA
  criterionSelect.innerHTML =
    criteria.map(c => `
      <option value="${c.id}">
        ${c.name}
      </option>
    `).join("");

  // EMPTY STATE
  if (!reviews.length) {

    reviewsContainer.innerHTML = `
      <div class="text-muted">
        No reviews yet.
      </div>
    `;

    return;
  }

  // SHOW REVIEWS
  reviewsContainer.innerHTML =
    reviews.map(review => `

      <div class="card mb-3 p-3 bg-dark text-light border-secondary">

        <h5 class="mb-2">
          Submission #${review.submission}
        </h5>

        <div>
          <strong>Criterion:</strong>
          ${review.criterion}
        </div>

        <div>
          <strong>Score:</strong>
          ${review.score}
        </div>

        <div class="mt-2">
          <strong>Feedback:</strong><br>
          ${review.feedback || ""}
        </div>

      </div>

    `).join("");
}

document
  .getElementById("reviewForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const submission =
      document.getElementById("submissionSelect").value;

    const criterion =
      document.getElementById("criterionSelect").value;

    const score =
      document.getElementById("score").value;

    const feedback =
      document.getElementById("feedback").value;

    const response = await apiFetch(
      "/api/reviews/",
      {
        method: "POST",

        body: JSON.stringify({

          submission: submission,

          criterion: criterion,

          score: parseFloat(score),

          feedback: feedback

        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {

      alert(JSON.stringify(data));

      return;
    }

    document.getElementById("reviewForm").reset();

    loadReviews();
});

loadReviews();