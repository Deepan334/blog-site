import React from "react";

function Button(data) {
  const { likeDislike, name, action } = data;

  return (
    <button
      type="button"
      className={  likeDislike ? "btn btn-danger mr-2" : "btn btn-outline-light mr-2"   }
      onClick={() => action()}
    >
      {name}
    </button>
  );
}

export default Button;
