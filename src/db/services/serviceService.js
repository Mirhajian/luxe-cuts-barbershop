import db from '../database';

/**
 * Service Service - Handles all salon service-related database operations
 * This service can be reused in other applications that need service catalogs
 */
export const serviceService = {
    /**
     * Get all services
     * @returns {Promise<Array>} - All services
     */
    async getAll() {
        return await db.services.toArray();
    },

    /**
     * Get service by ID
     * @param {number} id - The service ID
     * @returns {Promise<Object>} - The service
     */
    async getById(id) {
        return await db.services.get(id);
    },

    /**
     * Get services by category
     * @param {string} category - The category name
     * @returns {Promise<Array>} - Services in that category
     */
    async getByCategory(category) {
        return await db.services.where('category').equals(category).toArray();
    },

    /**
     * Create a new service
     * @param {Object} serviceData - The service data
     * @returns {Promise<number>} - The ID of the created service
     */
    async create(serviceData) {
        return await db.services.add(serviceData);
    },

    /**
     * Update a service
     * @param {number} id - The service ID
     * @param {Object} updates - The fields to update
     * @returns {Promise<number>} - Number of updated records
     */
    async update(id, updates) {
        return await db.services.update(id, updates);
    },

    /**
     * Delete a service
     * @param {number} id - The service ID
     * @returns {Promise<void>}
     */
    async delete(id) {
        return await db.services.delete(id);
    },

    /**
     * Get all unique categories
     * @returns {Promise<Array>} - Unique category names
     */
    async getCategories() {
        const services = await db.services.toArray();
        return [...new Set(services.map(s => s.category))];
    },

    /**
     * Search services by name
     * @param {string} query - Search query
     * @returns {Promise<Array>} - Matching services
     */
    async search(query) {
        const lowerQuery = query.toLowerCase();
        const services = await db.services.toArray();
        return services.filter(s =>
            s.name.toLowerCase().includes(lowerQuery) ||
            s.description.toLowerCase().includes(lowerQuery)
        );
    }
};

export default serviceService;
