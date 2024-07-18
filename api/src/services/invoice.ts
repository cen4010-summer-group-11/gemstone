import queryDb from '../db/db';
import { respond } from '../util/data';
import { ErrorCodes, respondWithError } from '../util/error';
import ItemService, { InvoiceItem } from './item';

type Invoice = {
  name: string;
  fromUser?: string;
  items: [InvoiceItem];
};

// MANUALLY TEST
export default class InvoiceService {
  /**
   * Creates a new invoice and inserts every item
   */
  static async CreateInvoice({ name, items }: Invoice, username: string) {
    try {
      const invoiceResult = await queryDb(
        `
        INSERT INTO invoice (invoice_name, from_user) 
        VALUES ($1, $2) 
        RETURNING id`,
        [name, username]
      );

      if (!items.length) {
        throw respondWithError({
          status: ErrorCodes.BAD_REQUEST_ERROR,
          message: 'No items received from invoice',
        });
      }

      items.forEach(async (item: InvoiceItem) => {
        // TODO: unsafe, wrap this around transaction
        await ItemService.NewInvoiceItem({
          invoiceId: invoiceResult[0].id,
          ...item,
        });
      });

      return respond({ data: {} });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns invoice list created by username
   */
  static async GetInvoiceListByUsername(username: string, page?: number) {
    try {
      const invoices = await queryDb(
        `
          SELECT * 
          FROM invoice
          WHERE from_user = $1
          ORDER BY created_at DESC
          LIMIT 25
          OFFSET $2
        `,
        [username, page ?? 0]
      );

      return invoices;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Get list of invoice items of a certain invoice (invoiceId)
   * @returns list of invoice items of invoiceId
   */
  static async GetInvoiceDetails(username: string, invoiceId: number) {
    try {
      const invoice = await queryDb(
        `
          SELECT * 
          FROM invoice
          WHERE from_user = $1 AND id = $2
          ORDER BY created_at DESC
        `,
        [username, invoiceId]
      );

      const invoiceDetails = await queryDb(
        `
            SELECT i.item_name as item_name,
                   i.metal_type as metal_type,
                   ii.price as price,
                   ii.quantity as quantity
            FROM invoice_item ii
            JOIN item i ON i.id = ii.item_id
            WHERE i.from_user = $1 AND ii.invoice_id = $2`,
        [username, invoiceId]
      );
      const fullInvoice = {...invoice, items: invoiceDetails}
      return respond({ data: fullInvoice });
    } catch (error) {
      throw error;
    }
  }
}
