// import React, { useEffect, useRef } from "react";
// import Message from "./Message";
// import useGetMessage from "../../context/useGetMessage.js";
// import Loading from "../../components/Loading.jsx";
// import useGetSocketMessage from "../../context/useGetSocketMessage.js";
// function Messages() {
//   const { loading, messages } = useGetMessage();
//   useGetSocketMessage(); // listing incoming messages
//  // console.log(messages);

//   const lastMsgRef = useRef();
//   useEffect(() => {
//     setTimeout(() => {
//       if (lastMsgRef.current) {
//         lastMsgRef.current.scrollIntoView({
//           behavior: "smooth",
//         });
//       }
//     }, 100);
//   }, [messages]);
//   return (
//     <div
//       className="flex-1 overflow-y-auto"
//       style={{ minHeight: "calc(92vh - 8vh)" }}
//     >
//       {loading ? (
//         <Loading />
//       ) : (
//         messages.length > 0 &&
//         messages.map((message) => (
//           <div key={message._id} ref={lastMsgRef}>
//             <Message message={message} />
//           </div>
//         ))
//       )}

//       {!loading && messages.length === 0 && (
//         <div>
//           <p className="text-center mt-[20%]">
//             Say! Hi to start the conversation
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Messages;

import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // Listening for incoming messages

  const lastMsgRef = useRef();
  useEffect(() => {
    // Scroll to the latest message when messages change
    setTimeout(() => { // Small delay to ensure DOM updates
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end" // Scroll to the end of the element
        });
      }
    }, 100);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4 custom-scrollbar" // Added padding and a custom-scrollbar class (define in your global CSS if needed)
      style={{ minHeight: "calc(92vh - 8vh)" }} // This height looks correct relative to parent
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} ref={lastMsgRef}> {/* Only last message gets the ref */}
              <Message message={message} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full"> {/* Center content */}
            <p className="text-center text-blue-700 mt-52 text-2xl">
              Say Hi to start the conversation!
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default Messages;