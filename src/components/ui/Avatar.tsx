import { useRef } from 'react';
import { Camera } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
  onImageChange?: (base64: string) => void;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-20 h-20 text-xl',
  xl: 'w-28 h-28 text-3xl',
};

export function Avatar({ src, firstName, lastName, size = 'md', editable = false, onImageChange }: AvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'rounded-full flex items-center justify-center font-semibold overflow-hidden',
          'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
          'border-2 border-blue-200 dark:border-blue-700',
          sizeClasses[size]
        )}
      >
        {src ? (
          <img src={src} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {editable && (
        <>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'absolute bottom-0 right-0 p-1.5 rounded-full',
              'bg-blue-600 hover:bg-blue-700 text-white',
              'shadow-md transition-colors',
              'border-2 border-white dark:border-gray-800'
            )}
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}
