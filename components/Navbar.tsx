'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm font-bold tracking-tight">PROP</span>
          <span className="text-blue-600">Fast</span>
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/#how-it-works" className="hover:text-gray-900 transition-colors">How it works</Link>
          <Link href="/#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
          <Link href="/dashboard" className={`hover:text-gray-900 transition-colors ${pathname === '/dashboard' ? 'text-gray-900' : ''}`}>Dashboard</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            My Proposals
          </Link>
          <Link
            href="/create"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Create Proposal
          </Link>
        </div>
      </div>
    </nav>
  );
}
