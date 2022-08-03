import { useState, createContext} from "react";
import { Routes, Route,Navigate,Outlet} from 'react-router-dom'
import AddBlog from "./AddBlog.js";
import AddComment from "./components/AddComment.jsx";
import Register from "./components/Login-register/Register.jsx";
import Login from "./components/Login-register/Login.jsx";
import Blogs from "./Blogs.js";
import Blog from './components/Blog.js'
import Navbar from "./components/Navbar.js";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

export const UserContext = createContext();
 
export function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({ id: 1 });


  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Navbar></Navbar>
        <ToastContainer />
         <Routes>
            <Route path="/" element={<Login />}> </Route>
            <Route path="/register" element={<Register />}> </Route>
          <Route path="/Login" element={<Login />}> </Route>
          <Route element={<Private />} >
            <Route path="/addblog" element={<AddBlog />}> </Route>
            <Route path="/blogs" element={<Blogs />}> </Route>
            <Route path="/blog" element={<Blog />}> </Route>
            <Route path="/addcomment" element={<AddComment />}> </Route>
            <Route path="*" element={< Navigate to='/blogs' />} ></Route>
          </Route>
            <Route path="*" element={< Navigate to='/' />} ></Route>
         </Routes>
      </div>
    </UserContext.Provider>
  )}

const Private = () => {
  let auth = JSON.parse(window.localStorage.getItem('items'))
  return (
    <div> 
      {auth?<Outlet/> :<Navigate to="/" /> }
    </div>
  )
}


//  const [addBlog, setAddBlog] = useState(false);
  // useEffect(() => {
  //   setAuth(localStorage.getItem("items"))
  // }, [])
 
  

  //       <div>
  //         {addBlog ? (
  //           <Blog
  //             onBlogPost={onBlogsUpdate}
  //             onBlogDone={() => setAddBlog(!addBlog)}
  //           />
  //         ) : (
  //           <button
  //             type="button"
  //             className="btn btn-outline-success mt-3"
  //             onClick={() => {
  //               setAddBlog(!addBlog);
  //             }}
  //           >
  //             ADD POST
  //           </button>
  //         )}
  //       </div>
  //       <div>
  //         {blogs.map((blog) => (
  //           <SingleBlog
  //             key={blog.id}
  //             blog={blog}
  //             blogs={blogs}
  //             onUpdate={onBlogsUpdate}
             
  //           />
  //         ))}
  //       </div>