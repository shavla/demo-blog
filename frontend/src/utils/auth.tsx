export const isTokenValid = (): boolean => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    // Decode JWT payload to check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;

    if (payload.exp < currentTime) {
      // Token expired - remove it
      localStorage.removeItem('token');
      return false;
    }

    return true;
  } catch (error) {
    // Invalid token format
    localStorage.removeItem('token');
    return false;
  }
};

export const isAdmin = (): boolean => {
  const token = getToken();
  if (token) {
    return JSON.parse(atob(token.split('.')[1])).role == "admin";
  }
  return false;
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};
