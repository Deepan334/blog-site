import React,{useState} from 'react'
import {useNavigate,NavLink} from 'react-router-dom'
function Navbar() {
  const [auth, setAuth] = useState()
  const [toggle, setToggle] = useState(false)
  let Navigate = useNavigate()
  let show = localStorage.getItem("items")
  const handleAuth = () => {
    localStorage.removeItem('items'); 
    localStorage.removeItem('bearer'); 
      setAuth(0)
    Navigate("/")
    }
   
  return (
     <nav className="navbar navbar-light bg-light justify-content-between">
            <a className="navbar-brand font-weight-bold">B-LOGS</a>
          <form className="form-inline">
        {show ? <button type="button" onClick={() => { handleAuth(); Navigate('/login')}} className="btn btn-outline-warning  my-2 my-sm-0 mr-2">
                   Logout
              </button> : <div> {!toggle ? <button type="button" onClick={() => { setToggle(!toggle);Navigate('/register')  } } className="btn btn-outline-success  my-2 my-sm-0 mr-2">
                 Register
              </button>
                  : <button type="button" onClick={() => { setToggle(!toggle); Navigate('/login')  }} className="btn btn-outline-success  my-2 my-sm-0">
                        Login
                  </button>} </div> }
            </form>
        </nav>
  )
}

export default Navbar