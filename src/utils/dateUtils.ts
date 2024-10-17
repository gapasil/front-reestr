type DateUtils = {
  parseDate: (dateString: string) => Date;
  formatDate: (date: Date) => string;
  getTime: (date: Date) => string;
  isFuture: (date: Date) => boolean;
};

export const dateUtils: DateUtils = {
  // Parse the date string into a Date object
  parseDate: (dateString: string) => new Date(dateString),

  // Format the date to a readable format (e.g., YYYY-MM-DD)
  formatDate: (date: Date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
  },

  // Get the time in hours and minutes
  getTime: (date: Date) => {
    const d = new Date(date);
    return d.toTimeString().split(' ')[0]; // Returns 'HH:MM:SS'
  },

  // Check if the date is in the future
  isFuture: (date: Date) => new Date(date) > new Date(),
};
