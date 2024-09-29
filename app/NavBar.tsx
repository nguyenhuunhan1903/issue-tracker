import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
const NavBar = () => {
    const links=[
        {label:'dashboard',link:'/dashboard'},
        {label:'issues',link:'/issues'},
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href={'/'}><AiFillBug/></Link>
        <ul className='flex space-x-6'>
            {links.map((x)=><li key={x.link}><Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href={x.link}>{x.label}</Link></li>)}
        </ul>
    </nav>
  )
}

export default NavBar