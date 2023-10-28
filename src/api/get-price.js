import { api } from "./api-instance"

/**
 * @param {Object} params
 * @param {number} params.size
 * @param {number} params.fee
 * @param {number} params.count
 * @param {number} params.rareSats
 * @returns {Promise<{message: string, data: {fee: number}, success: boolean}>}
 */
export const getPriceApi = async (
    {size, fee, count, rareSats}
) => {
    const response = await api.get('/price', {
        params: {
            size,
            fee,
            count,
            rareSats
        }
    })
    return response.data
}