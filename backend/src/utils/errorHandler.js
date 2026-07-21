// Express only recognizes 4-arg middleware as an error handler — `next` must stay in the
// signature even though it's never called.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') console.error(err.stack);
  else console.error(err.message);

  const message = err.status ? err.message : 'Internal server error';
  res.status(err.status || 500).json({ message });
};
