import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    const persianYear = currentYear - 621; // Approximate Persian year

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <svg className="footer__logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="6" cy="6" r="3" />
                                <circle cx="6" cy="18" r="3" />
                                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                                <line x1="8.12" y1="8.12" x2="12" y2="12" />
                            </svg>
                            <span>لوکس کاتز</span>
                        </Link>
                        <p className="footer__tagline">
                            جایی که استایل با دقت تلاقی می‌کند. مقصد ویژه شما برای خدمات آراستگی حرفه‌ای.
                        </p>
                    </div>

                    <div className="footer__links">
                        <h4 className="footer__title">دسترسی سریع</h4>
                        <ul>
                            <li><Link to="/">خانه</Link></li>
                            <li><Link to="/#services">خدمات</Link></li>
                            <li><Link to="/#team">تیم ما</Link></li>
                            <li><Link to="/booking">رزرو نوبت</Link></li>
                        </ul>
                    </div>

                    <div className="footer__links">
                        <h4 className="footer__title">خدمات</h4>
                        <ul>
                            <li><span>کوتاهی کلاسیک</span></li>
                            <li><span>اصلاح ریش</span></li>
                            <li><span>اصلاح با تیغ</span></li>
                            <li><span>رنگ مو</span></li>
                        </ul>
                    </div>

                    <div className="footer__links">
                        <h4 className="footer__title">تماس</h4>
                        <ul>
                            <li><span>خیابان ولیعصر</span></li>
                            <li><span>تهران، ایران</span></li>
                            <li><span>۰۲۱-۱۲۳۴۵۶۷۸</span></li>
                            <li><span>info@luxecuts.ir</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {persianYear} لوکس کاتز. تمامی حقوق محفوظ است.
                    </p>
                    <div className="footer__bottom-links">
                        <a href="#">حریم خصوصی</a>
                        <a href="#">شرایط استفاده</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
