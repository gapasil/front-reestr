export const autoReload = (delay: number = 5000): void => {
  setTimeout(() => {
    window.location.reload();
  }, delay);
};
