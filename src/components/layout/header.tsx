"use client";
import Link from "next/link";
import { Button } from "../button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className='border-b bg-white'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link
          href='/'
          className='text-2xl font-bold text-emerald-600 flex gap-2 items-center'>
          <Image src='/icons/edtheta.svg' height={24} width={24} alt='logo' />
          Edtheta
        </Link>
        <nav className='hidden md:flex items-center gap-6'>
          <Link
            href='/schools/partner-with-us'
            className='text-emerald-600 hover:text-emerald-700 font-medium'>
            Partner with us
          </Link>
          <Button variant='outline' asChild>
            <Link href='/dashboard/school-123/admin'>Sign In</Link>
          </Button>
          <Button asChild>
            <Link href='/signup'>Sign Up</Link>
          </Button>
        </nav>
        {/* Mobile Menu Icon */}
        <button
          className='md:hidden text-emerald-600'
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
          {isMobileMenuOpen ? (
            <X className='w-6 h-6' />
          ) : (
            <Menu className='w-6 h-6' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white border-t'>
          <nav className='flex flex-col items-start px-4 py-2 gap-4'>
            <Link
              href='/partner'
              className='text-emerald-600 hover:text-emerald-700 font-medium'
              onClick={() => setIsMobileMenuOpen(false)}>
              Partner with us
            </Link>
            <Button variant='outline' asChild>
              <Link href='/signin' onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button asChild>
              <Link href='/signup' onClick={() => setIsMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
