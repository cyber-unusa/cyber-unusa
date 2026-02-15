const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Terjadi kesalahan pdaserver internal";

  res.status(statusCode).json({
    success: false,
    message: message,
    //! Tampilkan stack trace hanya saat mode development untuk proses debug
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
