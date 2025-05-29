const API_BASE_URL = "/api/reviews"; // Change port if needed

const reviewService = {
  // Add a new review
  createReview: async ({ user_id, film_id, rating, review , media_type}) => {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, film_id, rating, review, media_type }),
    });
    if (!res.ok) throw new Error("Erreur lors de la création de l'avis");
    return await res.json();
  },

  // Get all reviews
  getAllReviews: async () => {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) throw new Error("Erreur lors de la récupération des avis");
    return await res.json();
  },

  // Get reviews by film ID
  getReviewsByFilmId: async (film_id) => {
    const res = await fetch(`${API_BASE_URL}/film/${film_id}`);
    if (!res.ok) throw new Error("Erreur lors de la récupération des avis du film");
    return await res.json();
  },

  // Update a review
 updateReview: async ({ user_id, film_id, rating, review, media_type }) => {
    const res = await fetch(API_BASE_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, film_id, rating, review, media_type }),
    });
    if (!res.ok) throw new Error("Erreur lors de la mise à jour de l'avis");
    return await res.json();
  },

  // Delete a review
  deleteReview: async ({ user_id, film_id }) => {
    const res = await fetch(API_BASE_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, film_id }),
    });
    if (!res.ok) throw new Error("Erreur lors de la suppression de l'avis");
    return await res.json();
  },
};

export default reviewService;
