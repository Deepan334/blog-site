require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('./dbConnectin.js')


exports.register = (req, res) => {   
    db('users').insert({ username: req.body.name, password: req.body.password }).catch((err)=>res.send(err))
    res.send("success")
};

exports.login = async (req, res) => {

  const { name, password } = req.body || {}
  const data = await db.select('*').from('users').where('username', name).catch((err)=>res.send(err))
  if (data.length > 0) {
     
    const result = await data.map((obj) => obj.password == password
      ?
      { message: "success", id:obj.id ,token:jwt.sign({name},process.env.SECRET_KEY,{ expiresIn: '10m'})}
      :
      { message: "password not match" })
    
    res.send(result[0])
  }
  else { res.send({ message: "user not found" }) }
}

exports.reactions = async (req, res) => {
  const { blogid, userid, commentid, reaction } = req.body || {}
  const filteredReaction =await db.select("*").from("reactions").where({ blogid: blogid }).orWhere({ commentid: commentid }).then(data=>{return data}).catch((err)=>res.send(err))
  const likeDislikeArry = await filteredReaction.filter((obj) => obj.commentid ? obj.commentid == commentid : obj)
 
  likeDislikeArry.length !== 0
                 ?
                     likeDislikeArry.map((obj) => obj.blogid == blogid && obj.commentid == commentid && obj.reaction == reaction
                 ?
                     db('reactions').where({ userid, commentid }).del().then(() => res.send({ msg: "success" })).catch((err)=>res.send(err))
                 :   db('reactions').where({ commentid, blogid }).update(reaction == "like" ? { reaction: "dislike" } : { reaction: "like" }).then(() => res.send({ msg: "success" })).catch((err)=>res.send(err))
                   ) 
                 :
                    db('reactions').insert({ userid,commentid,blogid, reaction },'reaction_id').then((data) => res.send({msg :"success",id:data[0].reaction_id})).catch((err)=>res.send(err))
};


















// exports.addblog = async (req, res) => {
//   const { id, title, description } = req.body || {}
//   await db('blog')
//     .insert({ userid: id, title: title, description: description }, "blog_id")
//     .then(data => res.send({ msg: "Success", blog_id: data }))
//     .catch((err) => res.send(err))
// };

// exports.allblogs = async (req, res) => {
//   const { id } = req.body || {}

//   const blog = await db
//     .select("*")
//     .from("blog")
//     .where({ userid: id })
//     .then((data) => { return data })
//     .catch(err => res.send(err))

//   const blogsid = await blog.map((obj) => obj.blog_id )
  
//   const comment = await db
//     .select("*")
//     .from("comments")
//      .whereIn("blogid",blogsid)
//     .then((data) => { return data })
//     .catch(err => res.send(err))
  
//   const commentsid = await comment.map((obj) => obj.comment_id)

// //  const  uniq = [...new Set(commentid)];
//   const reactions = await db 
//     .select("*")
//     .from("reactions")
//      .whereIn('blogid',blogsid ).orWhereIn('commentid', commentsid)
//     .then((data) => { return data })
//     .catch(err => res.send(err))

//   const blogReactions =await reactions.filter((obj) => obj.blogid != null)
//   const commentReactions =await reactions.filter((obj) => obj.commentid != null)

//   const obj = blog.map((data) => {
//     return {
//       ...data,
//       likes: blogReactions.filter((obj) => data.blog_id == obj.blogid &&  obj.reaction == "like").map(id=>id.userid),
//       disLikes: blogReactions.filter((obj) =>data.blog_id == obj.blogid && obj.reaction == "dislike").map(id=>id.userid),
//       comments: comment.filter((newCom) => newCom.blogid == data.blog_id).map(newCom => {
//         return {
//           ...newCom,
//           likes: commentReactions.filter((obj) => obj.commentid == newCom.comment_id && obj.reaction == "like").map(id=>id.userid)
//           , disLikes: commentReactions.filter((obj) => obj.commentid == newCom.comment_id && obj.reaction == "dislike").map(id=>id.userid)
//         }
//       })
//     }
//   })

//   res.send(obj)
  
// };

// exports.blogupdate =(req, res) => {
//   const { blog_id,userid,title,description } = req.body || {}
//   db('blog').where({ blog_id })
//     .update({ title: title, description: description })
//     .then(() => res.send("success"))
//     .catch((err) => res.send(err))
// }

// exports.blogdelete =(req, res) => {
//   const { blog_id, userid ,commentsId} = req.body || {}
//   db('reactions')
//     .whereIn('commentid', commentsId)
//     .orWhere({ blogid: blog_id })
//      .del()
//       .then(() => db('comments').where({ blogid: blog_id })
//        .del()
//         .then(() => db('blog').where({ blog_id, userid: userid })
//          .del()
//           .then(() => res.send("success")))).catch((err) => res.send(err))
// }

// exports.addcomment = (req, res) => {
//   const { blog_id, userid, addComment } = req.body || {}
//   db('comments')
//     .insert({ userid, blogid: blog_id, comment: addComment }, 'comment_id')
//     .then((data) => res.send({ msg: "success", id: data }))
//     .catch((err) => res.send(err))
// };


// exports.commentupdate = (req, res) => {
//   const {comment_id, blogid,userid,newComment } = req.body || {}
//   db('comments')
//     .where({ comment_id })
//     .update({ comment: newComment })
//     .then(() => res.send("success"))
//     .catch((err) => res.send(err))
// }

// exports.deletecomment = async (req, res) => {
//   const { comment_id, blogid, userid } = req.body || {}
//   await db('reactions')
//     .where({ userid: userid, commentid: comment_id })
//     .del().then(() => db('comments')
//       .where({ comment_id, blogid, userid })
//       .del()
//       .then(() => res.send("success")))
//     .catch((err) => res.send(err))
// };












































  // commentid ?
    
  //    reaction == "like" ?
  //   db.select("*").from('reactions').where({ userid, commentid })
  //     .then(
  //       (data) =>
  //         data.length !== 0
  //           ? data.map((obj) => obj.userid == userid && obj.commentid == commentid && obj.reaction == reaction
  //          ? db('reactions').where({userid,commentid}).del().then(()=> res.send({ msg:"success"}) )
  //             : db('reactions').where({ userid,commentid }).update({ reaction:"like" }).then(() => res.send({ msg:"success"}))
  //           ) 
  //            : db('reactions').insert({ userid,commentid, reaction },'reaction_id').then((data) => res.send({msg :"success",id:data[0].reaction_id}))
  //         ).catch((err)=>res.send(err))
  //   : db.select("*").from('reactions').where({ userid,commentid, })
  //     .then(
  //       (data) =>
  //         data.length !== 0
  //           ? data.map((obj) => obj.userid == userid &&  obj.commentid == commentid && obj.reaction == reaction
  //          ? db('reactions').where({userid,commentid}).del().then(()=> res.send({ msg:"success"}) )
  //             : db('reactions').where({  userid,commentid }).update({ reaction:"dislike" }).then(() => res.send({ msg:"success"}))
  //           ) 
  //            : db('reactions').insert({ userid,commentid, reaction },'reaction_id').then((data) => res.send({msg :"success",id:data[0].reaction_id}))
  //         ).catch((err)=>res.send(err))
   
  //   :

  // reaction == "like" ?
  //   db.select("*").from('reactions').where({ userid, blogid ,commentid})
  //     .then(
  //       (data) =>
  //         data.length !== 0
  //           ? data.map((obj) => obj.userid == userid && obj.blogid == blogid && obj.reaction == reaction
  //             ? db('reactions').where({ blogid, userid, commentid: null }).del().then(() => res.send({ msg:"success"}) )
  //             : db('reactions').where({ blogid, userid, commentid: null }).update({ reaction: "like" }).then(() => res.send({msg: "success"}))
  //           ) 
  //           : db('reactions').insert({ userid, blogid, reaction }, 'reaction_id').then((data) => res.send({msg :"success",id:data[0].reaction_id}))
  //         ).catch((err)=>res.send(err))
  //   : db.select("*").from('reactions').where({ userid, blogid ,commentid})
  //     .then(
  //       (data) =>
  //         data.length !== 0
  //           ? data.map((obj) => obj.userid == userid && obj.blogid == blogid && obj.reaction == reaction
  //          ? db('reactions').where({blogid,userid,commentid:null}).del().then(()=> res.send({msg: "success"}) )
  //             : db('reactions').where({ blogid, userid,commentid:null }).update({ reaction:"dislike" }).then(() => res.send({msg: "success"}))
  //           ) 
  //            : db('reactions').insert({ userid, blogid, reaction },'reaction_id').then((data) => res.send({msg :"success",id:data[0].reaction_id}))
  //         ).catch((err)=>res.send(err))
  // res.send([])




// exports.alllikedislike = async (req, res) => {
//   const { blogid, userid, commentid, } = req.body || {}

//   if (commentid) {
//     await db('reactions').where({userid,commentid}).then((data)=> res.send(data) )
//   } else {
//   db.select("*").from('reactions').where({userid,blogid}).then((data)=> res.send(data) )
//   }
// };

  // const blogs = await db.select('*').from('blogs').where('userid', id)
  // const comments = await db.select('*').from('comments').where('userid', id)
  // db.select().from("users").leftJoin("blogs", "userid", "users.id").then((data) => {return _.chain(data).groupBy(function (user) { return user.id; }) })
      
  // db.select().from("users").then((data) => {const blog = data.map((obj) =>  ) } ) 

  //db.select('*').join( db.Raw('(SELECT id, name FROM tbl_b GROUP BY id, name) AS tbl_b') ,'tbl_a.id', '=', 'tbl_b.id', 'LEFT');

// exports.allcomments = async (req, res) => {
//    const { blogid,userid } = req.body || {}
//    await db('comments').where({userid,blogid}).then((data)=> res.send(data) )
// };


// db.select().from("blogs").where({blog_userid:id}).then((data) => {
  // console.log("data", { blogs: blog, comments: comment, likesDsilike: likedislike })


  // { blogs: blog, comments: comment, likesDislike: likedislike }
  //   // const hydrated = {};
  //   // data.forEach(row => {
  //   //   console.log("row", row)
  //   //   if (!(row.id in hydrated)) {
  //   //     hydrated[row.userid] = {
  //   //       id: row.userid,
  //   //       username: row.username,
  //   //       password: row.password,
  //   //       blogs: []
  //   //     }
       
  //   //   }
  //   //     hydrated[row.userid].blogs.push({
  //   //     id:row.id,
  //   //     title: row.title,
  //   //     description: row.description,
  //   //     likes: [],
  //   //     dislikes: [],
  //   //     comments:[]
  //   //     });
  //   // //   // hydrated[row.userid].blogs[row.id].likes.push({
       
  //   // //   //   reaction:"like"
  //   // //   // });
  //   // //   // hydrated[row.userid].blogs[row.id].dislikes.push({
        
  //   // //   //   reaction:"dislike"
  //   // //   // });
  //   //  });
  //    
  // }
  // )
 



//  console.log("<><><><><><><>", data)
//     return _.chain(data).groupBy(function(user) { return user.id; }).map(function(users) {
//       var user = _.chain(users).first().pick('id', 'username', 'email');
//       var blogs = _.map(users, function(u) {
//          return { 'title': u.title, 'description': u.description };
//       });
//       user.blogs = blogs;
//       console.log("><><><><><><><", user)
//       return user;
//    }).value();
// });
    //.leftJoin("blogs", "userid", "users.id").leftJoin("comments", "blogid", "blogs.id").leftJoin("reactions", "commentid", "comments.id").then((data) => { data.map((obj) => console.log(obj)) }
    
 // )
    
    
     // db('blogs').join('blogs', 'userid', '=', id).select().then((data)=>console.log(data))
 // console.log(";",result)


