import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import content from '@/data/content.json'

const Navbar = () =>  {
    const [isOpen, setIsOpen] = useState(false)
    const { navbar } = content;

    const toggleMenu = () => setIsOpen(!isOpen)
  
    return (
        <>
            <nav className="bg-black text-white shadow-md fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold">
                    <Link href="/">
                        {navbar.logo.text}
                        <span className="text-blue-400">{navbar.logo.highlight}</span>
                    </Link>
                    </div>

                    <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    </div>

                    <ul className="hidden md:flex space-x-6 font-medium">
                    {navbar.menuItems.map((item) => (
                        <li key={item.href}>
                        <Link href={item.href} className="hover:text-blue-400 transition">
                            {item.name}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden px-6 pb-4">
                    <ul className="space-y-4 font-medium">
                        {navbar.menuItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className="block hover:text-blue-400" onClick={() => setIsOpen(false)}>
                            {item.name}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar;