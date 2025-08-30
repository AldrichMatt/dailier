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


/**
 * TO DO
 * @param {*} time HH:mm format
 * @returns YYYY-MM-DDTHH:mm:ss.xxxZ
 */
export const formatCheckinDatetime = (req) => {
  const time = req.body ? req.body.time : req
  const date = new Date()

  const hour = time.split(':')[0]
  const minute = time.split(':')[1]
  
  console.log(date);
  
  date.setHours(hour)
  date.setMinutes(minute)
  date.setSeconds(0,0)

  return console.log(date);
}