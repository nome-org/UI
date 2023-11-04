import { defineStore } from "pinia";

import axios from "@/axios";



/**
 * @typedef {Object} HTMLTransaction
 * @property {number} id
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} tx_id
 * @property {"PENDING" | "CONFIRMED"} status
 */

/**
 * @typedef {Object} Order
 * @property {number} id
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string | null} ordinals_bot_order_id
 * @property {string} receiver_address
 * @property {number | null} html_transaction_id
 * @property {HTMLTransaction | null} html_transaction
 * @property {number | null} html_inscription_index
 * @property {"PENDING" | "CONFIRMED"} status
 */
/**
 * @typedef {Object} priceResponse
 * @property {number} totalFee
 * @property {number} totalImagesPrice
 * @property {number} htmlPrice
 * @property {number} htmlSize
 */
/**
 * @typedef {Object} State
 * @property {Array<Order>} orders
 * @property {string|null} price
 */

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






const useOrders = defineStore('orders', {
    /**
     * @type {State}
     */
    state: () => {
        return {
            orders: [],
            price: null
        }
    },
    getters: {
        /**
         * @returns {Array<Order>}
         */
        getOrders: (state) => state.orders,
        /**
         * @returns {string|null}
         */
        getPrice: (state) => state.price
    },
    actions: {
        /**
         * @param {string} address 
         * @returns {Promise<{message: string, data: Order[], success: boolean}>}
         */
        fetchOrders: async(address) => {
            const res = await axios.get("/orders", {
                params: {
                    address
                }
            });
            if(res.data?.success) this.orders = [...res.data?.data];
            return res.data
        },
        /**
         * @param {Object} params
         * @param {number[]} params.imageSizes
         * @param {number} params.fee
         * @param {number} params.count
         * @param {string} params.rareSats
         * @returns {Promise<{message: string, data: priceResponse, success: boolean}>}
         */
        fetchPrice: async({imageSizes, fee, count=1, rareSats='random'}) => {
            const res = await axios.get("/price", {
                params: {
                    imageSizes,
                    fee,
                    count,
                    rareSats
                }
            });
            if(res.data?.success) this.price = res.data?.data?.totalFee;
            return res.data;
        },
        /**
         * @param {InscribeParams} params
         * @returns {Promise<{message: string, data: OrderData, success: boolean}>}
         */
        createOrder: async(params) => {
            const res = await axios.post("/inscribe", JSON.stringify(params));
            return res.data;
        }
    }
})





export default useOrders;