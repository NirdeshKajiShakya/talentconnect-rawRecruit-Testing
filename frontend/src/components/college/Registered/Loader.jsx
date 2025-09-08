const Loader = () => {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    );
  };
  
  export default Loader;