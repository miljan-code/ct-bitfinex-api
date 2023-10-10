import { Link } from 'react-router-dom';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';

export const Header = () => {
  const [isSigned, setIsSigned] = useLocalStorage('CT__isSigned', false);

  return (
    <div className="relative py-3 flex items-center justify-between after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-header-border">
      <div className="flex">
        <Link
          to="/"
          className={cn(buttonVariants({ variant: 'ghost' }), 'cursor-pointer')}
        >
          Home
        </Link>
        {isSigned && (
          <Link
            to="/favorites"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'cursor-pointer'
            )}
          >
            Favorites
          </Link>
        )}
      </div>
      {!isSigned && <Button onClick={() => setIsSigned(true)}>Login</Button>}
    </div>
  );
};
