const express = require("express")
const blogRoutes = express.Router({mergeParams:true})
const { create, allblog, update, remove } = require("../controlers/blogControler")

blogRoutes.post("/allblogs", allblog)
blogRoutes.post("/create", create)
blogRoutes.put("/update",update)
blogRoutes.delete("/delete", remove)

module.exports = blogRoutes;