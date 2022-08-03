import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Comment from './Comment';
import './AddComment.css'
function AddComment({ data ,onUpdate}) {
    const {blog_id,userid,comments,} = data || {}
    const [commentWarning, setCommentWarning] = useState(false);
    const [addComment, setAddComment] = useState("");
    const [updatedComment,setUpdatedComment]=useState(false)

  const handleAddComment = async () => {
      let token=JSON.parse(window.localStorage.getItem('bearer')); 
   const headers = { 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    await axios.post(`http://localhost:5000/comment/create`, { blogId: blog_id, userid: JSON.parse(window.localStorage.getItem('items')), addComment }, { headers: headers }).
      then((res) => res.data.msg == 'unAuthorized'
        ? toast("Session expired, please login") :
        res.data.msg === "success" ?
          onUpdate({ ...data, comments: [...data.comments, { blogid: blog_id, userid, comment_id: res.data.id[0].comment_id, comment: addComment, likes: [], disLikes: [] }] }, false, true)
          :  toast("ERROR, try again "))
    await setUpdatedComment(!updatedComment)
    setAddComment("")
  }


  const onCommentUpdate = (updatedComment, isDelete = false) => {
    const { comment_id } = updatedComment || {};
   
    const updatedComments = isDelete
      ? comments.filter((comment) => comment.comment_id !== comment_id )
      : comment_id
      && comments.map((comment) =>
          comment?.comment_id == updatedComment?.comment_id ? updatedComment : comment
        )
      
    const updatedBlog = { ...data, comments: updatedComments };
    onUpdate && onUpdate(updatedBlog ,false,true );
  
  };

 
  return (
    <div className="comment__main">
      <div className="width">
        <div className="form-group box__with">
          <input
            type="text"
            className="form-control "
            value={addComment}
            onChange={(event) => {
              setAddComment(event.target.value);
              setCommentWarning(false);
            }}
            placeholder="New Comment..."
          />
          {commentWarning && ( <small id="emailHelp" className="form-text text ">  Comment cannot be empty </small> )}
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={() => 
              addComment.trim()
                ?
                handleAddComment()
                :
                 setCommentWarning(true)
            } >
            Add Comment
           </button>
        </div>
      </div>
      <div>
        {comments.map((data) => <Comment key={data.comment_id} data={data} onUpdate={onCommentUpdate} onComment={() => setUpdatedComment(!updatedComment)} />)}
      </div>
    </div>
  )
}

export default AddComment
