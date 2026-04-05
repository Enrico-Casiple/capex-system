import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  return (
    <div className="bg-background border-b border-border px-6 py-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground cursor-pointer transition-colors">
          Home
        </Link>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <div key={segment} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link href={href} className="hover:text-foreground cursor-pointer transition-colors">
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Breadcrumbs