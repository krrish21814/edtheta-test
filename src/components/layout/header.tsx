"use client";
import Link from "next/link";
import { Button } from "../button";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user: userState } = useCurrentUser();

  // Close popover when clicking outside - only for desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only handle desktop popover
      if (window.innerWidth < 768) return;

      const popover = document.getElementById("profile-popover");
      const profileButton = document.getElementById("profile-button");

      if (
        popover &&
        profileButton &&
        !popover.contains(event.target as Node) &&
        !profileButton.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDashboardLink = () => {
    if (!userState) return "/";
    const { role, school_slug } = userState;
    switch (role) {
      case "admin":
        return `/dashboard/${school_slug}/admin`;
      case "principal":
        return `/dashboard/${school_slug}/principal`;
      case "teacher":
        return `/dashboard/${school_slug}/teacher`;
      case "student":
        return `/dashboard/${school_slug}/student`;
      default:
        return "/";
    }
  };

  const handleLogout = async () => {
    // Implement your logout logic here
    console.log("Logging out...");
  };

  const ProfilePopover = () => (
    <div
      id='profile-popover'
      className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 ${
        isProfileOpen ? "block" : "hidden"
      }`}>
      <div className='px-4 py-2 border-b border-gray-200'>
        <p className='text-sm font-medium text-gray-900'>{userState?.name}</p>
        <p className='text-xs text-gray-500'>{userState?.email}</p>
      </div>
      <Link
        href='/profile'
        className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
        onClick={() => setIsProfileOpen(false)}>
        <UserIcon className='w-4 h-4 mr-2' />
        Profile
      </Link>
      <button
        onClick={() => {
          handleLogout();
          setIsProfileOpen(false);
        }}
        className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
        <LogOut className='w-4 h-4 mr-2' />
        Logout
      </button>
    </div>
  );

  const MobileProfileMenu = () => (
    <div className='mt-2 bg-gray-50 rounded-lg p-2'>
      <Link
        href='/profile'
        className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md'
        onClick={() => {
          setIsProfileOpen(false);
          setIsMobileMenuOpen(false);
        }}>
        <UserIcon className='w-4 h-4 mr-2' />
        Profile
      </Link>
      <button
        onClick={() => {
          handleLogout();
          setIsProfileOpen(false);
          setIsMobileMenuOpen(false);
        }}
        className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md'>
        <LogOut className='w-4 h-4 mr-2' />
        Logout
      </button>
    </div>
  );

  return (
    <header className='border-b bg-white'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link
          href='/'
          className='text-2xl font-bold text-emerald-600 flex gap-2 items-center'>
          <Image src='/icons/edtheta.svg' height={24} width={24} alt='logo' />
          Edtheta
        </Link>
        {!userState ? (
          <nav className='hidden md:flex items-center gap-6'>
            <Link
              href='/schools/partner-with-us'
              className='text-emerald-600 hover:text-emerald-700 font-medium'>
              Partner with us
            </Link>
            <Button variant='outline' asChild>
              <Link href='/schools/auth/login'>Sign In</Link>
            </Button>
            <Button asChild>
              <Link href='/schools/auth/signup'>Sign Up</Link>
            </Button>
          </nav>
        ) : (
          <nav className='hidden md:flex items-center gap-6'>
            {/* <Link
              href='/schools/partner-with-us'
              className='text-emerald-600 hover:text-emerald-700 font-medium'>
              Partner with us
            </Link> */}
            <Link
              href={getDashboardLink()}
              className='text-emerald-600 hover:text-emerald-700 font-medium'>
              Dashboard
            </Link>
            <div className='relative'>
              <button
                id='profile-button'
                className='flex items-center gap-2 hover:bg-gray-50 rounded-full py-1 px-2 transition-colors'
                onClick={() => setIsProfileOpen(!isProfileOpen)}>
                {userState.profilePhoto ? (
                  <Image
                    src={userState.profilePhoto}
                    alt={`${userState.name}'s profile`}
                    width={32}
                    height={32}
                    className='rounded-full'
                  />
                ) : (
                  <div className='w-8 h-8 bg-emerald-600 text-white flex items-center justify-center rounded-full'>
                    {userState.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    isProfileOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <ProfilePopover />
            </div>
          </nav>
        )}
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
              href='/schools/partner-with-us'
              className='text-emerald-600 hover:text-emerald-700 font-medium'
              onClick={() => setIsMobileMenuOpen(false)}>
              Partner with us
            </Link>
            {!userState ? (
              <>
                <Button variant='outline' asChild>
                  <Link
                    href='/schools/auth/login'
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link
                    href='/schools/auth/signup'
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href={getDashboardLink()}
                  className='text-emerald-600 hover:text-emerald-700 font-medium'
                  onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <div className='w-full'>
                  <button
                    className='flex items-center gap-2 w-full hover:bg-gray-50 rounded-lg p-2 transition-colors'
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      setIsProfileOpen(!isProfileOpen);
                    }}>
                    {userState.profilePhoto ? (
                      <Image
                        src={userState.profilePhoto}
                        alt={`${userState.name}'s profile`}
                        width={32}
                        height={32}
                        className='rounded-full'
                      />
                    ) : (
                      <div className='w-8 h-8 bg-emerald-600 text-white flex items-center justify-center rounded-full'>
                        {userState.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <span className='text-sm font-medium text-gray-700 flex-1 text-left'>
                      {userState.name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        isProfileOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isProfileOpen && <MobileProfileMenu />}
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
