import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={cn(
        "w-4 h-4 appearance-none bg-white border border-gray-400 rounded-sm flex items-center justify-center",
        "data-[state=checked]:bg-white data-[state=checked]:border-black",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black",
        className
      )}
    >
      <CheckboxPrimitive.Indicator className="text-black">
        <CheckIcon className="w-3 h-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
