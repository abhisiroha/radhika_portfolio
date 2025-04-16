import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = ["Home", "Work", "About", "Contact"];

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      {/* Navbar */}
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 transition-all duration-700 sm:inset-x-6 bg-black rounded-4xl mx-4  md:mx-48 px-8"
      >
        <header className="relative">
          <nav className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <div className="flex items-center gap-4 text-white">
              <img
                src="/icons/icon_website_white.svg"
                alt="logo"
                className="size-12"
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 pr-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn text-white"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Hamburger Icon */}
            <div className="md:hidden text-white text-2xl pr-2">
              <button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu Dropdown (separate to avoid clipping) */}
      <div
        className={clsx(
          "fixed top-[60px] left-4 right-4 z-40 rounded-b-4xl bg-black transition-all duration-300 ease-in-out md:hidden p-2",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-4 py-5 border-t border-white/10">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-lg hover:text-gray-400 transition"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavBar;
