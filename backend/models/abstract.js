// ----------------------
// use this to get current time (safe way)
// uses matching format with the database
// ----------------------
export const getTimestamps = () => {
  const now = new Date().toISOString();
  return {
    created_at: now,
    updated_at: now
  };
};