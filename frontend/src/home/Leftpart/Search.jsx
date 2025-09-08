// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import useGetAllUsers from "../../context/useGetAllUsers";
// import useConversation from "../../statemanage/useConversation";
// import toast from "react-hot-toast";
// function Search() {
//   const [search, setSearch] = useState("");
//   const [allUsers] = useGetAllUsers();
//   const { setSelectedConversation } = useConversation();
//  // console.log(allUsers);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!search) return;
//     const conversation = allUsers.find((user) =>
//       user.name?.toLowerCase().includes(search.toLowerCase())
//     );
//     if (conversation) {
//       setSelectedConversation(conversation);
//       setSearch("");
//     } else {
//       toast.error("User not found");
//     }
//   };
//   return (
//     <div className=" h-[10vh]">
//       <div className="px-6 py-4">
//         <form onSubmit={handleSubmit}>
//           <div className="flex space-x-3">
//             <label className=" border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[85%]">
//               <input
//                 type="text"
//                 className="grow outline-none bg-transparent"
//                 placeholder="Search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </label>
//             <button>
//               <FaSearch className="text-2xl  hover:bg-gray-500  duration-300" />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Search;


import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../statemanage/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="p-4 border-b border-blue-700"> {/* Adjusted padding and added bottom border */}
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3 items-center"> {/* Added items-center for vertical alignment */}
          <label className="flex-1 border border-blue-600 bg-blue-900 rounded-full p-2 flex items-center gap-2"> {/* Rounded full, blue borders, slightly darker blue background */}
            <input
              type="text"
              className="grow outline-none bg-transparent text-white placeholder-blue-300" // Placeholder color
              placeholder="Search users..." // More descriptive placeholder
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button type="submit" className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 duration-300"> {/* Button styling */}
            <FaSearch className="text-xl text-white" /> {/* White icon */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;