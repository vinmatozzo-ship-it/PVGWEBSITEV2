import React from 'react';
import { cn } from "@/src/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-black/10 bg-white text-black shadow", className)}
      {...props}
    />
  )
);
Card.displayName = "Card"
