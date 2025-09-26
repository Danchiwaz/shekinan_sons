import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { Menu, Moon, Sun } from "lucide-react";
import logo from '../assets/logo.jpeg'

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isDark, setIsDark] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldDark = stored ? stored === 'dark' : prefersDark;
        setIsDark(shouldDark);
        document.documentElement.classList.toggle('dark', shouldDark);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 24);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <motion.div
                className={`${isScrolled ? 'bg-white/80 dark:glass-dark glass backdrop-blur-xl nav-glow' : 'bg-transparent'} transition-colors duration-300`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="#home" className="flex items-center gap-2">
                            <img src={logo} alt="Shekinah logo" className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full object-cover ring-2 ring-white/90 dark:ring-white/70 shadow" />
                        </a>
                    </div>
                    {/*Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#home" className={`nav-link ${isScrolled ? 'text-gray-800/90 dark:text-foreground hover:text-amber-500' : 'text-white/90 hover:text-white'}`}>Home</a>
                        <a href="#about" className={`nav-link ${isScrolled ? 'text-gray-800/90 dark:text-foreground hover:text-amber-500' : 'text-white/90 hover:text-white'}`}>About</a>
                        <a href="#events" className={`nav-link ${isScrolled ? 'text-gray-800/90 dark:text-foreground hover:text-amber-500' : 'text-white/90 hover:text-white'}`}>Events</a>
                        <a href="#sermons" className={`nav-link ${isScrolled ? 'text-gray-800/90 dark:text-foreground hover:text-amber-500' : 'text-white/90 hover:text-white'}`}>Sermons</a>
                        <a href="#gallery" className={`nav-link ${isScrolled ? 'text-gray-800/90 dark:text-foreground hover:text-amber-500' : 'text-white/90 hover:text-white'}`}>Gallery</a>
                        <a href="#devotion" className={`nav-link ${isScrolled ? 'text-gray-800/90 dark:text-foreground hover:text-amber-500' : 'text-white/90 hover:text-white'}`}>Daily Devotion</a>
                        <a href="#contact" className={`nav-link ${isScrolled ? 'text-gray-800/90 dark:text-foreground hover:text-amber-500' : 'text-white/90 hover:text-white'}`}>Contact</a>
                        <button aria-label="Toggle theme" onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-muted transition">
                            {isDark ? <Sun size={18} className={`${isScrolled ? 'text-gray-800 dark:text-foreground' : 'text-white'}`}/> : <Moon size={18} className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}/>}
                        </button>
                        <a href="#contact" className="btn-primary-gradient text-white font-semibold py-2 px-4 rounded-full transition duration-300">
                            Join Us
                        </a>
                    </div>
                    {/*Mobile Menu Button*/}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden focus:outline-none ${isScrolled ? 'text-gray-800 dark:text-foreground' : 'text-white'}`}
                        aria-label="Toggle mobile menu"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </motion.div>
            {/* Mobile Navigation*/}
            {isMobileMenuOpen && (
                <div className="bg-white/80 dark:glass-dark glass px-4 py-3 flex flex-col space-y-3 md:hidden">
                    <a href="#home" className="block py-2 text-gray-800 dark:text-foreground hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                    <a href="#about" className="block py-2 text-gray-800 dark:text-foreground hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                    <a href="#events" className="block py-2 text-gray-800 dark:text-foreground hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>Events</a>
                    <a href="#sermons" className="block py-2 text-gray-800 dark:text-foreground hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>Sermons</a>
                    <a href="#gallery" className="block py-2 text-gray-800 dark:text-foreground hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
                    <a href="#devotion" className="block py-2 text-gray-800 dark:text-foreground hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>Daily Devotion</a>
                    <a href="#contact" className="block py-2 text-gray-800 dark:text-foreground hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                    <div className="flex items-center justify-between pt-2">
                        <button aria-label="Toggle theme" onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-muted transition">
                            {isDark ? <Sun size={18} className="text-gray-800 dark:text-foreground"/> : <Moon size={18} className="text-gray-800"/>}
                        </button>
                        <a href="#contact" className="text-sm btn-primary-gradient text-white py-2 px-4 rounded-full transition duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                            Join Us
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;