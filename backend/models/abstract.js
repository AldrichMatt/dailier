export const getTimestamps = () => {
  const now = new Date().toISOString();
  return {
    created_at: now,
    updated_at: now
  };
};