'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DebouncedInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
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

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const stringValue = String(value).trim();
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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, debounce, initialValue, minLength]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClear = () => {
    setValue('');
    onClear?.();
  };
  const showClear = value !== '' && value !== initialValue;
  const tooShort = minLength > 1 && String(value).length > 0 && String(value).length < minLength;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors pointer-events-none" />
        <Input
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            'pl-9 pr-16 h-9 text-sm bg-muted/30 border-border/60 rounded-lg',
            'focus-visible:bg-background focus-visible:border-primary/50 transition-all',
            tooShort && 'border-amber-400/60',
            className,
          )}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isDebouncing && (
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-primary" />
          )}
          {showClear && !isDebouncing && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
              onClick={handleClear}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      {tooShort && (
        <p className="text-[10px] text-amber-500 px-1">
          Type at least {minLength} characters to search
        </p>
      )}
    </div>
  );
};
