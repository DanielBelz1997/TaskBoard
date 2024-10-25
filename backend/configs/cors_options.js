const allowedOrigins = require("./allowed_origins.js");

/**
 * CORS configuration options for handling cross-origin requests.
 *
 * This configuration checks if the request's origin is allowed based on the
 * `allowedOrigins` array. If the origin is permitted or if there is no origin
 * (for non-browser requests), the request is allowed. Otherwise, an error is raised.
 *
 * @module corsOptions
 */

const corsOptions = {
  origin: (origin, cb) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
