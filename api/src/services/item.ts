import { query } from 'express';
import queryDb from '../db/db';
import { hasAllKeys, respond } from '../util/data';
import { ErrorCodes, respondWithError } from '../util/error';

type Item = {
  itemName: string;
  metalType: string;
  quantity?: number;
  fromUser?: string;
};

type PurchaseItem = {
  id: number;
  price: number;
  quantity: number;
  supplier: string;
};

export type InvoiceItem = PurchaseItem;

// NOT TESTED MANUALLY
export default class ItemService {
  // NOT TESTED MANUALLY
  static async NewItem({ itemName, metalType }: Item, username: string) {
    try {
      const queryResult = await queryDb(
        `
            INSERT INTO item (item_name, metal_type, from_user)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
        [itemName, metalType, username]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }

  static async GetItemById(id: number, username: string) {
    try {
      const queryResult = await queryDb(
        `
        SELECT * FROM item
        WHERE id = $1 AND from_user = $2 
        `,
        [id, username]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }

  // NOT TESTED MANUALLY
  // Get list of items by username using WAC method and calculated in and out items
  static async GetItemsByUsername(username: string, page?: number) {
    try {
      const queryResult = await queryDb(
        `
        WITH purchase_totals AS (
            SELECT 
                ip.item_id,
                SUM(ip.price * ip.quantity) AS total_price,
                SUM(ip.quantity) AS total_purchase_quantity
            FROM 
                item_purchase ip
            GROUP BY 
                ip.item_id
        ),
        invoice_totals AS (
            SELECT 
                ii.item_id,
                SUM(ii.quantity) AS total_invoice_quantity
            FROM 
                invoice_item ii
            GROUP BY 
                ii.item_id
        )
        SELECT 
            i.id AS item_id,
            i.item_name,
            COALESCE(pt.total_price / NULLIF(pt.total_purchase_quantity, 0), 0) AS wac_price,
            COALESCE(pt.total_purchase_quantity, 0) - COALESCE(it.total_invoice_quantity, 0) AS net_quantity,
            i.created_at
        FROM 
            users u
        LEFT JOIN 
            item i ON i.from_user = u.username
        LEFT JOIN 
            purchase_totals pt ON pt.item_id = i.id
        LEFT JOIN 
            invoice_totals it ON it.item_id = i.id
        WHERE 
            u.username = $1;

        `,
        [username]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }

  // Delete an item
  static async DeleteItemById(itemId: number, username: string) {
    try {
      const queryResult = await queryDb(
        `
        DELETE FROM item
        WHERE id = $1 AND from_user = $2
        `,
        [itemId, username]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }

  // Get Item Purchases of a specific user
  static async GetItemPurchases(username: string) {
    try {
      const queryResult = await queryDb(
        `
        SELECT pi.id, pi.price, pi.created_at, pi.supplier, pi.quantity
        FROM item_purchase pi
        LEFT JOIN item i on i.id = pi.item_id
        WHERE i.from_user = $1
        ORDER BY pi.created_at DESC
        `,
        [username]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }

  // Get item purchase by id and user
  static async GetItemPurchaseById(id: number, username: string) {
    try {
      const queryResult = await queryDb(
        `
        SELECT pi.id, i.id AS item_id, i.item_name, pi.price, pi.created_at, pi.supplier, pi.quantity
        FROM item_purchase pi
        JOIN item i on i.id = pi.item_id
        WHERE i.from_user = $1 AND pi.id = $2
        `,
        [username, id]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }
  // NOT TESTED MANUALLY
  // Create Item Purchase
  static async CreateItemPurchase(
    username: string,
    purchaseItem: PurchaseItem
  ) {
    const { id, supplier, price, quantity } = purchaseItem;
    const requiredFields = ['id', 'price', 'supplier', 'quantity'];

    if (!hasAllKeys(requiredFields, purchaseItem)) {
      throw respondWithError({
        status: ErrorCodes.BAD_REQUEST_ERROR,
        message: 'Missing fields in response body object',
      });
    }

    try {
      // TODO: test if this even works
      // const ownershipResult = await queryDb(
      //   `
      //   SELECT id
      //   FROM item
      //   WHERE id=$1 AND from_user=$2
      //   `,
      //   [id, username]
      // );

      // if (!ownershipResult.length) {
      //   throw respondWithError({
      //     status: ErrorCodes.UNAUTHORIZED_ERROR,
      //     message: 'User is not authoried',
      //   });
      // }

      const queryResult = await queryDb(
        `
        INSERT INTO item_purchase (item_id, supplier, price, quantity)
        VALUES ($1, $2, $3, $4)
        `,
        [id, supplier, price, quantity]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create an invoice item
   */
  static async NewInvoiceItem({
    id,
    price,
    quantity,
    invoiceId,
  }: InvoiceItem & { invoiceId: number }) {
    try {
      const queryResult = await queryDb(
        `
        INSERT INTO invoice_item (invoice_id, item_id, quantity, price)
        VALUES ($1, $2, $3, $4) 
        RETURNING *
        `,
        [invoiceId, id, quantity, price]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }
}
