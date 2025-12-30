import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import Staff from '../components/Staff/Staff';
import Contact from '../components/Contact/Contact';
import Booking from '../components/Booking/Booking';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <Hero />
            <Services />
            <Staff />

            <section id="book" className="section booking-section">
                <div className="container">
                    <Booking />
                </div>
            </section>

            <Contact />
        </div>
    );
}

export default Home;
