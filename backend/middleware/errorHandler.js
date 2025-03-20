export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message || err); 

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Hide stack in production
    });
};
