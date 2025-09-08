// import React from "react";
// import Left from "./Leftpart/Left";
// import Right from "./Rightpart/Right";
// import Logout from "./left1/Logout";
// import { Navigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthProvider";

// function ChatLayout() {
// //   const [authUser] = useAuth();

// //   if (!authUser) {
// //     return <Navigate to="/login" />;
// //   }

//   return (
//     <div className="flex h-screen bg-fixed">
//       {/* <Logout /> */}
//       <Left />
//       <Right />
//     </div>
//   );
// }

// export default ChatLayout;

import React from "react";
import Left from "./Leftpart/Left";
import Right from "./Rightpart/Right";
import Logout from "./left1/Logout";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Toaster } from "react-hot-toast";

function ChatLayout() {
  const [authUser] = useAuth();

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-fixed">
      <Toaster />
      {/* <Logout /> */}
      <Left />
      <Right />
    </div>
  );
}

export default ChatLayout;