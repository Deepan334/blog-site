const db = require('./dbConnectin.js')

exports.allblog = async (req, res) => {
  const { userId } = req.body || {}
  const token = req.headers.authorization.split(' ')[1];
  
  const blog = await db
    .select("*")
    .from("blogs")
    .where({ userid: userId })
    .then((data) => { return data })
    .catch(err => res.send(err))

  const blogsid = await blog.map((obj) => obj.blog_id )
  
  const comment = await db
    .select("*")
    .from("comments")
     .whereIn("blogid",blogsid)
    .then((data) => { return data })
    .catch(err => res.send(err))
  
  const commentsid = await comment.map((obj) => obj.comment_id)

//  const  uniq = [...new Set(commentid)];
  const reactions = await db 
    .select("*")
    .from("reactions")
     .whereIn('blogid',blogsid ).orWhereIn('commentid', commentsid)
    .then((data) => { return data })
    .catch(err => res.send(err))

  const blogReactions =await reactions.filter((obj) => obj.blogid != null)
  const commentReactions =await reactions.filter((obj) => obj.commentid != null)

  const obj = blog.map((data) => {
    return {
      ...data,
      likes: blogReactions.filter((obj) => data.blog_id == obj.blogid &&  obj.reaction == "like").map(id=>id.userid),
      disLikes: blogReactions.filter((obj) =>data.blog_id == obj.blogid && obj.reaction == "dislike").map(id=>id.userid),
      comments: comment.filter((newCom) => newCom.blogid == data.blog_id).map(newCom => {
        return {
          ...newCom,
          likes: commentReactions.filter((obj) => obj.commentid == newCom.comment_id && obj.reaction == "like").map(id=>id.userid)
          , disLikes: commentReactions.filter((obj) => obj.commentid == newCom.comment_id && obj.reaction == "dislike").map(id=>id.userid)
        }
      })
    }
  })

  res.send(obj)
};

exports.create = async (req, res) => {
  const { id, title, description } = req.body || {}
  await db('blogs')
    .insert({ userid: id, title: title, description: description }, "blog_id")
    .then(data => res.send({ msg: "Success", blog_id: data }))
    .catch((err) => res.send(err))
};

exports.update =(req, res) => {
  const { blog_id,userid,title,description } = req.body || {}
  db('blogs').where({ blog_id })
    .update({ title: title, description: description })
    .then(() => res.send("success"))
    .catch((err) => res.send(err))
}

exports.remove =(req, res) => {
  const { blog_id, } = req.body || {}
  
     db ('blogs')
     .where({ blog_id })
     .del().then(() => res.send("success"))
     .catch((err)=>console.log(err))
} 






  // db('reactions')
  //   .whereIn('commentid', commentsId)
  //   .orWhere({ blogid: blog_id })
  //    .del()
  //     .then(() => db('comments').where({ blogid: blog_id })
  //      .del()
  //       .then(() => db('blog').where({ blog_id, userid: userid })
  //        .del()
  //         .then(() => res.send("success")))).catch((err) => res.send(err))