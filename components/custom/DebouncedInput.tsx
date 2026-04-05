"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  minLength?: number;
  onClear?: () => void;
}

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  minLength = 2,
  className,
  onClear,
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = React.useState(initialValue);
  const [isDebouncing, setIsDebouncing] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = React.useRef<(value: string | number) => void>(onChange);


  // Keep onChange ref updated without triggering effects
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const stringValue = String(value).trim();
    
    // Don't trigger search for empty or too short queries
    if (stringValue === String(initialValue)) return;
    if (stringValue.length > 0 && stringValue.length < minLength) {
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);

    timeoutRef.current = setTimeout(() => {
      onChangeRef.current(value);
      setIsDebouncing(false);
    }, debounce);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, debounce, initialValue, minLength]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClear = () => {
    setValue("");
    onClear?.();
  };

  const showClear = value !== "" && value !== initialValue;

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn("pl-10 pr-20", className)}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {isDebouncing && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        )}
        {showClear && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleClear}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      {minLength > 1 && String(value).length > 0 && String(value).length < minLength && (
        <p className="text-xs text-muted-foreground mt-1">
          Type at least {minLength} characters to search
        </p>
      )}
    </div>
  );
};
