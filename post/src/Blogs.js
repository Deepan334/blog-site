import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddBlog from './AddBlog'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import Blog from './components/Blog';

function Blogs() {
  const [allblogs, setAllblogs] = useState([]);

  const [editOn,setEditOn] = useState(false)
 
  useEffect(() => {
    let userId = JSON.parse(window.localStorage.getItem('items'));   
     
    let token=JSON.parse(window.localStorage.getItem('bearer')); 
    
   const headers = { 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    axios.post(`http://localhost:5000/blog/allblogs`, { userId }, { headers: headers })
      .then((res) => res.data.msg == 'unAuthorized' ? toast("Session expired, please login") : setAllblogs(res.data))
  },[])

  const onBlogsUpdate = ( updatedBlog, isDelete = false, isUpdate=false ) => {
  
           const { blog_id, title, description } = updatedBlog || {};
           const newBlog = {
               blog_id:blog_id,
               title: title,
               description: description,
               likes: [],
              disLikes: [],
               comments: []
    };
    const updatedBlogs =
               isDelete
               ? allblogs.filter((blog) => blog?.blog_id != blog_id)
               :
               isUpdate
               ?
              allblogs.map((blog) => (blog?.blog_id == blog_id ? updatedBlog : blog))
              :[...allblogs, newBlog] ;
         setAllblogs(updatedBlogs);
  };
  console.log("main-state",allblogs)
    return (
        <div>
        <div>
          {editOn ?
            <AddBlog
              onDone={()=>setEditOn(!editOn)}
              onUpdate={onBlogsUpdate} 
            />
          : <button type="button"
              className="btn btn-outline-success mt-3"
               onClick={() => setEditOn(!editOn)}>
              ADD POST
            </button>}     
        </div>
        <div> 
          {allblogs?.map((data) => <Blog key={data.blog_id} data={data} onUpdate={onBlogsUpdate} /> )}  
        </div>
      </div>
  )
}
export default Blogs;

                        