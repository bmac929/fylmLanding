import React, { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const [toggleOneModal, setToggleOneModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setToggleOneModal(!toggleOneModal)}
        
        style={{
          color: "white",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "15px",
          paddingRight: "15px",
          fontSize: "18px",
          backgroundColor:"#160015",
          border:"none",
          borderRadius:"5px",
          cursor:"pointer",
          outline:"none"
        }}
      >
        Log In
      </button>
    </>
  );
}
