const errorHandler = (err, req, res, next) => {
  if (err.joi) {
    const errorMessages = err.joi.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send({
      message: errorMessages,
    });
  }

  const { statusCode = 500, message } = err;
  return res.status(statusCode).send({
    message: statusCode === 500 ? "An internal server error occurred" : message,
  });
};

module.exports = errorHandler;
