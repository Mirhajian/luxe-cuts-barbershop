import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
    return (
        <section id="hero" className="hero">
            <div className="hero__background">
                <div className="hero__gradient"></div>
                <div className="hero__pattern"></div>
            </div>

            <div className="container hero__container">
                <div className="hero__content">
                    <span className="hero__badge">تجربه آراستگی لوکس</span>
                    <h1 className="hero__title">
                        جایی که استایل با
                        <span className="text-gradient"> دقت </span>
                        تلاقی می‌کند
                    </h1>
                    <p className="hero__description">
                        هنر آراستگی را در لوکس کاتز تجربه کنید. آرایشگران ماهر ما با ترکیب تکنیک‌های
                        سنتی و سبک‌های مدرن، ظاهری بی‌نقص برای شما خلق می‌کنند.
                    </p>
                    <div className="hero__actions">
                        <Link to="/booking" className="btn btn-primary">
                            رزرو نوبت
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <a href="#services" className="btn btn-secondary">
                            مشاهده خدمات
                        </a>
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="hero__image-frame">
                        <div className="hero__image-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="6" cy="6" r="3" />
                                <circle cx="6" cy="18" r="3" />
                                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                                <line x1="8.12" y1="8.12" x2="12" y2="12" />
                            </svg>
                        </div>
                        <div className="hero__image-glow"></div>
                    </div>

                    <div className="hero__stats">
                        <div className="hero__stat">
                            <span className="hero__stat-number">+۱۲</span>
                            <span className="hero__stat-label">سال تجربه</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-number">+۵۰۰۰</span>
                            <span className="hero__stat-label">مشتری راضی</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-number">۴.۹</span>
                            <span className="hero__stat-label">امتیاز</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero__scroll-indicator">
                <span>اسکرول کنید</span>
                <div className="hero__scroll-line"></div>
            </div>
        </section>
    );
}

export default Hero;
