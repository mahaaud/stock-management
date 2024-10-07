export function getUserId() {
    const existingUserId = localStorage.getItem('userId');
    if (existingUserId) {
        return existingUserId;
      } else {
        const newUserId = Math.random().toString(36).slice(2, 11); // Generate a random ID
        localStorage.setItem('userId', newUserId);
        return newUserId;
      }
}