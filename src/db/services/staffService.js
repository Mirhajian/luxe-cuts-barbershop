import db from '../database';

/**
 * Staff Service - Handles all staff-related database operations
 * This service can be reused in other applications that need staff management
 */
export const staffService = {
    /**
     * Get all staff members
     * @returns {Promise<Array>} - All staff members
     */
    async getAll() {
        return await db.staff.toArray();
    },

    /**
     * Get staff member by ID
     * @param {number} id - The staff ID
     * @returns {Promise<Object>} - The staff member
     */
    async getById(id) {
        return await db.staff.get(id);
    },

    /**
     * Get staff by role
     * @param {string} role - The role (e.g., 'Master Barber', 'Stylist')
     * @returns {Promise<Array>} - Staff with that role
     */
    async getByRole(role) {
        return await db.staff.where('role').equals(role).toArray();
    },

    /**
     * Create a new staff member
     * @param {Object} staffData - The staff data
     * @returns {Promise<number>} - The ID of the created staff member
     */
    async create(staffData) {
        return await db.staff.add(staffData);
    },

    /**
     * Update a staff member
     * @param {number} id - The staff ID
     * @param {Object} updates - The fields to update
     * @returns {Promise<number>} - Number of updated records
     */
    async update(id, updates) {
        return await db.staff.update(id, updates);
    },

    /**
     * Delete a staff member
     * @param {number} id - The staff ID
     * @returns {Promise<void>}
     */
    async delete(id) {
        return await db.staff.delete(id);
    },

    /**
     * Search staff by specialty
     * @param {string} specialty - The specialty to search for
     * @returns {Promise<Array>} - Staff with that specialty
     */
    async getBySpecialty(specialty) {
        const staff = await db.staff.toArray();
        return staff.filter(s =>
            s.specialties && s.specialties.some(sp =>
                sp.toLowerCase().includes(specialty.toLowerCase())
            )
        );
    },

    /**
     * Get all unique roles
     * @returns {Promise<Array>} - Unique role names
     */
    async getRoles() {
        const staff = await db.staff.toArray();
        return [...new Set(staff.map(s => s.role))];
    }
};

export default staffService;
