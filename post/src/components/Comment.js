import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Actions from '../Actions';
import axios from 'axios'
import './Comment.css'
function Comment({data, onUpdate, onComment}) {
  const { blogid,comment,comment_id, disLikes,likes } = data || {}
  const [hide, setHide] = useState(false);
  const [commentWarning, setCommentWarning] = useState(false);
  const [newComment, setNewComment] = useState(comment);

  
      let token=JSON.parse(window.localStorage.getItem('bearer')); 
   const headers = { 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

  const handleCommentDel = async() => {
    await axios.delete(`http://localhost:5000/comment/delete`, { headers: headers, data: { commentId: comment_id, blogid, userid: JSON.parse(window.localStorage.getItem('items')) } })
      .then((res) => res.data.msg == 'unAuthorized'
        ? toast("Session expired, please login")
        :
        res.data === "success"
          ? onUpdate({ comment_id }, true) : toast("ERROR,comment not deleted, try again "))
 }
  const handleCommentUpdate = async() => {
    await axios.put(`http://localhost:5000/comment/update`, { commentId: comment_id, blogid, userid: JSON.parse(window.localStorage.getItem('items')), newComment }, { headers: headers })
      .then((res) => res.data.msg == 'unAuthorized'
        ? toast("Session expired, please login")
        :
        res.data === "success" ?
          onUpdate({ ...data, comment: newComment }) : toast("ERROR,comment not updated, try again "))
    await onComment()
  }
  
  const handleLikeDislike =async (data) => {
    let url = `http://localhost:5000/reactions`
    await axios.post(url, { commentid: comment_id, userid: JSON.parse(window.localStorage.getItem('items')), blogid: null, reaction: data }, { headers: headers })
      .then((res) => res.data.msg == 'unAuthorized'
        ?
        toast("Session expired, please login")
        : res.data.msg == "success"
          ? onLIkeDislike(data, res.data.id) : toast("ERROR, try again ")) 
  }

const onLIkeDislike = (reaction,id) => {
    let updatedDislikes = [];
    let updatedLikes = [];

    if (reaction == "like") {
      updatedDislikes = disLikes.filter((dislike) => dislike !== disLikes[0] );
      updatedLikes = likes.includes(likes[0])
        ? likes.filter((like) => like!== likes[0]  )
        : [...likes,id ];
    } else {
      updatedLikes =likes.filter((like) => like!== likes[0]  );
      updatedDislikes = disLikes.includes(disLikes[0] )
        ?  disLikes.filter((dislike) => dislike !== disLikes[0] )
        : [...disLikes, id];
    }

    const updatedComment = {
      ...data,
      likes: updatedLikes,
      disLikes: updatedDislikes,
    };
    onUpdate && onUpdate(updatedComment ,false);
  };

  return (
    <div className="flex">
      <div className="">{comment}</div>
      <div>
        {hide ? (
          <div className="__edit">
            <div className="form-group ">
              <input
                type="text"
                className="form-control"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                  setCommentWarning(false);
                }}
                placeholder="New Comment..."
              />

              {commentWarning && (
                <small id="emailHelp" className="form-text text ">
                  Comment cannot be empty
                </small>
              )}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={() => {
                  if (newComment?.trim()) {
                    handleCommentUpdate()
                    setHide(false);
                    setCommentWarning(false);
                  }
                  newComment == "" && setCommentWarning(true);
                }}
              >
                update
              </button>
            </div>
          </div>
        ) : (
          <Actions
            onLike={() =>   handleLikeDislike("like") }
            onDislike={() =>   handleLikeDislike("dislike")}
            onEdit={() => setHide(true)}
            onDelete={() =>  handleCommentDel() }
            isLike={  likes.some((id) => id === likes[0]) }
            isDislike={  disLikes.some((id) => id === disLikes[0]) }
          />
        )}
      </div>
    </div>
  );
}

export default Comment;
