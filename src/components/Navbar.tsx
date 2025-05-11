import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'
import content from '@/data/content.json'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
    name: string;
    href: string;
}

const Navbar = () =>  {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const { navbar } = content;
    const router = useRouter();

    // Throttle function to limit scroll event firing
    const throttle = (func: Function, limit: number) => {
        let inThrottle: boolean;
        return function(this: any, ...args: any[]) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Memoize the scroll handler
    const handleScroll = useCallback(throttle(() => {
        const scrollPosition = window.scrollY + 100;

        // Reset active section if at the top
        if (scrollPosition < 100) {
            setActiveSection('');
            return;
        }

        // Find the closest section
        const sections = content.navbar.menuItems
            .filter((item: NavItem) => item.href.startsWith('#'))
            .map((item: NavItem) => {
                const element = document.getElementById(item.href.replace('#', ''));
                if (!element) return null;
                const rect = element.getBoundingClientRect();
                const distance = Math.abs(rect.top);
                return { id: item.href, distance };
            })
            .filter(Boolean);

        if (sections.length > 0) {
            const closest = sections.reduce((prev: any, curr: any) => 
                prev.distance < curr.distance ? prev : curr
            );
            if (closest) {
                setActiveSection(closest.id);
            }
        }
    }, 50), []);

    useEffect(() => {
        setMounted(true)
        
        // Handle hash on page load
        if (window.location.hash) {
            const sectionId = window.location.hash.slice(1);
            setActiveSection(sectionId);
        }

        // Add scroll event listener to update active section
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll])

    // Handle hash changes
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash) {
                const sectionId = window.location.hash.slice(1);
                setActiveSection(sectionId);
                const element = document.getElementById(sectionId);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                setActiveSection('');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen)

    const isActive = (path: string) => {
        // For home link
        if (path === '/') {
            return router.pathname === path && !activeSection;
        }
        
        // For projects page
        if (path === '/projects') {
            return router.pathname === path;
        }

        // For section links
        if (path.startsWith('/#')) {
            const section = path.replace('/#', '');
            return activeSection === section;
        }

        return false;
    }

    const handleSectionClick = async (sectionId: string) => {
        setIsOpen(false);
        
        // If we're on the projects page, navigate to home with hash
        if (router.pathname === '/projects') {
            setActiveSection(sectionId);
            await router.push(`/#${sectionId}`);
            // Add a small delay to ensure the page is loaded
            await new Promise(resolve => setTimeout(resolve, 100));
            const element = document.getElementById(sectionId);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // For navigation between sections
            const element = document.getElementById(sectionId);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Update URL hash without triggering scroll
                window.history.pushState(null, '', `#${sectionId}`);
                setActiveSection(sectionId);

                // Add a small delay before scrolling
                await new Promise(resolve => setTimeout(resolve, 50));

                // Smooth scroll to the section
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Handle route changes
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (url === '/projects') {
                setActiveSection('');
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    const handleNavigation = async (item: NavItem) => {
        setIsOpen(false);
        
        if (item.href === '/projects') {
            setActiveSection('');
            await router.push('/projects');
        } else if (item.href === '/') {
            setActiveSection('');
            await router.push('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const sectionId = item.href.replace('/#', '');
            handleSectionClick(sectionId);
        }
    }

    if (!mounted) {
        return null;
    }
  
    return (
        <>
            <nav className="bg-black/50 text-white shadow-md fixed w-full z-50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
                    <div className="text-lg md:text-xl font-bold">
                        <Link href="/">
                            {navbar.logo.text}
                            <span className="text-blue-400">{navbar.logo.highlight}</span>
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button 
                            onClick={toggleMenu}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    </div>

                    <ul className="hidden md:flex space-x-8 font-medium">
                        {navbar.menuItems.map((item) => (
                            <li key={`desktop-${item.href}`} className="relative">
                                <button 
                                    onClick={() => handleNavigation(item)}
                                    className={`relative py-2 px-1 ${
                                        isActive(item.href) 
                                            ? 'text-blue-400' 
                                            : 'text-gray-300 hover:text-white'
                                    } transition-colors duration-300 cursor-pointer`}
                                >
                                    {item.name}
                                    <AnimatePresence>
                                        {isActive(item.href) && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            className="md:hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-2 bg-black/80 backdrop-blur-xl">
                                <ul className="space-y-2">
                                    {navbar.menuItems.map((item) => (
                                        <motion.li 
                                            key={`mobile-${item.href}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <button 
                                                onClick={() => handleNavigation(item)}
                                                className={`w-full text-left py-3 px-4 rounded-lg ${
                                                    isActive(item.href) 
                                                        ? 'bg-blue-400/20 text-blue-400' 
                                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                                } transition-all duration-300`}
                                            >
                                                {item.name}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    )
}

export default Navbar;