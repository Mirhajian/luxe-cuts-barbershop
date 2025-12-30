# نمودارهای UML - فرمت Mermaid

این فایل شامل نمودارهای UML به فرمت Mermaid است که می‌توانید در Visual Paradigm یا ابزارهای دیگر استفاده کنید.

---

## ۱. نمودار Use Case

```mermaid
graph TB
    subgraph "سیستم مدیریت آرایشگاه لوکس کاتز"
        UC1["رزرو نوبت<br/>Book Appointment"]
        UC2["مشاهده خدمات<br/>View Services"]
        UC3["مشاهده آرایشگران<br/>View Staff"]
        UC4["لغو نوبت<br/>Cancel Appointment"]
        UC5["افزودن خدمت جدید<br/>Add Service"]
        UC6["افزودن آرایشگر<br/>Add Staff"]
        UC7["مشاهده نوبت‌ها<br/>View Appointments"]
    end
    
    Customer((مشتری<br/>Customer))
    Admin((مدیر<br/>Admin))
    Barber((آرایشگر<br/>Barber))
    
    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4
    
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    
    Barber --> UC7
    
    UC1 -.->|include| UC2
    UC1 -.->|include| UC3
```

---

## ۲. نمودار Class

```mermaid
classDiagram
    class Database {
        -services: Table~Service~
        -staff: Table~Staff~
        -appointments: Table~Appointment~
        -customers: Table~Customer~
        +seedDatabase()
    }
    
    class Service {
        +id: number
        +name: string
        +category: string
        +description: string
        +price: number
        +duration: number
        +image: string
    }
    
    class Staff {
        +id: number
        +name: string
        +role: string
        +specialties: string[]
        +experience: number
        +bio: string
        +avatar: string
    }
    
    class Appointment {
        +id: number
        +customerName: string
        +customerEmail: string
        +customerPhone: string
        +serviceId: number
        +staffId: number
        +date: string
        +time: string
        +status: string
        +createdAt: string
    }
    
    class Customer {
        +id: number
        +name: string
        +email: string
        +phone: string
        +createdAt: string
    }
    
    class AppointmentService {
        +create(data): Promise~number~
        +getAll(): Promise~Appointment[]~
        +getById(id): Promise~Appointment~
        +getByDate(date): Promise~Appointment[]~
        +getByStaff(staffId): Promise~Appointment[]~
        +update(id, data): Promise~number~
        +updateStatus(id, status): Promise~number~
        +delete(id): Promise~void~
        +isTimeSlotAvailable(staffId, date, time): Promise~boolean~
    }
    
    class ServiceService {
        +getAll(): Promise~Service[]~
        +getById(id): Promise~Service~
        +getByCategory(category): Promise~Service[]~
        +create(data): Promise~number~
        +update(id, data): Promise~number~
        +delete(id): Promise~void~
        +search(query): Promise~Service[]~
    }
    
    class StaffService {
        +getAll(): Promise~Staff[]~
        +getById(id): Promise~Staff~
        +getByRole(role): Promise~Staff[]~
        +create(data): Promise~number~
        +update(id, data): Promise~number~
        +delete(id): Promise~void~
        +getBySpecialty(specialty): Promise~Staff[]~
    }
    
    class AppContext {
        -services: Service[]
        -staff: Staff[]
        -appointments: Appointment[]
        -loading: boolean
        -notification: object
        +createAppointment(data): Promise~number~
        +cancelAppointment(id): Promise~void~
        +addService(data): Promise~number~
        +addStaff(data): Promise~number~
        +showNotification(message, type): void
    }
    
    class BookingComponent {
        -formData: object
        -submitting: boolean
        -success: boolean
        +handleChange(e): void
        +handleSubmit(e): Promise~void~
    }
    
    class ServicesComponent {
        +getServiceIcon(category): JSX
        +formatPrice(price): string
    }
    
    class HeaderComponent {
        -scrolled: boolean
        -menuOpen: boolean
        +handleNavClick(e, id): void
    }

    Database "1" *-- "*" Service : contains
    Database "1" *-- "*" Staff : contains
    Database "1" *-- "*" Appointment : contains
    Database "1" *-- "*" Customer : contains
    
    AppointmentService --> Database : uses
    ServiceService --> Database : uses
    StaffService --> Database : uses
    
    AppContext --> AppointmentService : uses
    AppContext --> ServiceService : uses
    AppContext --> StaffService : uses
    
    BookingComponent --> AppContext : uses
    ServicesComponent --> AppContext : uses
    
    Appointment "*" --> "1" Service : references
    Appointment "*" --> "1" Staff : references
    Appointment "*" --> "1" Customer : belongs to
```

---

## ۳. نمودار Sequence - رزرو نوبت

```mermaid
sequenceDiagram
    actor Customer as مشتری
    participant Booking as BookingComponent
    participant Context as AppContext
    participant Service as AppointmentService
    participant DB as Database/IndexedDB

    Customer->>Booking: باز کردن صفحه رزرو
    Booking->>Context: useApp()
    Context-->>Booking: {services, staff}
    Booking-->>Customer: نمایش فرم رزرو
    
    Customer->>Booking: پر کردن فیلدها
    Booking->>Booking: handleChange() - setState
    
    Customer->>Booking: انتخاب خدمت
    Customer->>Booking: انتخاب آرایشگر
    Customer->>Booking: انتخاب تاریخ و ساعت
    
    Customer->>Booking: کلیک «تأیید و رزرو»
    Booking->>Booking: handleSubmit()
    Booking->>Booking: setSubmitting(true)
    
    Booking->>Context: createAppointment(formData)
    Context->>Service: create(data)
    Service->>DB: appointments.add(appointment)
    DB-->>Service: id
    Service-->>Context: id
    
    Context->>Context: showNotification("نوبت ثبت شد")
    Context-->>Booking: success
    
    Booking->>Booking: setSuccess(true)
    Booking-->>Customer: نمایش پیام موفقیت
```

---

## ۴. نمودار Sequence - مشاهده خدمات

```mermaid
sequenceDiagram
    actor Customer as مشتری
    participant Services as ServicesComponent
    participant Context as AppContext
    participant Hook as useLiveQuery
    participant DB as Database/IndexedDB

    Customer->>Services: کلیک روی منوی خدمات
    Services->>Context: useApp()
    
    Context->>Hook: useLiveQuery()
    Hook->>DB: services.toArray()
    DB-->>Hook: services[]
    Hook-->>Context: services[]
    
    Context-->>Services: {services}
    
    Services->>Services: render()
    Services->>Services: services.map()
    Services->>Services: getServiceIcon()
    Services->>Services: formatPrice()
    
    Services-->>Customer: نمایش کارت‌های خدمات
```

---

## ۵. نمودار Activity - رزرو نوبت

```mermaid
flowchart TD
    A((شروع)) --> B[باز کردن صفحه رزرو]
    B --> C[بارگذاری خدمات و آرایشگران]
    C --> D[وارد کردن نام و ایمیل]
    D --> E{اطلاعات معتبر؟}
    E -->|خیر| F[نمایش خطا]
    F --> D
    E -->|بله| G[انتخاب خدمت]
    G --> H[انتخاب آرایشگر]
    H --> I[انتخاب تاریخ]
    I --> J[انتخاب ساعت]
    J --> K[کلیک تأیید و رزرو]
    K --> L{همه فیلدها پر؟}
    L -->|خیر| M[غیرفعال بودن دکمه]
    M --> J
    L -->|بله| N[ذخیره در IndexedDB]
    N --> O{ذخیره موفق؟}
    O -->|خیر| P[نمایش پیام خطا]
    O -->|بله| Q[نمایش پیام موفقیت]
    P --> R((پایان))
    Q --> R
```

---

## ۶. نمودار Activity - بارگذاری داده‌های اولیه

```mermaid
flowchart TD
    A((شروع)) --> B[اتصال به IndexedDB]
    B --> C{اتصال برقرار؟}
    C -->|خیر| D[نمایش خطا]
    D --> E((پایان))
    C -->|بله| F[شمارش خدمات موجود]
    F --> G{خدماتی موجود؟}
    G -->|خیر| H[ایجاد خدمات پیش‌فرض]
    H --> I[ایجاد آرایشگران پیش‌فرض]
    I --> J[بارگذاری کامپوننت‌ها]
    G -->|بله| J
    J --> K[تنظیم loading = false]
    K --> L[نمایش UI]
    L --> E
```

---

## ۷. نمودار State - وضعیت نوبت

```mermaid
stateDiagram-v2
    [*] --> pending: create()
    
    pending --> confirmed: confirm()
    pending --> cancelled: cancel()
    pending --> expired: timeout
    
    confirmed --> completed: complete()
    confirmed --> cancelled: cancel()
    
    cancelled --> [*]
    completed --> [*]
    expired --> [*]
    
    pending: در انتظار
    confirmed: تأیید شده
    cancelled: لغو شده
    completed: انجام شده
    expired: منقضی شده
```

---

## ۸. نمودار State - وضعیت فرم رزرو

```mermaid
stateDiagram-v2
    [*] --> empty: pageLoad()
    
    empty --> filling: input()
    
    filling --> valid: validate() success
    filling --> empty: reset()
    
    valid --> submitting: submit()
    
    submitting --> success: API success
    submitting --> error: API error
    
    success --> empty: reset()
    error --> submitting: retry()
    error --> empty: reset()
    
    empty: خالی
    filling: در حال پر کردن
    valid: معتبر
    submitting: در حال ارسال
    success: موفق
    error: خطا
```

---

## نحوه استفاده در Visual Paradigm

برای استفاده از این نمودارها در Visual Paradigm:

1. **Use Case Diagram**: از منوی Diagram > New > Use Case Diagram استفاده کنید
2. **Class Diagram**: از منوی Diagram > New > Class Diagram استفاده کنید  
3. **Sequence Diagram**: از منوی Diagram > New > Sequence Diagram استفاده کنید
4. **Activity Diagram**: از منوی Diagram > New > Activity Diagram استفاده کنید
5. **State Machine Diagram**: از منوی Diagram > New > State Machine Diagram استفاده کنید

### تبدیل Mermaid به تصویر:
- از وب‌سایت [mermaid.live](https://mermaid.live) استفاده کنید
- کد را paste کرده و تصویر PNG/SVG را دانلود کنید
