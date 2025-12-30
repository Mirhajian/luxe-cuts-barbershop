import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Notification from './components/Notification/Notification';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

// Protected Route component
function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
    const { loading, notification } = useApp();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>در حال بارگذاری لوکس کاتز...</p>
            </div>
        );
    }

    return (
        <div className="app">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>
            <Footer />
            {notification && (
                <Notification message={notification.message} type={notification.type} />
            )}
        </div>
    );
}

export default App;
