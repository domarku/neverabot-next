'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Sign</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
    </nav>
  )
}
