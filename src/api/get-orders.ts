/**
 * @typedef {Object} HTMLTransaction
 * @property {number} id
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} tx_id
 * @property {"PENDING" | "CONFIRMED"} status
 */

/**
 * @typedef {Object} OrderWithStatus
 * @property {number} id
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string | null} ordinals_bot_order_id
 * @property {string} receiver_address
 * @property {number | null} html_transaction_id
 * @property {number | null} html_inscription_index
 * @property {"UNPAID" | "READY"} status use ready to check if inscribed or pending for now
 */

import { api } from "./api-instance.ts";

/**
 *
 * @param {string} address
 * @returns {Promise<{message: string, data: OrderWithStatus[], success: boolean}>}
 */
export const getOrdersApi = async (address) => {
  const response = await api.get("/orders", {
    params: {
      address,
    },
  });
  return response.data;
};
