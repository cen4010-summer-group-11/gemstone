import queryDb from '../db/db';
import { respond } from '../util/data';
import { ErrorCodes, respondWithError } from '../util/error';
import ItemService, { InvoiceItem } from './item';

type Invoice = {
  name: string;
  fromUser: string;
  items: [InvoiceItem];
};

// MANUALLY TEST
export default class InvoiceService {
  static async NewInvoice({ name, fromUser, items }: Invoice) {
    try {
      const invoiceResult = await queryDb(
        `
        INSERT INTO invoice (invoice_name, from_user) 
        VALUES ($1, $2) 
        RETURNING id`,
        [name, fromUser]
      );

      if (!items.length) {
        throw respondWithError({
          status: ErrorCodes.BAD_REQUEST_ERROR,
          message: 'No items received from invoice',
        });
      }

      items.forEach((item: InvoiceItem) => {
        ItemService.NewInvoiceItem({ invoiceId: invoiceResult[0].id, ...item });
      });

      return respond({ data: {} });
    } catch (error) {
      throw error;
    }
  }
}
