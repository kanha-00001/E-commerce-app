import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you still want to use shadcn's cn utility for classNames

function CustomCheckbox({ className, checked, onCheckedChange, ...props }) {
  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className={cn(
          "peer h-4 w-4 appearance-none rounded-[4px] border border-white bg-transparent checked:bg-white checked:border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      {/* Custom checkmark */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity",
          "text-black" // Checkmark color
        )}
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 11 8 15 16 6" />
        </svg>
      </span>
    </div>
  );
}

export { CustomCheckbox };