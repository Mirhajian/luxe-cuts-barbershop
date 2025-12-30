import { useApp } from '../../context/AppContext';
import './Staff.css';

function Staff() {
    const { staff } = useApp();

    const getAvatarGradient = (index) => {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        ];
        return gradients[index % gradients.length];
    };

    const toPersianNumber = (num) => {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, (d) => persianDigits[d]);
    };

    return (
        <section id="team" className="staff section">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">با متخصصین ما آشنا شوید</span>
                    <h2 className="section-title">تیم پشت استایل شما</h2>
                    <p className="section-description">
                        آرایشگران ماهر ما سال‌ها تجربه و علاقه را در هر کوتاهی به کار می‌گیرند.
                    </p>
                </div>

                <div className="staff__grid">
                    {staff.map((member, index) => (
                        <div
                            key={member.id}
                            className="staff-card"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="staff-card__image">
                                <div
                                    className="staff-card__avatar"
                                    style={{ background: getAvatarGradient(index) }}
                                >
                                    <span className="staff-card__initials">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="staff-card__overlay">
                                    <div className="staff-card__experience">
                                        <span className="staff-card__experience-number">{toPersianNumber(member.experience)}</span>
                                        <span className="staff-card__experience-label">سال تجربه</span>
                                    </div>
                                </div>
                            </div>

                            <div className="staff-card__info">
                                <h3 className="staff-card__name">{member.name}</h3>
                                <span className="staff-card__role">{member.role}</span>
                                <p className="staff-card__bio">{member.bio}</p>

                                <div className="staff-card__specialties">
                                    {member.specialties?.map((specialty, idx) => (
                                        <span key={idx} className="staff-card__specialty">
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Staff;
