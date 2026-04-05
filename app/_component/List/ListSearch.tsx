import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

const ListSearch = () => {
  const { searchItems, setSearchItems } = useListContext();
  const [inputValue, setInputValue] = useState(searchItems || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchItems(inputValue === '' ? null : inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchItems(null);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-80 flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-9 pr-9"
          placeholder="Search..." 
        />
        {inputValue && (
          <Button
            type="button"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" size="default">
        Search
      </Button>
    </form>
  );
};

export default ListSearch;
