function EditButton({ onClick }) {
    return (
      <div className="flex justify-end mt-4">
        <button
          onClick={onClick}
          className="px-4 py-1.5 text-xs font-medium text-white bg-black rounded hover:bg-gray-800"
        >
          Edit
        </button>
      </div>
    )
  }
  
  export default EditButton