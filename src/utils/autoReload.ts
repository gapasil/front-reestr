export const autoReload = (delay: number = 5000) => {
  setTimeout(() => {
    window.location.reload();
  }, delay);
};
