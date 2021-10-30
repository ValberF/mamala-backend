require("dotenv").config()
const authSecret = process.env.authSecret;
const jwt = require("jwt-simple");

module.exports = app => {
    const validateAdmin = (req, res, next) => {
        let token = req.headers['authorization'];
        if(!token) return res.status(401).json({message: "Você não está autenticado", statusCode: 401});
        token = token.split(' ')[1];

        try {
            if (token) {
                const decode = jwt.decode(token, authSecret);
                if(decode.admin_id){
                    if (new Date(decode.exp) > new Date()) next();
                    else return res.status(401).json({message: "Seu token expirou", statusCode: 401});
                } else return res.status(403).json({message: "Você não tem autorização para realizar esta ação", statusCode: 403});
            } else return res.status(401).json({message: "Você não está autenticado", statusCode: 401});
        } catch (msg) {
            return res.status(401).json({message: "Você não está autenticado", statusCode: 401});
        }
    }
    
    return {validateAdmin};
}