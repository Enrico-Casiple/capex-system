'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { SidebarItem, SidebarSection } from './sidebar-data';
import Link from 'next/link';

interface NavMainProps {
  items: SidebarSection[];
}

function NavItem({ item, depth = 0 }: { item: SidebarItem; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0;

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '0.375rem 0.5rem',
            paddingLeft: `${0.5 + depth}rem`,
            borderRadius: '0.375rem',
            color: 'black',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            gap: '0.5rem',
            fontSize: '0.875rem',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <span style={{ flex: 1, textAlign: 'left' }}>{item.title}</span>
          <ChevronRight
            style={{
              width: '1rem',
              height: '1rem',
              transition: 'transform 200ms',
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          />
        </button>
      ) : (
        <Link
          href={item.url}
          style={{
            display: 'block',
            padding: '0.375rem 0.5rem',
            paddingLeft: `${0.5 + depth}rem`,
            fontSize: '0.875rem',
            color: '#000000',
            borderRadius: '0.375rem',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {item.title}
        </Link>
      )}

      {hasChildren && open && (
        <div style={{ borderLeft: '1px solid #334155', marginLeft: `${1 + depth}rem` }}>
          {item.items!.map((child) => (
            <NavItem key={child.title} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function NavMain({ items }: NavMainProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  if (items.length === 0) return null;

  const toggle = (title: string) =>
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );

  return (
    <div style={{ padding: '0.5rem' }}>
      <p style={{ fontSize: '0.75rem', color: '#00000', padding: '0 0.5rem 0.5rem' }}>Management</p>
      {items.map((item) => (
        <div key={item.title}>
          <button
            onClick={() => toggle(item.title)}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              color: 'black',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {item.icon && <item.icon style={{ width: '1rem', height: '1rem' }} />}
            <span style={{ flex: 1, textAlign: 'left', fontSize: '0.875rem' }}>{item.title}</span>
            {item.items && item.items.length > 0 && (
              <ChevronRight
                style={{
                  width: '1rem',
                  height: '1rem',
                  transition: 'transform 200ms',
                  transform: openItems.includes(item.title) ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              />
            )}
          </button>

          {item.items && openItems.includes(item.title) && (
            <div style={{ borderLeft: '1px solid #334155', marginLeft: '1rem' }}>
              {item.items.map((subItem) => (
                <NavItem key={subItem.title} item={subItem} depth={1} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
