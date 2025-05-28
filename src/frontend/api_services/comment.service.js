const baseUrl = '/api/comments'; // Change this if needed

// Create a comment
export async function createComment(commentData) {
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to create comment: ${err.message}`);
  }
}

// Get all comments
export async function getAllComments() {
  try {
    const res = await fetch(baseUrl);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to fetch comments: ${err.message}`);
  }
}

// Get comments by film ID
export async function getCommentsByFilmId(film_id) {
  try {
    const res = await fetch(`${baseUrl}/film/${film_id}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to fetch film comments: ${err.message}`);
  }
}

// Delete a comment by ID
export async function deleteComment(id) {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to delete comment: ${err.message}`);
  }
}

export async function likeComment(commentId, userId) {
  try {
    const res = await fetch(`${baseUrl}/like/${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to like comment: ${err.message}`);
  }
}

export async function dislikeComment(commentId, userId) {
  try {
    const res = await fetch(`${baseUrl}/dislike/${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to dislike comment: ${err.message}`);
  }
}


