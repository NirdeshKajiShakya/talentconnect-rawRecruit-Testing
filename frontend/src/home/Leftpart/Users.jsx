// import React from "react";
// import User from "./User";
// import useGetAllUsers from "../../context/useGetAllUsers";

// function Users() {
//   const [allUsers, loading] = useGetAllUsers();
//   // console.log(allUsers);
//   return (
//     <div>
//       <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
//         Messages
//       </h1>
//       <div
//         className="py-2 flex-1 overflow-y-auto"
//         style={{ maxHeight: "calc(84vh - 10vh)" }}
//       >
//         {allUsers.map((user, index) => (
//           <User key={index} user={user} />
//         ))}
//       </div>
//     </div>
//   );
// }
// export default Users;



import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";
import Loading from "../../components/Loading"; // Assuming you have a Loading component

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <div>
      <h1 className="px-8 py-3 text-white font-semibold bg-blue-900 border-b border-blue-700"> {/* Darker blue background, border */}
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 100px - 64px)" }} // Adjusted max height considering header and search bar
      >
        {loading ? (
          <Loading /> // Show loading component
        ) : (
          allUsers.length > 0 ? (
            allUsers.map((user, index) => (
              <User key={index} user={user} />
            ))
          ) : (
            <p className="text-center text-blue-200 mt-4">No users found.</p> // Message when no users
          )
        )}
      </div>
    </div>
  );
}

export default Users;