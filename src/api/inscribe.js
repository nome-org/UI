// {
//     name: string;
//     type: string;
//     dataURL: string;
//     size: number;
// }
import { api } from "./api-instance"

/**
 * @typedef {Object} FileData
 * @property {string} name
 * @property {string} type
 * @property {string} dataURL
 * @property {number} size
 */

/**
 * @typedef {Object} InscribeParams
 * @property {FileData[]} files
 * @property {"2009"|"2010"|"2011"|"block78"|"pizza"|"uncommon"|"black"|"vintage"|"random"} rarity
 * @property {string} receiverAddress
 */

/**
 * @typedef {Object} ChainInvoice
 * @property {string} address
 */

/**
 * @typedef {Object} LightningInvoice
 * @property {number} expires_at
 * @property {string} payreq
 */

/**
 * @typedef {Object} Charge
 * @property {string} id
 * @property {string} description
 * @property {boolean} desc_hash
 * @property {number} created_at
 * @property {string} status
 * @property {number} amount
 * @property {string | undefined} callback_url
 * @property {string | undefined} success_url
 * @property {string} hosted_checkout_url
 * @property {string | undefined} order_id
 * @property {string} currency
 * @property {number} source_fiat_value
 * @property {number} fiat_value
 * @property {boolean} auto_settle
 * @property {string | undefined} notif_email
 * @property {string} address
 * @property {ChainInvoice} chain_invoice
 * @property {string} uri
 * @property {number} ttl
 * @property {LightningInvoice} lightning_invoice
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

export const inscribeApi = async  ({files, rarity, receiverAddress,}) => {
    const response = await api.post('/inscribe', {
        files,
        rarity,
        receiverAddress,
    })
    return response.data
}   