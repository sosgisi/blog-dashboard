'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "./ui/search";
import ThemeToggle from "./ui/theme-toggle";

export default function Navbar({searchBar}: {searchBar?: boolean}) {

    const pathname = usePathname();

    const [title, setTitle] = useState("Blogs");

    useEffect(() => {
        if(pathname === '/'){
            setTitle("Blogs");
        }else if(pathname === '/HOST/local/posts'){
            setTitle("My Posts");
        }else if(pathname === '/HOST/local/posts/new'){
            setTitle("New Post");
        }
    }, [pathname])

    return(
        <>
        <nav className="h-16 bg-foreground/20 flex justify-between items-center m-5 px-5 rounded-full shadow-md backdrop-blur-md">
            <h1 data-testid="navbar-title" className="text-xl sm:text-2xl font-bold">{title}</h1>

            <div className="hidden sm:flex">
                {searchBar && <Search placeholder="search..." /> }
            </div>

            <ul className="flex gap-5">
                <li>
                    <Link href="/" className={`${pathname==='/' ? 'text-foreground' : 'text-foreground/70'} hover:text-foreground transform duration-200`}>Blogs</Link>
                </li>
                <li>
                    <Link href="/HOST/local/posts" className={`${pathname==='/HOST/local/posts' ? 'text-foreground' : 'text-foreground/70'} hover:text-foreground transform duration-200`}>My Posts</Link>
                </li>
                <li>
                    <ThemeToggle />
                </li>
            </ul>
        </nav>
        <div className="flex sm:hidden">
            {searchBar && <Search placeholder="search..." /> }
        </div>
        </>
    )
}