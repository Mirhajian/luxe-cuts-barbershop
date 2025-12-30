import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const handleNavClick = (e, id) => {
        if (location.pathname !== '/') {
            return;
        }
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="container header__container">
                <Link to="/" className="header__logo">
                    <svg className="header__logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <line x1="20" y1="4" x2="8.12" y2="15.88" />
                        <line x1="14.47" y1="14.48" x2="20" y2="20" />
                        <line x1="8.12" y1="8.12" x2="12" y2="12" />
                    </svg>
                    <span className="header__logo-text">لوکس کاتز</span>
                </Link>

                <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
                    <ul className="header__nav-list">
                        <li>
                            <Link to="/" onClick={(e) => handleNavClick(e, 'hero')}>خانه</Link>
                        </li>
                        <li>
                            <Link to="/#services" onClick={(e) => handleNavClick(e, 'services')}>خدمات</Link>
                        </li>
                        <li>
                            <Link to="/#team" onClick={(e) => handleNavClick(e, 'team')}>تیم ما</Link>
                        </li>
                        <li>
                            <Link to="/#contact" onClick={(e) => handleNavClick(e, 'contact')}>تماس</Link>
                        </li>
                        <li>
                            <Link to="/login">مدیریت</Link>
                        </li>
                    </ul>
                </nav>

                <div className="header__actions">
                    <Link to="/booking" className="btn btn-primary header__cta">
                        رزرو نوبت
                    </Link>
                    <button
                        className={`header__menu-toggle ${menuOpen ? 'header__menu-toggle--open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="منوی موبایل"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
