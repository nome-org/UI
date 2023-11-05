// {
//     name: string;
//     type: string;
//     dataURL: string;
//     size: number;
// }
import { api } from "./api-instance";

/**
 * @typedef {Object} FileData
 * @property {number} size
 * @property {string} type
 * @property {string} name
 * @property {string} dataURL
 * @property {number} duration
 */

/**
 * @typedef {Object} InscribeParams
 * @property {FileData[]} files
 * @property {"2009"|"2010"|"2011"|"block78"|"pizza"|"uncommon"|"black"|"vintage"|"random"} rarity
 * @property {string} receiverAddress address to receive ordinals
 * @property {string} payAddress
 * @property {number} feeRate
 */

/**
 * @typedef {Object} Charge
 * @property {number} amount
 * @property {string} address
 */

/**
 * @typedef {Object} OrderData
 * @property {number} id
 * @property {Charge} payment_details
 */

/**
 * @param {InscribeParams} params
 * @returns {Promise<{message: string, data: OrderData, success: boolean}>}
 */

export const inscribeApi = async ({
  files,
  rarity,
  receiverAddress,
  feeRate,
  payAddress,
}) => {
  const response = await api.post("/orders", {
    files,
    rarity,
    receiverAddress,
    feeRate,
    payAddress,
  });
  return response.data;
};
