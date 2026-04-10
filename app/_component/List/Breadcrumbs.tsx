import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, House } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link
        href="/home"
        className="flex items-center text-gray-400 hover:text-gray-700 transition-colors"
      >
        <House className="h-3.5 w-3.5" />
      </Link>

      {pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        // Skip "home" segment since we already show the house icon
        if (segment.toLowerCase() === 'home') return null;

        return (
          <div key={segment} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
            {isLast ? (
              <span className="font-medium text-gray-700">{label}</span>
            ) : (
              <Link href={href} className="text-gray-400 hover:text-gray-700 transition-colors">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
