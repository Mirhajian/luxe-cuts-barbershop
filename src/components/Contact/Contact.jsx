import './Contact.css';

function Contact() {
    return (
        <section id="contact" className="contact section">
            <div className="container">
                <div className="contact__grid">
                    <div className="contact__info">
                        <span className="section-subtitle">ارتباط با ما</span>
                        <h2 className="section-title">به ما سر بزنید</h2>
                        <p className="contact__description">
                            برای یک کوتاهی عالی به ما سر بزنید یا با ما تماس بگیرید. ما همیشه خوشحال می‌شویم که به شما کمک کنیم بهترین ظاهر را داشته باشید.
                        </p>

                        <div className="contact__details">
                            <div className="contact__detail">
                                <div className="contact__detail-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div className="contact__detail-content">
                                    <h4>آدرس</h4>
                                    <p>خیابان ولیعصر، نبش کوچه استایل</p>
                                    <p>تهران، ایران</p>
                                </div>
                            </div>

                            <div className="contact__detail">
                                <div className="contact__detail-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div className="contact__detail-content">
                                    <h4>ساعات کاری</h4>
                                    <p>شنبه تا چهارشنبه: ۹ صبح - ۹ شب</p>
                                    <p>پنج‌شنبه و جمعه: ۱۰ صبح - ۶ عصر</p>
                                </div>
                            </div>

                            <div className="contact__detail">
                                <div className="contact__detail-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                </div>
                                <div className="contact__detail-content">
                                    <h4>تماس</h4>
                                    <p>۰۲۱-۱۲۳۴۵۶۷۸</p>
                                    <p>info@luxecuts.ir</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact__social">
                            <a href="#" className="contact__social-link" aria-label="اینستاگرام">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href="#" className="contact__social-link" aria-label="تلگرام">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21.5 2.5L2 12l7 2.5m12.5-12L9 14.5v5l3.5-3.5 5 4 4-17.5z" />
                                </svg>
                            </a>
                            <a href="#" className="contact__social-link" aria-label="واتساپ">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="contact__map">
                        <div className="contact__map-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>نقشه</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
