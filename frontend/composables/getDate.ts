export const getDate = (): Date => {
    const dateString = new Date().toISOString().split('T')[0];
    return new Date(dateString);
} 
  