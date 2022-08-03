import React, { useState } from 'react'
import axios from 'axios';
import Actions from '../Actions';
import Editblog from '../Editblog';
import AddComment from './AddComment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Blog.css"
function Blog({data,onUpdate}) {
  const { blog_id, title, description, likes, disLikes,comments } = data || {}
  
  const [isEditOn, setIsEditOn] = useState(false)

  const commentsId = comments.map((id)=>id.comment_id)

  let token=JSON.parse(window.localStorage.getItem('bearer')); 
   const headers = { 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/blog/delete`, { headers: headers, data: { blog_id, userid: JSON.parse(window.localStorage.getItem('items')), commentsId } },)
      .then((res) => res.data.msg == 'unAuthorized'
        ?
        toast("Session expired, please login") :
        res.data === "success"
          ? onUpdate({ blog_id }, true) : toast("ERROR, try again "))
  }
  
  const handleLikeDislike = async(data) => {
    let url = `http://localhost:5000/reactions`
    await axios.post(url, { blogid: blog_id, userid: JSON.parse(window.localStorage.getItem('items')), reaction: data, commentid: null }, { headers: headers })
      .then((res) => res.data.msg == 'unAuthorized'
        ? toast("Session expired, please login")
        :
        res.data.msg == "success" ?
          onLIkeDislike(data, res.data.id) : toast("ERROR, try again "))   
  }

  const onLIkeDislike = (reaction,id) => {
    let updatedDislikes = [];
    let updatedLikes = [];

    if (reaction == "like") {
      updatedDislikes = disLikes.filter((dislike) =>dislike !== disLikes[0]  );
      updatedLikes = likes.includes(likes[0])
        ? likes.filter((like) => like !== likes[0] ) : [...likes, id]   
    }
    else {
      updatedLikes = likes.filter((like) => like !== likes[0] );
      updatedDislikes = disLikes.includes(disLikes[0])
        ? disLikes.filter((dislike) =>dislike !== disLikes[0]  )   : [...disLikes, id  ]
    }
    const updatedBlog = {
     ...data,
      likes: updatedLikes,
      disLikes: updatedDislikes,
    };
    onUpdate && onUpdate(updatedBlog,false,true);
  };
  return (
    <div className="Post__main">
      <div className="card w-100 text-white bg-dark mt-3 ">
        <div className="card-body">
     
          
          <div className='bt ' >
   <button className='switch' >Public</button>
          </div>
      



          <div className="flex">
            <div>
              <div className="card-body">
                <h5 className="card-title">TITLE</h5>
                <p className="card-text">{title}</p>
              </div>
              <div className="card-body">
                <h5 className="card-title">DESCRIPTION</h5>
                <p className="card-text">{description}</p>
              </div>
            </div>
            <div className="">
              {isEditOn ?
                ( <Editblog
                  blog={data}
                  onUpdate={onUpdate}
                  onEditDone={() => { setIsEditOn(!isEditOn); }} />)
                :
                ( <Actions
                  onLike={() => {  handleLikeDislike("like") } }
                  onDislike={() => handleLikeDislike("dislike")}
                  onEdit={() => setIsEditOn(!isEditOn)}
                  onDelete={() =>  handleDelete()  }
                   isLike={ likes.some((id) => id === likes[0])}
                   isDislike={disLikes.some((id) => id === disLikes[0])}
                  />)}
            </div>
          </div>
        </div>
         <AddComment data={data}  onUpdate={onUpdate} />  
      </div>
    </div>
    )
  }

    export default Blog
