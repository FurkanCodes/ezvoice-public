const SidebarHeader = () => {
    return (
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Dashboard</h1>
            <p className="text-indigo-100 text-sm">Welcome back, User!</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default SidebarHeader;