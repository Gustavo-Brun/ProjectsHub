function validateSession() {
  const userId = sessionStorage.userId;

  if (isNaN(userId) || userId == (undefined || null)) {
    window.location = '/auth/signin';
  }

  return;
}
