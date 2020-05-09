const asyncHandler = fn => (req, res, next) =>
  // Make sure to `.catch()` any errors and pass them along to the `next()`
  // middleware in the chain, in this case the error handler.
  Promise.resolve(fn(req, res, next)).catch(next);
module.exports = asyncHandler;
