import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './AdminPage.css';

function AdminPage() {
    const { services, staff, appointments, addService, addStaff, appointmentService, serviceService, staffService, showNotification } = useApp();
    const [activeTab, setActiveTab] = useState('services');

    const [serviceForm, setServiceForm] = useState({
        name: '',
        category: 'کوتاهی مو',
        description: '',
        price: '',
        duration: ''
    });

    const [staffForm, setStaffForm] = useState({
        name: '',
        role: 'آرایشگر',
        specialties: '',
        experience: '',
        bio: ''
    });

    const categories = ['کوتاهی مو', 'ریش', 'اصلاح صورت', 'رنگ', 'پکیج‌ها', 'خدمات ویژه'];
    const roles = ['آرایشگر ارشد', 'استایلیست ارشد', 'آرایشگر'];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        try {
            await addService({
                ...serviceForm,
                price: parseInt(serviceForm.price),
                duration: parseInt(serviceForm.duration)
            });
            setServiceForm({ name: '', category: 'کوتاهی مو', description: '', price: '', duration: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleStaffSubmit = async (e) => {
        e.preventDefault();
        try {
            await addStaff({
                ...staffForm,
                specialties: staffForm.specialties.split('،').map(s => s.trim()),
                experience: parseInt(staffForm.experience)
            });
            setStaffForm({ name: '', role: 'آرایشگر', specialties: '', experience: '', bio: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteService = async (id) => {
        if (confirm('آیا از حذف این خدمت مطمئن هستید؟')) {
            await serviceService.delete(id);
            showNotification('خدمت حذف شد');
        }
    };

    const deleteStaff = async (id) => {
        if (confirm('آیا از حذف این آرایشگر مطمئن هستید؟')) {
            await staffService.delete(id);
            showNotification('آرایشگر حذف شد');
        }
    };

    const deleteAppointment = async (id) => {
        if (confirm('آیا از حذف این نوبت مطمئن هستید؟')) {
            await appointmentService.delete(id);
            showNotification('نوبت حذف شد');
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-page__header">
                <div className="container">
                    <h1 className="admin-page__title">پنل مدیریت</h1>
                    <p className="admin-page__subtitle">مدیریت خدمات، آرایشگران و نوبت‌ها</p>
                </div>
            </div>

            <div className="admin-page__content">
                <div className="container">
                    <div className="admin-tabs">
                        <button
                            className={`admin-tab ${activeTab === 'services' ? 'admin-tab--active' : ''}`}
                            onClick={() => setActiveTab('services')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                            </svg>
                            خدمات ({services.length})
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'staff' ? 'admin-tab--active' : ''}`}
                            onClick={() => setActiveTab('staff')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            آرایشگران ({staff.length})
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'appointments' ? 'admin-tab--active' : ''}`}
                            onClick={() => setActiveTab('appointments')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            نوبت‌ها ({appointments.length})
                        </button>
                    </div>

                    {/* Services Tab */}
                    {activeTab === 'services' && (
                        <div className="admin-section">
                            <div className="admin-form-card">
                                <h3>افزودن خدمت جدید</h3>
                                <form onSubmit={handleServiceSubmit} className="admin-form">
                                    <div className="admin-form__grid">
                                        <div className="form-group">
                                            <label className="form-label">نام خدمت</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={serviceForm.name}
                                                onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                                                placeholder="مثلاً: کوتاهی مدل جدید"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">دسته‌بندی</label>
                                            <select
                                                className="form-select"
                                                value={serviceForm.category}
                                                onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">قیمت (تومان)</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                value={serviceForm.price}
                                                onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                                                placeholder="150000"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">مدت (دقیقه)</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                value={serviceForm.duration}
                                                onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                                                placeholder="30"
                                                required
                                            />
                                        </div>
                                        <div className="form-group form-group--full">
                                            <label className="form-label">توضیحات</label>
                                            <textarea
                                                className="form-input"
                                                value={serviceForm.description}
                                                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                                placeholder="توضیحات کوتاه درباره خدمت..."
                                                rows="2"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        افزودن خدمت
                                    </button>
                                </form>
                            </div>

                            <div className="admin-list">
                                <h3>لیست خدمات</h3>
                                <div className="admin-table-wrapper">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>نام</th>
                                                <th>دسته‌بندی</th>
                                                <th>قیمت</th>
                                                <th>مدت</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map(service => (
                                                <tr key={service.id}>
                                                    <td>{service.name}</td>
                                                    <td><span className="badge">{service.category}</span></td>
                                                    <td>{formatPrice(service.price)} تومان</td>
                                                    <td>{service.duration} دقیقه</td>
                                                    <td>
                                                        <button
                                                            className="btn-icon btn-icon--danger"
                                                            onClick={() => deleteService(service.id)}
                                                        >
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polyline points="3 6 5 6 21 6" />
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Staff Tab */}
                    {activeTab === 'staff' && (
                        <div className="admin-section">
                            <div className="admin-form-card">
                                <h3>افزودن آرایشگر جدید</h3>
                                <form onSubmit={handleStaffSubmit} className="admin-form">
                                    <div className="admin-form__grid">
                                        <div className="form-group">
                                            <label className="form-label">نام و نام خانوادگی</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={staffForm.name}
                                                onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                                                placeholder="مثلاً: علی احمدی"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">سمت</label>
                                            <select
                                                className="form-select"
                                                value={staffForm.role}
                                                onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                                            >
                                                {roles.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">تخصص‌ها (با ، جدا کنید)</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={staffForm.specialties}
                                                onChange={(e) => setStaffForm({ ...staffForm, specialties: e.target.value })}
                                                placeholder="فید، کوتاهی کلاسیک، اصلاح ریش"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">سال تجربه</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                value={staffForm.experience}
                                                onChange={(e) => setStaffForm({ ...staffForm, experience: e.target.value })}
                                                placeholder="5"
                                                required
                                            />
                                        </div>
                                        <div className="form-group form-group--full">
                                            <label className="form-label">بیوگرافی</label>
                                            <textarea
                                                className="form-input"
                                                value={staffForm.bio}
                                                onChange={(e) => setStaffForm({ ...staffForm, bio: e.target.value })}
                                                placeholder="توضیحات کوتاه درباره آرایشگر..."
                                                rows="2"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        افزودن آرایشگر
                                    </button>
                                </form>
                            </div>

                            <div className="admin-list">
                                <h3>لیست آرایشگران</h3>
                                <div className="admin-table-wrapper">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>نام</th>
                                                <th>سمت</th>
                                                <th>تجربه</th>
                                                <th>تخصص‌ها</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {staff.map(member => (
                                                <tr key={member.id}>
                                                    <td>{member.name}</td>
                                                    <td><span className="badge badge--secondary">{member.role}</span></td>
                                                    <td>{member.experience} سال</td>
                                                    <td>
                                                        <div className="tags">
                                                            {member.specialties?.slice(0, 2).map((s, i) => (
                                                                <span key={i} className="tag">{s}</span>
                                                            ))}
                                                            {member.specialties?.length > 2 && (
                                                                <span className="tag">+{member.specialties.length - 2}</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn-icon btn-icon--danger"
                                                            onClick={() => deleteStaff(member.id)}
                                                        >
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polyline points="3 6 5 6 21 6" />
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                        <div className="admin-section">
                            <div className="admin-list">
                                <h3>لیست نوبت‌ها</h3>
                                {appointments.length === 0 ? (
                                    <div className="empty-state">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <p>هنوز نوبتی ثبت نشده</p>
                                    </div>
                                ) : (
                                    <div className="admin-table-wrapper">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>مشتری</th>
                                                    <th>تلفن</th>
                                                    <th>تاریخ</th>
                                                    <th>ساعت</th>
                                                    <th>وضعیت</th>
                                                    <th>عملیات</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {appointments.map(apt => (
                                                    <tr key={apt.id}>
                                                        <td>{apt.customerName}</td>
                                                        <td style={{ direction: 'ltr' }}>{apt.customerPhone}</td>
                                                        <td>{apt.date}</td>
                                                        <td>{apt.time}</td>
                                                        <td>
                                                            <span className={`badge badge--${apt.status === 'pending' ? 'warning' : apt.status === 'confirmed' ? 'success' : 'danger'}`}>
                                                                {apt.status === 'pending' ? 'در انتظار' : apt.status === 'confirmed' ? 'تأیید شده' : 'لغو شده'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn-icon btn-icon--danger"
                                                                onClick={() => deleteAppointment(apt.id)}
                                                            >
                                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <polyline points="3 6 5 6 21 6" />
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
