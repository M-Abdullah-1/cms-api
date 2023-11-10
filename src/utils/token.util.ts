import jwt from "jsonwebtoken";

/**
 * Generates a JSON Web Token (JWT) for the given user ID.
 *
 * @function signToken
 * @memberof utils
 * @param {any} id - User ID to be included in the JWT payload.
 * @returns {string | undefined} - JWT string if generated successfully, otherwise undefined.
 */
export const signToken = (id: any): string | undefined => {
  /**
   * Secret key used for signing the JWT.
   *
   * @type {string | undefined}
   */
  const JWT_SECRET = process.env.JWT_SECRET;

  if (JWT_SECRET !== undefined) {
    /**
     * Generate and return the JWT with the provided user ID.
     *
     * @type {string}
     */
    return jwt.sign({ id }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } else {
    /**
     * Log a message if the JWT secret is undefined.
     */
    console.log("token not generated!");
    return undefined;
  }
};
