import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Booking.css';

function Booking({ compact = false }) {
    const { services, staff, createAppointment } = useApp();
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        serviceId: '',
        staffId: '',
        date: '',
        time: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await createAppointment({
                ...formData,
                serviceId: parseInt(formData.serviceId),
                staffId: parseInt(formData.staffId)
            });
            setSuccess(true);
            setFormData({
                customerName: '',
                customerEmail: '',
                customerPhone: '',
                serviceId: '',
                staffId: '',
                date: '',
                time: ''
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Booking error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className={`booking ${compact ? 'booking--compact' : ''}`}>
                <div className="booking__success">
                    <div className="booking__success-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h3>نوبت شما ثبت شد!</h3>
                    <p>به زودی تأییدیه به ایمیل شما ارسال خواهد شد.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`booking ${compact ? 'booking--compact' : ''}`}>
            {!compact && (
                <div className="section-header">
                    <span className="section-subtitle">رزرو نوبت</span>
                    <h2 className="section-title">وقت خود را رزرو کنید</h2>
                    <p className="section-description">
                        آماده یک ظاهر جدید هستید؟ نوبت خود را در چند کلیک رزرو کنید.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="booking__form">
                <div className="booking__grid">
                    <div className="form-group">
                        <label className="form-label" htmlFor="customerName">نام و نام خانوادگی</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            className="form-input"
                            placeholder="علی محمدی"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="customerEmail">ایمیل</label>
                        <input
                            type="email"
                            id="customerEmail"
                            name="customerEmail"
                            className="form-input"
                            placeholder="ali@example.com"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="customerPhone">شماره موبایل</label>
                        <input
                            type="tel"
                            id="customerPhone"
                            name="customerPhone"
                            className="form-input"
                            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="serviceId">نوع خدمت</label>
                        <select
                            id="serviceId"
                            name="serviceId"
                            className="form-select"
                            value={formData.serviceId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">انتخاب خدمت</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - {formatPrice(service.price)} تومان
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="staffId">آرایشگر</label>
                        <select
                            id="staffId"
                            name="staffId"
                            className="form-select"
                            value={formData.staffId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">هر آرایشگر</option>
                            {staff.map(member => (
                                <option key={member.id} value={member.id}>
                                    {member.name} - {member.role}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="date">تاریخ</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="form-input"
                            min={minDate}
                            max={maxDateStr}
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group form-group--full">
                        <label className="form-label">ساعت مورد نظر</label>
                        <div className="booking__time-slots">
                            {timeSlots.map(time => (
                                <button
                                    key={time}
                                    type="button"
                                    className={`booking__time-slot ${formData.time === time ? 'booking__time-slot--selected' : ''}`}
                                    onClick={() => setFormData(prev => ({ ...prev, time }))}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary booking__submit"
                    disabled={submitting || !formData.time}
                >
                    {submitting ? (
                        <>
                            <span className="booking__spinner"></span>
                            در حال ثبت...
                        </>
                    ) : (
                        <>
                            تأیید و رزرو
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default Booking;
