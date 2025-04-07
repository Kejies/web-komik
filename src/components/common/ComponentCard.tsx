import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title = "",
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      className={`max-w-screen-lg mx-auto w-full rounded-2xl border border-gray-800 bg-black/[0.03] ${className}`}
    >
      <h1 className="text-gray-200 text-xl font-semibold p-4">
        {title}
      </h1>
      {desc && (
        <p className="mt-1 text-sm text-gray-400">
          {desc}
        </p>
      )}

      <div className="p-4 border-tborder-gray-800 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default ComponentCard;
