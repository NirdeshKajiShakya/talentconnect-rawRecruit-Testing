import React, { useEffect } from "react";
import { useRole } from "@/context/RoleContext/RoleContext";

export const Welcome = ({ onNext, onCancel }) => {
  const { selectedRole, updateRole } = useRole();
  
  // Verify role persistence when Welcome component mounts
  useEffect(() => {
    const storedRole = localStorage.getItem('selectedRole');
    
    // If there's a role in localStorage but not in context, update context
    if (storedRole && !selectedRole) {
      updateRole(storedRole);
    }
    // If there's a role in context but not in localStorage, update localStorage
    else if (selectedRole && !storedRole) {
      localStorage.setItem('selectedRole', selectedRole);
    }
  }, [selectedRole, updateRole]);

  return (
    <div className="justify-center items-stretch bg-white self-center z-0 flex w-[1144px] max-w-full flex-col pb-6">
      <div className="w-full text-black text-center max-md:max-w-full">
        <h1 className="text-2xl font-bold leading-[1.4] max-md:max-w-full">
          Create Your Profile
        </h1>
        <p className="text-base font-normal mt-2 max-md:max-w-full">
          Build your profile to explore job opportunities, internships, and
          campus placements.
        </p>
        {selectedRole && (
          <p className="text-base font-normal mt-2 max-md:max-w-full">
            You are applying as a <strong>{selectedRole}</strong>
          </p>
        )}
      </div>
      <div className="self-center flex items-center gap-4 text-base font-normal whitespace-nowrap mt-6">
        <div className="self-stretch flex gap-4 my-auto">
          <button
            onClick={onCancel}
            className="self-stretch gap-2 border rounded-md text-black px-6 py-3 max-md:px-5 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onNext}
            className="self-stretch bg-black gap-2 border rounded-md text-white px-6 py-3 max-md:px-5 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};