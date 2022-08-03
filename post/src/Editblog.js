import { useState } from "react";
import { toast } from "react-toastify";
import axios  from "axios";
function Editblog({ onUpdate, onEditDone, blog }) {
  const { blog_id,userid,title,description,} = blog || {};
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [titleWarning, setTitleWarning] = useState(false);
  const [descriptionWarning, setDescriptionWarning] = useState(false);

  const handleBlogEdit = async() => {  
    let updatedData = { ...blog, blog_id, userid: JSON.parse(window.localStorage.getItem('items')), title: editedTitle, description: editedDescription }
     let token=JSON.parse(window.localStorage.getItem('bearer')); 
   const headers = { 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    await axios.put(`http://localhost:5000/blog/update`, updatedData, { headers: headers })
      .then((res) => res.data.msg == 'unAuthorized'
        ? toast("Session expired, please login")
        :
        res.data == "success" ?
          onUpdate(updatedData, false, true) : toast("ERROR,while updating, please try again "))
   await  onEditDone();
  };
  
  return (
    <div>
      <div className="form-group ">
        <label className="sr-only">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="New title..."
          value={editedTitle}
          onChange={(event) => {
            setEditedTitle(event.target.value);
            setTitleWarning(false);
          }}
        />
        {titleWarning && (
          <small id="emailHelp" className="form-text text ">
            Title cannot be empty
          </small>
        )}
      </div>
      <div className="form-group ">
        <label className="sr-only">Description</label>
        <input
          type="text"
          className="form-control"
          value={editedDescription}
          onChange={(event) => {
            setEditedDescription(event.target.value);
            setDescriptionWarning(false);
          }}
          placeholder="New description..."
        />
        {descriptionWarning && (
          <small id="emailHelp" className="form-text text ">
            Derscription cannot be empty
          </small>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary mb-2"
        onClick={() => {
          editedTitle == "" && setTitleWarning(true);
          editedDescription == "" && setDescriptionWarning(true);
          editedTitle.trim() && editedDescription.trim() && handleBlogEdit();
        }}
      >
        Update
      </button>
    </div>
  );
}

export default Editblog;



 // onUpdate({
    //   ...blog,
    //   title: editedTitle,
    //   description: editedDescription,
    // });