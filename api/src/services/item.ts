import queryDb from '../db/db';
import { respond } from '../util/data';

type Item = {
  itemName: string;
  metalType: string;
  quantity?: number;
  fromUser: string;
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
  static async NewItem({ itemName, metalType, fromUser }: Item) {
    try {
      const queryResult = await queryDb(
        `
            INSERT INTO item (item_name, metal_type, from_user)
            VALUES ($1, $2, $3)
            RETURNING item_name, metal_type
        `,
        [itemName, metalType, fromUser]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }

  // NOT TESTED MANUALLY
  static async GetItemsByUsername(username: string) {
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
  static async DeleteItemById(itemId: number) {
    try {
      const queryResult = await queryDb(
        `
        DELETE FROM item
        WHERE id = $1
        `,
        [itemId]
      );

      return respond({ data: queryResult });
    } catch (error) {
      throw error;
    }
  }
  // NOT TESTED MANUALLY
  // Create Item Purchase
  static async NewPurchase({ id, price, quantity }: PurchaseItem) {
    try {
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

  // Create Invoice Item
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
        `,
        [invoiceId, id, quantity, price]
      );

      return { ok: true };
    } catch (error) {
      throw error;
    }
  }
}
