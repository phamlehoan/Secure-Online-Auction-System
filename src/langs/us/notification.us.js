/**
 * define all constants for US locations
 */
const registerError = {
    username: "Username limited from 1-30 characters and does not contain special characters",
    email: "Email must be in format example@gmail.com!",
    password: "Password must contain at least 8 characters including uppercase, lowercase letters, numbers and special characters",
    confirmPassword: "The password does not match",
}
const notificationRegister = {
    blockUser: "This account has been blocked",
    emailUser:"This email is already registered",
    activeUser:"This account has not been activated",
    successUser:"Account registration is successful",
}

export const regisErr = registerError;
export const notiRes = notificationRegister;