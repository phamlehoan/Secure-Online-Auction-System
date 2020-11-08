import UserService from "../services/user.service";

const AuthApi = {};

/**
 * User authentication
 * 
 * @returns {String} jwt token
 */
AuthApi.getUser = async (req, res) => {
    try {
        let {email, password} = req.body;
        console.log(email, password);
        let user = await UserService.findByCredentials(email, password);
        if(user){
            const token = await UserService.generateAuthToken(user);
            return res.status(200).json({
                token
            });
        }
    } catch (error) {
        return res.status(500).json({
            "errors": error
        });
    }
}

export default AuthApi;
