// import React from "react";
// import useConversation from "../../statemanage/useConversation.js";
// import { useSocketContext } from "../../context/SocketContext.jsx";

// function User({ user }) {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const isSelected = selectedConversation?._id === user._id;
//   const { socket, onlineUsers } = useSocketContext();
//   const isOnline = onlineUsers.includes(user._id);

//   return (
//     <div
//       className={`hover:bg-slate-600 duration-300 ${
//         isSelected ? "bg-slate-700" : ""
//       }`}
//       onClick={() => setSelectedConversation(user)}
//     >
//       <div className="flex items-center space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-12 rounded-full ring ">
//             <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
//             className="object-cover rounded-full"
//             />
//           </div>
//         </div>
//         <div className="flex items-center">
//           <h1 className="font-bold text-lg">{user.name || user.email}</h1>
//           <span>{<user className="email"></user> }</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default User;


import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`cursor-pointer border-b border-blue-700 last:border-b-0
        ${isSelected ? "bg-blue-700" : "hover:bg-blue-600"} 
        duration-200 p-3`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4">
        {/* The 'rounded-full' class here ensures it's always circular */}
        <div className={`relative flex-shrink-0 w-12 h-12   rounded-full overflow-hidden ${isOnline ? 'ring-2 ring-green-500' : 'ring-2 ring-blue-500'}`}>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            className="object-cover w-full h-full rounded-full aspect-square" // And here, for the image itself
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-800"></div>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg text-white">{user.fullname || user.name || user.email}</h1>
          {user.fullname && user.email && <span className="text-sm text-blue-200">{user.email}</span>}
        </div>
      </div>
    </div>
  );
}

export default User;