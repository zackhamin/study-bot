import React from "react";
import { Loader2 } from "lucide-react";

const LoadingIndicator = ({ size = 24, color = "text-primary" }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Loader2 className={`animate-spin ${color}`} size={size} />
    </div>
  );
};

export default LoadingIndicator;
