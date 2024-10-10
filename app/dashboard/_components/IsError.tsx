import React from "react";
import { AlertCircle } from "lucide-react"; // Optional: You can use an icon library like lucide-react for the error icon.

const IsError: React.FC<{ message?: string }> = ({
  message = "An error occurred!",
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="text-red-600">
          <AlertCircle size={48} />{" "}
          {/* Error icon, you can replace this with any error icon */}
        </div>
        <p className="text-red-600 text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default IsError;
