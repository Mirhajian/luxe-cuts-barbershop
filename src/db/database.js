import Dexie from 'dexie';

// Create the database
export const db = new Dexie('barbershop');

// Define database schema
db.version(1).stores({
    services: '++id, name, category, price, duration',
    staff: '++id, name, role, specialties',
    appointments: '++id, customerName, customerEmail, customerPhone, serviceId, staffId, date, time, status, createdAt',
    customers: '++id, name, email, phone, createdAt'
});

// Seed initial data
export async function seedDatabase() {
    const servicesCount = await db.services.count();

    if (servicesCount === 0) {
        // Seed services
        await db.services.bulkAdd([
            {
                name: 'کوتاهی کلاسیک',
                category: 'کوتاهی مو',
                description: 'کوتاهی سنتی با دقت بالا و استایل حرفه‌ای',
                price: 150000,
                duration: 30,
                image: 'haircut'
            },
            {
                name: 'اصلاح و فرم‌دهی ریش',
                category: 'ریش',
                description: 'اصلاح حرفه‌ای ریش با حوله داغ و فرم‌دهی دقیق',
                price: 100000,
                duration: 20,
                image: 'beard'
            },
            {
                name: 'فید پریمیوم',
                category: 'کوتاهی مو',
                description: 'کوتاهی فید حرفه‌ای با ترکیب‌بندی یکنواخت',
                price: 180000,
                duration: 45,
                image: 'fade'
            },
            {
                name: 'اصلاح با تیغ و حوله داغ',
                category: 'اصلاح صورت',
                description: 'اصلاح لوکس با تیغ سنتی، حوله داغ و روغن‌های معطر',
                price: 120000,
                duration: 30,
                image: 'shave'
            },
            {
                name: 'رنگ مو',
                category: 'رنگ',
                description: 'رنگ‌آمیزی حرفه‌ای مو با بهترین مواد',
                price: 300000,
                duration: 90,
                image: 'color'
            },
            {
                name: 'کوتاهی کودک',
                category: 'کوتاهی مو',
                description: 'کوتاهی ملایم برای کودکان زیر ۱۲ سال',
                price: 100000,
                duration: 25,
                image: 'kids'
            },
            {
                name: 'پکیج کامل مو و ریش',
                category: 'پکیج‌ها',
                description: 'بسته کامل آراستگی شامل کوتاهی مو و اصلاح ریش',
                price: 220000,
                duration: 50,
                image: 'combo'
            },
            {
                name: 'ماساژ و درمان پوست سر',
                category: 'خدمات ویژه',
                description: 'ماساژ و تقویت پوست سر با روغن‌های گیاهی',
                price: 120000,
                duration: 25,
                image: 'scalp'
            }
        ]);

        // Seed staff
        await db.staff.bulkAdd([
            {
                name: 'امیرحسین رضایی',
                role: 'آرایشگر ارشد',
                specialties: ['فید', 'کوتاهی کلاسیک', 'اصلاح ریش'],
                experience: 12,
                bio: 'با بیش از ۱۲ سال تجربه، امیرحسین در فید و کوتاهی‌های کلاسیک تخصص دارد.',
                avatar: 'amirhossein'
            },
            {
                name: 'محمدرضا کریمی',
                role: 'استایلیست ارشد',
                specialties: ['رنگ مو', 'استایل مدرن', 'خدمات ویژه'],
                experience: 8,
                bio: 'محمدرضا خلاقیت و تخصص را در استایل مدرن و رنگ‌آمیزی حرفه‌ای ترکیب می‌کند.',
                avatar: 'mohammadreza'
            },
            {
                name: 'علی احمدی',
                role: 'آرایشگر',
                specialties: ['اصلاح با تیغ', 'مراقبت ریش', 'کوتاهی سنتی'],
                experience: 6,
                bio: 'علی به خاطر اصلاح‌های حرفه‌ای با حوله داغ و مراقبت دقیق ریش شناخته شده است.',
                avatar: 'ali'
            },
            {
                name: 'حسین محمدی',
                role: 'آرایشگر',
                specialties: ['کوتاهی کودک', 'فید مدرن', 'مشاوره'],
                experience: 4,
                bio: 'حسین در آرامش‌بخشی به کودکان و ایجاد استایل‌های مدرن تخصص دارد.',
                avatar: 'hossein'
            }
        ]);
    }
}

// Initialize database on import
seedDatabase().catch(console.error);

export default db;
