'use client'

import React from 'react'
import { useState } from 'react';
import svg from '../../../public/magnifying-glass-10-svgrepo-com.svg'
import Image from "next/image"
import logo from '../icon.ico'
import {
    SignInButton,
    SignUp,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link';


function HeaderClient() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const router = useRouter()
    const { user } = useUser()


    const searchOpen = () => setSearchActive(!searchActive);

    return (
        <div className="relative w-full">
            {/* header */}
            <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 background w-full headerBorder z-50">
                {/* Logo */}
                <Image className='cursor-pointer' src={logo} width={30} height={30} alt="logo" onClick={() => router.push('/')} />

                {/* Welcome message for logged-in users */}
                {user && (
                    <h2 className="pl-4 hidden md:flex">{`Welcome, ${user.name}`}</h2>
                )}
                {/* Search Bar (Desktop Hidden, Mobile Centered) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:hidden">
                    <Image
                        onClick={searchOpen}
                        className="cursor-pointer search"
                        src={svg}
                        alt="Search Icon"
                        width={20}
                        height={20}
                    />
                    {searchActive && (
                        <form className="absolute left-1/2 transform -translate-x-1/2 mt-2">
                            <input
                                className="rounded primaryBorder searchInput bg-gray-800 text-white p-2"
                                type="text"
                                name="search"
                                placeholder="Search..."
                            />
                        </form>
                    )}
                </div>

                {/* Hamburger Menu (Mobile Only) */}
                <div
                    className={`hamburger md:hidden cursor-pointer transform transition-transform duration-300 ${isOpen && 'rotate-90'
                        }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="burger burger1"></div>
                    <div className="burger burger2"></div>
                    <div className="burger burger3"></div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="absolute top-14 left-0 right-0 bg-transparent backdrop-blur-md pb-6">
                        <ul className="flex flex-col items-center  text-purple-300 space-y-20 mt-4">

                            <SignedOut>
                                <SignInButton />
                                <SignUp />
                            </SignedOut>
                            {user && (<SignedIn>

                                <Link href={'/'}>Feed</Link>
                                <Link href={`/profile/${user.id}`}>Profile</Link>
                                <Link href={'/news'}>News</Link>
                                <Link href={'/friends'}>Friends</Link>
                                <UserButton />
                            </SignedIn>)}
                        </ul>
                    </div>
                )}

                {/* Desktop Navbar and Search Bar */}
                <div className="hidden md:flex items-center gap-8 ml-auto">
                    {/* Search Icon */}
                    <div className="relative">
                        <Image
                            onClick={searchOpen}
                            className="cursor-pointer search"
                            src={svg}
                            alt="Search Icon"
                            width={20}
                            height={20}
                        />
                        {searchActive && (
                            <form className="absolute top-full mt-2">
                                <input
                                    className="rounded primaryBorder searchInput bg-gray-800 text-white p-2"
                                    type="text"
                                    name="search"
                                    placeholder="Search..."
                                />
                            </form>
                        )}
                    </div>


                    <ul className="flex space-x-6 cursor-pointer text-white">

                        <SignedOut>
                            <SignInButton />
                            <SignUpButton />
                        </SignedOut>
                        {user && (
                            <SignedIn>
                                <Link href={'/'}>Feed</Link>
                                <Link href={`/profile/${user.id}`}>Profile</Link>
                                <Link href={'/news'}>News</Link>
                                <Link href={'/friends'}>Friends</Link>
                                <UserButton />
                            </SignedIn>
                        )}

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HeaderClient;