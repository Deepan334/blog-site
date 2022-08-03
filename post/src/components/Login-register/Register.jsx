import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
function Register() {
     const [userName,setUserName]=useState('')
     const [password,setPassword]=useState('')
     const [emptyWarning, setEmptyWarning] = useState(false)
    const Navigate = useNavigate()
  useEffect(() => {
    const isLoggedIn = JSON.parse(window.localStorage.getItem('items')); 
    if (isLoggedIn) {
       Navigate('/blogs')
    }
  },[])
    
  const handleRegistration = (event) => {
        event.preventDefault()
    if (userName.trim() && password.trim()) {
           let data = {
            name:userName,password:password
    }
      axios.post(`http://localhost:5000/register`, data).then(res => res.data == "success" ? 
          Navigate("/") : Navigate("/register")
     )
      
    }
     !userName.trim() && !password.trim() && setEmptyWarning(!emptyWarning)
   }

  
window.onload = function () { Navigate("/")}
  
  return (
      <div>
          <form onSubmit={handleRegistration}>
  <div className="form-group ">
    <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" value={userName} onChange={(event) => { setUserName(event.target.value); setEmptyWarning(false)}}  aria-describedby="emailHelp" placeholder="Enter Username/Email"/>
    
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" value={password} onChange={(event) => { setPassword(event.target.value);setEmptyWarning(false) }} placeholder="Password" />
           {emptyWarning && <small id="emailHelp" className="form-text text-danger">User name or password connot empty</small>  }
  </div>
  
  <button type="submit" className="btn btn-primary">Register</button>
</form>
    </div>
  )
}

export default Register