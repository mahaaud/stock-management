export function getUserId() {
    // This is just a mock of authentication
    // The actual way to do this is to implement the authentication system and get the userId based on their authenticated session.
    const existingUserId = localStorage.getItem('userId');
    if (existingUserId) {
        return existingUserId;
      } else {
        const newUserId = Math.random().toString(36).slice(2, 11); // Generate a random ID
        localStorage.setItem('userId', newUserId);
        return newUserId;
      }
}