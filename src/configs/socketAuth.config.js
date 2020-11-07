import PassportSocket from "passport.socketio";
import session from "../configs/session.config";

/**
 * passport socket configs
 * 
 * @param {Socket.io} io 
 * @param {cookie-parser} cookieParser 
 */
let PassportSocketAuth = (io, cookieParser) => {
    io.use(PassportSocket.authorize({
        cookieParser: cookieParser,
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: session.sessionStore,
        success: onSocketConnectSuccess,
        fail: onSocketConnectFailed
    }))
}

/**
 * handle socket connect successfully
 */
let onSocketConnectSuccess = () => {
    
}

/**
 * handle socket connect failed
 */
let onSocketConnectFailed = () => {
    
}

module.exports = PassportSocketAuth;
