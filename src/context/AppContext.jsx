import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/database';
import appointmentService from '../db/services/appointmentService';
import serviceService from '../db/services/serviceService';
import staffService from '../db/services/staffService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    // Live queries - automatically update when data changes
    const services = useLiveQuery(() => db.services.toArray(), []) || [];
    const staff = useLiveQuery(() => db.staff.toArray(), []) || [];
    const appointments = useLiveQuery(() => db.appointments.toArray(), []) || [];

    useEffect(() => {
        // Database is ready when we have data
        if (services.length > 0 || staff.length > 0) {
            setLoading(false);
        }
        // Set a timeout to stop loading even if no data
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [services, staff]);

    // Show notification
    const showNotification = useCallback((message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    }, []);

    // Appointment operations
    const createAppointment = useCallback(async (data) => {
        try {
            const id = await appointmentService.create(data);
            showNotification('نوبت شما با موفقیت ثبت شد!');
            return id;
        } catch (error) {
            showNotification('خطا در ثبت نوبت', 'error');
            throw error;
        }
    }, [showNotification]);

    const cancelAppointment = useCallback(async (id) => {
        try {
            await appointmentService.updateStatus(id, 'cancelled');
            showNotification('نوبت لغو شد');
        } catch (error) {
            showNotification('خطا در لغو نوبت', 'error');
            throw error;
        }
    }, [showNotification]);

    // Service operations
    const addService = useCallback(async (data) => {
        try {
            const id = await serviceService.create(data);
            showNotification('خدمت جدید اضافه شد!');
            return id;
        } catch (error) {
            showNotification('خطا در افزودن خدمت', 'error');
            throw error;
        }
    }, [showNotification]);

    // Staff operations
    const addStaff = useCallback(async (data) => {
        try {
            const id = await staffService.create(data);
            showNotification('آرایشگر جدید اضافه شد!');
            return id;
        } catch (error) {
            showNotification('خطا در افزودن آرایشگر', 'error');
            throw error;
        }
    }, [showNotification]);

    const value = {
        // Data
        services,
        staff,
        appointments,
        loading,
        notification,

        // Actions
        createAppointment,
        cancelAppointment,
        addService,
        addStaff,
        showNotification,

        // Raw services for advanced operations
        appointmentService,
        serviceService,
        staffService
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}

export default AppContext;
