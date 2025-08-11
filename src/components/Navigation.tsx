'use client';

import Link from 'next/link';

interface NavigationProps {
  currentPage?: 'home' | 'about' | 'media';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const navItems = [
    { href: '/', label: 'Sign', page: 'home' as const },
    { href: '/about', label: 'About', page: 'about' as const },
    { href: '/media', label: 'Media', page: 'media' as const },
  ];

  // Reorder items so current page appears last
  const orderedItems = navItems.sort((a, b) => {
    if (a.page === currentPage) return 1;
    if (b.page === currentPage) return -1;
    return 0;
  });

  return (
    <nav>
      <ul>
        {orderedItems.map(item => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
