import React, {  useState,useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
function Login() {
    const [userName, setUserName] = useState('Deepan@gmail.com') 
  const [password, setPassword] = useState('123456')
  const [loginWarning, setLoginWarning] = useState(false)
  const [emptyWarning, setEmptyWarning] = useState(false)
  
   const Navigate = useNavigate()
   
  useEffect(() => {
     const isLoggedIn = JSON.parse(window.localStorage.getItem('items')); 
    if (isLoggedIn) {
       Navigate('/blogs')
    }
  },[])
    
  const handleLogin = (event) => {
        event.preventDefault()
   
    if (userName.trim() && password.trim()) {
           let data = {
            name:userName,password:password
    }
    axios.post(`http://localhost:5000/login`, data)
      .then((res) => {
       
        if (res.data.message == "success") {
          localStorage.setItem('items', JSON.stringify(res.data.id));
          localStorage.setItem('bearer',JSON.stringify(res.data.token))
            Navigate("/Blogs")
            setUserName("")
            setPassword("")
          }
          else {
            Navigate("/")
            setLoginWarning(true)
          }
      })
      .catch(err => {
        alert('Error Occured')
        console.log(err)
      })
      
        
    }
  !userName.trim() ? setEmptyWarning(true) :!password.trim() && setEmptyWarning(true)
  }
 window.onload = function () { Navigate("/")}
  return (
      <div>
          <form onSubmit={handleLogin}>
      <div className="form-group ">
         <label htmlFor="exampleInputEmail1">User Name</label>   
          <input type="email" className="form-control" value={userName} onChange={(event) => { setUserName(event.target.value); setLoginWarning(false)}}  aria-describedby="emailHelp" placeholder="Enter Username/Email"/>   
      </div>
      <div className="form-group">
         <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" value={password} onChange={(event) => { setPassword(event.target.value);setLoginWarning(false) }} placeholder="Password" />
          {loginWarning && <small id="emailHelp" className="form-text text-danger">User name or password incorrect</small>  }  {emptyWarning && <small id="emailHelp" className="form-text text-danger">User name or password connot empty</small>  }
      </div>
        <button type="submit" className="btn btn-primary">Login</button>  
         </form>
    </div>
  )
}

export default Login;