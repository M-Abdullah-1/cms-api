/**
 * Interface representing a user document.
 *
 * @interface IUser
 * @extends Document
 */
export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  password: string;
  passwordConfirm: string | null;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: boolean;
  /**
   * Method to check if the provided password matches the user's stored password.
   *
   * @param {string} candidatePassword - The password to check.
   * @param {string} userPassword - The user's stored password.
   * @returns {Promise<boolean>} - A Promise that resolves to true if the passwords match, false otherwise.
   */
  correctPassword(
    password: string,
    candidatePassword: string
  ): Promise<boolean>;
}
