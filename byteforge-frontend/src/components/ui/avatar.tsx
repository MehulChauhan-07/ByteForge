// import * as React from "react";
// import * as AvatarPrimitive from "@radix-ui/react-avatar";

// import { cn } from "../../lib/utils";

// const Avatar = React.forwardRef<
//   React.ElementRef<typeof AvatarPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
// >(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Root
//     ref={ref}
//     className={cn(
//       "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
//       className
//     )}
//     {...props}
//   />
// ));
// Avatar.displayName = AvatarPrimitive.Root.displayName;

// const AvatarImage = React.forwardRef<
//   React.ElementRef<typeof AvatarPrimitive.Image>,
//   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
// >(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Image
//     ref={ref}
//     className={cn("aspect-square h-full w-full", className)}
//     {...props}
//   />
// ));
// AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// const AvatarFallback = React.forwardRef<
//   React.ElementRef<typeof AvatarPrimitive.Fallback>,
//   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
// >(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Fallback
//     ref={ref}
//     className={cn(
//       "flex h-full w-full items-center justify-center rounded-full bg-muted",
//       className
//     )}
//     {...props}
//   />
// ));
// AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// export { Avatar, AvatarImage, AvatarFallback };
import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  className = "",
  children,
}) => {
  const [error, setError] = React.useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <div
      className={`relative h-10 w-10 rounded-full overflow-hidden ${className}`}
    >
      {!error && src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-muted text-foreground font-medium">
          {fallback || alt?.charAt(0) || "U"}
        </div>
      )}
      {children}
    </div>
  );
};

export const AvatarImage: React.FC<{ src?: string; alt?: string }> = ({
  src,
  alt,
}) => {
  return null; // This is just a placeholder as the actual implementation is in Avatar
};

export const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return null; // This is just a placeholder as the actual implementation is in Avatar
};