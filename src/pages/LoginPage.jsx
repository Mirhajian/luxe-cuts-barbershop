import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            navigate('/admin');
        } else {
            setError('نام کاربری یا رمز عبور اشتباه است');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-card__header">
                    <svg className="login-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <line x1="20" y1="4" x2="8.12" y2="15.88" />
                        <line x1="14.47" y1="14.48" x2="20" y2="20" />
                        <line x1="8.12" y1="8.12" x2="12" y2="12" />
                    </svg>
                    <h1>ورود به پنل مدیریت</h1>
                    <p>لوکس کاتز</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login-error">{error}</div>}

                    <div className="form-group">
                        <label className="form-label">نام کاربری</label>
                        <input
                            type="text"
                            className="form-input"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            placeholder="admin"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">رمز عبور</label>
                        <input
                            type="password"
                            className="form-input"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary login-btn">
                        ورود
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
