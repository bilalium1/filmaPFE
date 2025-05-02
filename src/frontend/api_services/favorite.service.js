// favorites.service.js

export const addFavorite = async (userId, movieId, mediaType) => {
    try {
      // Validate inputs
      if (!userId || !movieId) {
        throw new Error('Both user ID and movie ID are required');
      }
  
      const response = await fetch(`api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id_user: userId.toString(), // Convert to string explicitly
          id_film: movieId.toString(),
          media_type: mediaType.toString()
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add favorite');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
};

export const getAllFavorites = async () => {
  try {
    const response = await fetch(`api/favorites`);

    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching all favorites:', error);
    throw error;
  }
};

export const getUserFavorites = async (userId) => {
  try {
    const response = await fetch(`api/favorites/user/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user favorites');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw error;
  }
};

export const removeFavorite = async (userId, movieId, mediaType) => {
    try {
      const response = await fetch(`api/favorites/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id_user: userId.toString(), // Convert to string explicitly
          id_film: movieId.toString(),
          media_type: mediaType.toString()
        }),
      });
  
      if (response.status === 204) return true;
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to remove favorite');
      }
  
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
};

export const isFavorite = async (userId, movieId, mediaType) => {
  try {
    const favorites = await getUserFavorites(userId);
    return favorites.some(fav => (fav.id_film === movieId && fav.media_type == mediaType));
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};