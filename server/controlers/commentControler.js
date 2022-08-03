const db = require('./dbConnectin.js')

exports.create = (req, res) => {
  const { blogId, userid, addComment } = req.body || {}
  db('comments')
    .insert({ userid, blogid: blogId, comment: addComment }, 'comment_id')
    .then((data) => res.send({ msg: "success", id: data }))
    .catch((err) => res.send(err))
};


exports.update = (req, res) => {
  const {commentId,newComment } = req.body || {}
  db('comments')
    .where({ comment_id:commentId })
    .update({ comment: newComment })
    .then(() => res.send("success"))
    .catch((err) => res.send(err))
}

exports.remove = async (req, res) => {
  const { commentId, blogid,} = req.body || {}

   db ('comments')
     .where({ comment_id: commentId, blogid })
     .del().then(() => res.send("success"))
     .catch((err)=>console.log(err))
};




 // await db('comments').innerJion('reactions', 'comments.comment_id', '=','commentid').where({ userid, commentid: comment_id, comment_id, blogid,  }).del().then(() => {  res.send("success") }).catch((err) => res.send(err))
 //  db("comments").innerJoin('reactions','comments.comment_id','=','commentid').where({comment_id:commentId,commentid:commentId,blogid}).del().then(() => res.send("success"))
    // .whereIn('comment_id', function() {
  //   this.select('commentid')
  //       .from('reactions')
  //       .where('commentid', commentId);
  // })
 // await db('reactions')
  //   .where({ userid: userid, commentid: comment_id })
  //   .del().then(() => db('comments')
  //     .where({ comment_id, blogid, userid })
  //     .del()
  //     .then(() => res.send("success")))
  //   .catch((err) => res.send(err))