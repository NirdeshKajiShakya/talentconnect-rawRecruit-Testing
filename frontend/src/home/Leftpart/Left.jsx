// import React from "react";
// import Search from "./Search";
// import Users from "./Users";
 

// function Left() {
//   return (
//     <div className="w-[30%] bg-gray-600 text-gray-300">
//       <h1 className="font-bold text-2xl  p-2 px-11 mr-8">Rawrecruit</h1>
//     {/* <div className="w-full   bg-black text-gray-300"> */}
//       <Search />
//       <div
//         className=" flex-1  overflow-y-auto"
//         style={{ minHeight: "calc(84vh - 10vh)" }}>
//        <Users />
//       </div>
//     </div>
//   );
// }
// export default Left;

import React from "react";
import Search from "./Search";
import Users from "./Users";

function Left() {
  return (
    <div className="w-[30%] bg-blue-800 text-white flex flex-col h-screen"> {/* Changed to a darker blue background */}
      <h1 className="font-bold text-3xl p-4 text-center border-b border-blue-700">Rawrecruit</h1> {/* Larger font, padding, and bottom border */}
      <Search />
      <div
        className="flex-1 overflow-y-auto"
      >
        <Users />
      </div>
    </div>
  );
}

export default Left;