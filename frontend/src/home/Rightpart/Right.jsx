// import React, { useEffect } from "react";
// import Chatuser from "./Chatuser";
// import Messages from "./Messages";
// import Typesend from "./Typesend";
// import useConversation from "../../statemanage/useConversation.js";
// import { useAuth } from "../../context/AuthProvider.jsx";
// import { CiMenuFries } from "react-icons/ci";

// function Right() {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   useEffect(() => {
//     return setSelectedConversation(null);
//   }, [setSelectedConversation]);
//   return (
//     <div className="w-full bg-slate-900 text-gray-300">
//       <div>
//         {!selectedConversation ? (
//           <NoChatSelected />
//         ) : (
//           <>
//             <Chatuser />
//             <div
//               className=" flex-1 overflow-y-auto"
//               style={{ maxHeight: "calc(88vh - 8vh)" }}
//             >
//               <Messages />
//             </div>
//             <Typesend />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Right;

// const NoChatSelected = () => {
//   const [authUser] = useAuth();
//  // console.log(authUser);
//   return (
//     <>
//       <div className="relative">
//         <label
//           htmlFor="my-drawer-2"
//           className="btn btn-ghost drawer-button lg:hidden absolute left-5"
//         >
//           <CiMenuFries className="text-white text-xl" />
//         </label>
//         <div className="flex h-screen items-center justify-center">
//           <h1 className="text-center">
//             Welcome{" "}
//             <span className="font-semibold text-xl">
//               {authUser.user.name}
//             </span>
//             <br />
//             No chat selected, please start conversation by selecting anyone to
//             your contacts
//           </h1>
//         </div>
//       </div>
//     </>
//   );
// };


import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Clear selected conversation on unmount
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full bg-white text-gray-800 flex flex-col h-screen"> {/* White background, dark text, flex column */}
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />
          <div
            className="flex-1 overflow-y-auto" // Let Messages handle its own max-height based on available space
          >
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="relative flex flex-col h-full items-center justify-center bg-blue-100 text-blue-800"> {/* Light blue background, darker blue text */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute top-4 left-4" // Positioned top-left
      >
        <CiMenuFries className="text-blue-800 text-2xl" /> {/* Blue icon */}
      </label>
      <div className="text-center p-6 max-w-md"> {/* Added padding and max-width */}
        <h1 className="text-2xl font-bold mb-4">
          Welcome{" "}
          <span className="text-blue-600">
            {authUser?.user?.name}
          </span>
        </h1>
        <p className="text-lg">
          No chat selected. Please select a contact from the left panel to start a conversation.
        </p>
      </div>
    </div>
  );
};