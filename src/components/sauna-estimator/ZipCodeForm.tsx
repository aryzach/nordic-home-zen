import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface ZipCodeFormProps {
  onSubmit: (zip: string) => void;
  isLoading: boolean;
  error: string | null;
}

const ZipCodeForm = ({ onSubmit, isLoading, error }: ZipCodeFormProps) => {
  const [zip, setZip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.trim()) {
      onSubmit(zip.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start">
      <div className="flex-1 w-full sm:max-w-xs">
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={5}
          placeholder="e.g. 94110"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
          className="h-12 text-base bg-background border-border"
          aria-label="ZIP code"
        />
        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isLoading || zip.length !== 5}
        className="h-12 px-6"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Search className="h-4 w-4 mr-2" />
        )}
        Estimate Temperatures
      </Button>
    </form>
  );
};

export default ZipCodeForm;
