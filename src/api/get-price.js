import { api } from "./api-instance"
/**
 * @typedef {Object} priceResponse
 * @property {number} totalFee
 * @property {number} totalImagesPrice
 * @property {number} htmlPrice
 * @property {number} htmlSize
 */
/**
 * @param {Object} params
 * @param {number[]} params.imageSizes
 * @param {number} params.fee
 * @param {number} params.count
 * @param {number} params.rareSats
 * @returns {Promise<{message: string, data: priceResponse, success: boolean}>}
 */
export const getPriceApi = async (
    {imageSizes, fee, count = 1, rareSats = "random"}
) => {
    const response = await api.get('/price', {
        params: {
            imageSizes,
            fee,
            count,
            rareSats
        }
    })
    return response.data
}