import { useApp } from '../../context/AppContext';
import './Services.css';

function Services() {
    const { services } = useApp();

    const getServiceIcon = (category) => {
        const icons = {
            'کوتاهی مو': (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <line x1="20" y1="4" x2="8.12" y2="15.88" />
                    <line x1="14.47" y1="14.48" x2="20" y2="20" />
                    <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
            ),
            'ریش': (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 4 4 8 10 10 6-2 10-6 10-10 0-5.5-4.5-10-10-10z" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
            ),
            'اصلاح صورت': (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="6" y="3" width="12" height="18" rx="2" />
                    <line x1="6" y1="9" x2="18" y2="9" />
                    <line x1="10" y1="6" x2="14" y2="6" />
                </svg>
            ),
            'رنگ': (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            ),
            'پکیج‌ها': (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
            ),
            'خدمات ویژه': (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
            )
        };
        return icons[category] || icons['کوتاهی مو'];
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    return (
        <section id="services" className="services section">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">آنچه ارائه می‌دهیم</span>
                    <h2 className="section-title">خدمات ویژه ما</h2>
                    <p className="section-description">
                        از کوتاهی‌های کلاسیک تا استایل‌های مدرن، آرایشگران ماهر ما در هر خدمت برتری را ارائه می‌دهند.
                    </p>
                </div>

                <div className="services__grid">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="service-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="service-card__icon">
                                {getServiceIcon(service.category)}
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__title">{service.name}</h3>
                                <p className="service-card__description">{service.description}</p>
                                <div className="service-card__meta">
                                    <span className="service-card__price">{formatPrice(service.price)} تومان</span>
                                    <span className="service-card__duration">{service.duration} دقیقه</span>
                                </div>
                            </div>
                            <div className="service-card__glow"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
