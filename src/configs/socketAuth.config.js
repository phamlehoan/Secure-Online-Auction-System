import passportSocketio from 'passport.socketio';
import dotenv  from "dotenv";

dotenv.config();
//Cấu hình session cho socket.io
let configSessionSocketio = (io, cookieParser, sessionStore) => {
    io.use(passportSocketio.authorize({
        cookieParser: cookieParser,
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        success: (data, accept) => {
          //Kiểm ttra đã tồn tại user đã tồn tại hay chưa
          if(!data.user.logged_in){
            return accept("Incalid user", false);
          }
          return accept(null, true);
        },
        fail: (data, message, error, accept) => {
          if(error){
            console.log("failed connection to socket.io", message);
            return accept(new Error(message), false)
          }
        }
      }))
}

module.exports = configSessionSocketio;




