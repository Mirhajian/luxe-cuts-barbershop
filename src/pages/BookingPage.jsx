import Booking from '../components/Booking/Booking';
import './BookingPage.css';

function BookingPage() {
    return (
        <div className="booking-page">
            <div className="booking-page__header">
                <div className="container">
                    <span className="section-subtitle">رزرو نوبت</span>
                    <h1 className="booking-page__title">وقت خود را رزرو کنید</h1>
                    <p className="booking-page__description">
                        آماده یک ظاهر جدید هستید؟ نوبت خود را با آرایشگران ماهر ما در چند کلیک رزرو کنید.
                    </p>
                </div>
            </div>

            <div className="booking-page__content">
                <div className="container">
                    <Booking compact />
                </div>
            </div>
        </div>
    );
}

export default BookingPage;
