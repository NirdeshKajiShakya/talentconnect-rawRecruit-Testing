// import React, { useState } from "react";
// import { IoSend } from "react-icons/io5";
// import useSendMessage from "../../context/useSendMessage.js";

// function Typesend() {
//   const [message, setMessage] = useState("");
//   const { loading, sendMessages } = useSendMessage();

//   const handleSubmit = async (e) => {
//     console.log(e);
//     e.preventDefault();
//     await sendMessages(message);
//     setMessage("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="flex space-x-1 h-[8vh]  bg-gray-800">
//         <div className=" w-[70%] mx-4">
//           <input
//             type="text"
//             placeholder="Type here"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="border-[1px] border-blue-500  flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-slate-900 mt-1"
//           />
//         </div>
//         <button>
//           <IoSend className="text-3xl" />
//         </button>
//       </div>
//     </form>
//   );
// }

// export default Typesend;



import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200"> {/* White background, top border, padding */}
      <div className="flex space-x-3 items-center"> {/* Aligned items */}
        <input
          type="text"
          placeholder="Type your message..." // More descriptive placeholder
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 py-3 px-4 rounded-full border border-blue-400 outline-none focus:border-blue-600 bg-blue-50 text-gray-800 placeholder-blue-300" // Light blue background, blue border, rounded-full
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 duration-200 disabled:opacity-50 disabled:cursor-not-allowed" // Blue button, rounded, hover effect
          disabled={loading || !message.trim()} // Disable if sending or message is empty
        >
          {loading ? (
            <span className="loading loading-spinner"></span> // Assuming you have a loading spinner component/class
          ) : (
            <IoSend className="text-xl" />
          )}
        </button>
      </div>
    </form>
  );
}

export default Typesend;