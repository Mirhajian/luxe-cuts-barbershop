import db from '../database';

/**
 * Appointment Service - Handles all appointment-related database operations
 * This service can be reused in other applications that need appointment scheduling
 */
export const appointmentService = {
    /**
     * Create a new appointment
     * @param {Object} appointmentData - The appointment data
     * @returns {Promise<number>} - The ID of the created appointment
     */
    async create(appointmentData) {
        const appointment = {
            ...appointmentData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        return await db.appointments.add(appointment);
    },

    /**
     * Get all appointments
     * @returns {Promise<Array>} - All appointments
     */
    async getAll() {
        return await db.appointments.toArray();
    },

    /**
     * Get appointment by ID
     * @param {number} id - The appointment ID
     * @returns {Promise<Object>} - The appointment
     */
    async getById(id) {
        return await db.appointments.get(id);
    },

    /**
     * Get appointments by date
     * @param {string} date - The date in YYYY-MM-DD format
     * @returns {Promise<Array>} - Appointments for that date
     */
    async getByDate(date) {
        return await db.appointments.where('date').equals(date).toArray();
    },

    /**
     * Get appointments by staff member
     * @param {number} staffId - The staff member ID
     * @returns {Promise<Array>} - Appointments for that staff member
     */
    async getByStaff(staffId) {
        return await db.appointments.where('staffId').equals(staffId).toArray();
    },

    /**
     * Get appointments by customer email
     * @param {string} email - Customer email
     * @returns {Promise<Array>} - Customer's appointments
     */
    async getByCustomerEmail(email) {
        return await db.appointments.where('customerEmail').equals(email).toArray();
    },

    /**
     * Update an appointment
     * @param {number} id - The appointment ID
     * @param {Object} updates - The fields to update
     * @returns {Promise<number>} - Number of updated records
     */
    async update(id, updates) {
        return await db.appointments.update(id, updates);
    },

    /**
     * Update appointment status
     * @param {number} id - The appointment ID
     * @param {string} status - New status (pending, confirmed, completed, cancelled)
     * @returns {Promise<number>} - Number of updated records
     */
    async updateStatus(id, status) {
        return await db.appointments.update(id, { status });
    },

    /**
     * Delete an appointment
     * @param {number} id - The appointment ID
     * @returns {Promise<void>}
     */
    async delete(id) {
        return await db.appointments.delete(id);
    },

    /**
     * Get upcoming appointments
     * @returns {Promise<Array>} - Upcoming appointments sorted by date
     */
    async getUpcoming() {
        const today = new Date().toISOString().split('T')[0];
        return await db.appointments
            .where('date')
            .aboveOrEqual(today)
            .sortBy('date');
    },

    /**
     * Check if a time slot is available
     * @param {number} staffId - Staff member ID
     * @param {string} date - Date in YYYY-MM-DD format
     * @param {string} time - Time in HH:MM format
     * @returns {Promise<boolean>} - True if available
     */
    async isTimeSlotAvailable(staffId, date, time) {
        const existing = await db.appointments
            .where(['staffId', 'date', 'time'])
            .equals([staffId, date, time])
            .first();
        return !existing || existing.status === 'cancelled';
    }
};

export default appointmentService;
