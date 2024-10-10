import React from "react";

const IsLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-purple-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        <p className="text-purple-600 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default IsLoading;
