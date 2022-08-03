const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { register, login, reactions, } = require("../controlers/controler")
const blogRoutes = require('./blogRoutes.js')
const commentRoutes = require('./commentRoutes.js')

const jwtAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY);
            next()
        } catch (error) {
            res.send({msg: "unAuthorized"})
        }
    }
}       
    

router.post("/register", register)
router.post('/login', login)

router.use('/blog',jwtAuth, blogRoutes)
router.use('/comment',jwtAuth, commentRoutes)

router.post("/reactions",jwtAuth, reactions)

module.exports = router;




//router.post('allbogs',allblogs)
// router.post("/allblogs", allblogs)
// router.post("/addblog", addblog)
// router.put("/blogupdate",blogupdate)
// router.delete("/blogdelete", blogdelete)
//router.post("/allcomments", allcomments)
// router.post("/addcomment", addcomment)
// router.put("/commentupdate", commentupdate)
// router.delete("/deletecomment", deletecomment)
//router.post("/alllikedislike", alllikedislike)
