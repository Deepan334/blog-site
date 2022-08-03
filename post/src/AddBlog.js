import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "./Blogs.css";

function AddBlog({onDone,onUpdate}) {
  const [title, SetTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emptyWarning, setEmptyWarning] = useState(false)
  const [newBlog,setNewBlog]=useState({})
  const Navigate = useNavigate()
  const handleBlogPost = async() => {
    if (title.trim() && description.trim()) {
        let token=JSON.parse(window.localStorage.getItem('bearer')); 
   const headers = { 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
      await axios.post(`http://localhost:5000/blog/create`, { id:JSON.parse(window.localStorage.getItem('items')), title: title, description: description },{ headers: headers }).then((res) => res.data.msg == "Success" ? (() => { onUpdate({blog_id:res.data.blog_id[0].blog_id, title, description}); onDone() })() : toast("ERROR, please try again to add new blog"))
    //  await Navigate("/blogs", { state: { id: userid, title: title, description: description } })=== "Success" ? (() => { onUpdate(data); onDone() })(): toast("ERROR, please try again to add new blog")
    }
  }


  return (
    <div className="flex">
      <div className=" w-50">
        <div className=" bg-light ">
          <label>TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(event) => { SetTitle(event.target.value); setEmptyWarning(false) }}
            className="form-control "
            placeholder="Enter post title"
          ></input>
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(event) => { setDescription(event.target.value); setEmptyWarning(false) }}
            rows="5"
            placeholder="Enter post description..."
          ></textarea>
          {emptyWarning && <small id="emailHelp" className="form-text text-danger">Title or Description connot empty</small>  }
      </div>
          <button
          onClick={() => {
            title.trim() && description.trim()
              ? handleBlogPost()
              :  !description.trim() ? setEmptyWarning(true) :!title.trim() && setEmptyWarning(true)
            }}
            type="button"
            className="btn btn-primary mt-3"
          >
            Post Blog
          </button>
        </div>
      </div>
    
  );
}
export default AddBlog;


// { onBlogPost, onBlogDone }