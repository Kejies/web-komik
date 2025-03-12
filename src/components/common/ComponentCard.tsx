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
  desc= "",
}) => {
  return (
    <div
      className={`max-w-screen-lg mx-auto px-4 w-full rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <h1 className="text-gray-900 dark:text-gray-200 text-xl font-semibold p-4">
        {title}
      </h1>
      {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default ComponentCard;
