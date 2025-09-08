function FormContainer({ children }) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
        {children}
      </div>
    )
  }
  
  export default FormContainer