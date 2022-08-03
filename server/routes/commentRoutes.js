const express = require("express")
const commentRoutes = express.Router({mergeParams:true})
const { update, remove, create } = require("../controlers/commentControler")
        
commentRoutes.post("/create", create)
commentRoutes.put("/update", update)
commentRoutes.delete("/delete", remove)

module.exports = commentRoutes;