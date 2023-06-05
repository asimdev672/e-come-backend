// not Found
const notFound = (req, res, next) => {
  const error = new Error(`Not found : ${req?.orignalUrl}`);
  res.status(404);
  next(error);
};
// Error Handler

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: "fail",
    message: err?.message,
    error: err?.stack,
  });

  next(err);
};

module.exports = { notFound, errorHandler };
