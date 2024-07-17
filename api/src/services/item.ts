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
        WHERE id = $1, username = $2 
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
        SELECT 
            i.id AS item_id,
            i.item_name,
            COALESCE(SUM(ip.price * ip.quantity) / NULLIF(SUM(ip.quantity), 0), 0) AS wac_price,
            COALESCE(SUM(ip.quantity), 0) - COALESCE(SUM(ii.quantity), 0) AS net_quantity
        FROM 
            users u
        LEFT JOIN 
            item i ON i.from_user = u.id
        LEFT JOIN 
            item_purchase ip ON ip.id = i.id
        LEFT JOIN 
            invoice_item ii ON ii.item_id = i.id
        WHERE 
            u.username = $1
        GROUP BY 
            i.id, i.item_name, u.username;
        ORDER BY
            i.created_at DESC
        `,
        [username]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }

  // NOT TESTED MANUALLY
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

  // NOT TESTED MANUALLY
  // Get Item Purchases of a specific user
  static async GetItemPurchases(username: string) {
    try {
      const queryResult = queryDb(
        `
        SELECT pi.id, pi.price, pi.purchase_date, pi.supplier, pi.quantity
        FROM purchase_item pi
        JOIN item i on i.id = pi.id
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

  // NOT MANUALLY TESTED
  // Get item purchase by id and user
  static async GetItemPurchaseById(id: number, username: string) {
    try {
      const queryResult = queryDb(
        `
        SELECT pi.id, pi.price, pi.purchase_date, pi.supplier, pi.quantity
        FROM purchase_item pi
        JOIN item i on i.id = pi.id
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
    const { id, price, quantity } = purchaseItem;
    const requiredFields = ['id', 'price', 'quantity'];

    if (!hasAllKeys(requiredFields, purchaseItem)) {
      return respondWithError({
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
        INSERT INTO item_purchase (id, price, quantity)
        VALUES ($1, $2, $3)
        `,
        [id, price, quantity]
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
