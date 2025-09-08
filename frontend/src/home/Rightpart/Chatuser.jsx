// import React from "react";
// import useConversation from "../../statemanage/useConversation.js";
// import { useSocketContext } from "../../context/SocketContext.jsx";
// import { CiMenuFries } from "react-icons/ci";

// function Chatuser() {
//   const { selectedConversation } = useConversation();
//   const { onlineUsers } = useSocketContext();
//   const getOnlineUsersStatus = (userId) => {
//     return onlineUsers.includes(userId) ? "Online" : "Offline";
//   };

//   return (
//     <div className=" pl-5 pt-5 h-[12vh] flex space-x-4 bg-gray-700 hover:bg-gray-600 duration-300">
//       <div>
//         <div className="avatar online">
//           <div className="w-14 rounded-full ring">
//             <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//              className="rounded-full"
//             />
//           </div>
//         </div>
//       </div>
//       <div>
//         <h1 className="text-xl">{selectedConversation.name}</h1>
//         <span className="text-sm">
//           {getOnlineUsersStatus(selectedConversation._id)}
//         </span>
//       </div>
//     </div>
//   );
// }
// export default Chatuser;
import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);

  if (!selectedConversation) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4 bg-blue-700 text-white p-4 border-b border-blue-600">
      <div>
        {/* The 'rounded-full' class here ensures it's always circular */}
        <div className={`relative flex-shrink-0 w-14 h-14 rounded-full overflow-hidden ${isOnline ? 'ring-2 ring-green-500' : 'ring-2 ring-blue-300'}`}>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            className="rounded-full object-cover w-full h-full aspect-square" // And here, for the image itself
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-700"></div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold">{selectedConversation.fullname || selectedConversation.name || selectedConversation.email}</h1>
        <span className={`text-sm ${isOnline ? "text-green-300" : "text-gray-300"}`}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;