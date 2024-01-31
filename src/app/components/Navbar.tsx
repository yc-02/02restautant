"use client"
import Link from "next/link"
import { useState } from "react"


export default function Navbar(){
    const [open,setOpen]=useState(false)
    const toggle =()=>{
        setOpen(!open)
    }
    return(
    <div className="md:flex items-center justify-between mx-auto p-4">
        <div className="flex justify-between">
        <h2 className="text-sm hidden md:block">02 restaurant | somewhere, New York, NY 10024 </h2>
        <Link href="/" className="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

        </Link>


            <div className="px-4 cursor-pointer md:hidden" id="burger">
            <svg onClick={toggle} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </div>
        </div>
        <div className={`${open?"":"hidden md:block"}`}>
                <div className="mt-4 flex flex-col bg-slate-100 rounded md:flex-row md:w-auto md:gap-5 md:bg-inherit md:mt-0">
                <Link className="text-center content-center p-1 hover:bg-slate-200 rounded cursor-pointer"href="/">Home</Link>
                <Link className="text-center content-center p-1 hover:bg-slate-200 rounded cursor-pointer"href="/menus">Menu</Link>
                <Link className="text-center content-center p-1 hover:bg-slate-200 rounded cursor-pointer" href="/reserve">Reserve</Link>
                <Link className="text-center content-center p-1 hover:bg-slate-200 rounded cursor-pointer" href="#">About</Link>
                <Link className="text-center content-center p-1 hover:bg-slate-200 rounded cursor-pointer" href="#">Contact</Link>
                </div>
        </div>
    </div>
    )
}