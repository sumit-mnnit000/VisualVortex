const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
const token = req.header('Authorization');
if (!token) return res.status(401).json({
    success: false,
    status: 401,
    error: {
        message: "Invalid token",
    }
});
try {
 const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
 if(decoded){
    next();
 }else{
     res.status(401).json({
        success: false,
        status: 401,
        error: {
            message: "Invalid token",
        }
    })
    
 }
 
 } catch (error) {
    res.status(401).json({
        success: false,
        status: 401,
        error: {
            message: "Invalid token",
        }
    })
 }
 };

module.exports = verifyToken;