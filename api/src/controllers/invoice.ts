import { NextFunction, Request, Response } from 'express';
import InvoiceService from '../services/invoice';
import { ErrorCodes, respondWithError } from '../util/error';

export default class InvoiceController {
  /**
   * Creates invoice by having the following:
   * {
   *  name,
   * }
   */
  static async CreateInvoice(req: Request, res: Response, next: NextFunction) {
    const { username } = res.locals;
    const { invoice } = req.body;

    try {
      const result = await InvoiceService.CreateInvoice(invoice, username);

      res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async GetInvoices(req: Request, res: Response, next: NextFunction) {
    const { username } = res.locals;
    const { page } = req.query;

    try {
      // TODO: create pagination
      const result = await InvoiceService.GetInvoiceListByUsername(username, 0);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get single invoice by ID 
   */
  static async GetInvoice(req: Request, res: Response, next: NextFunction) {
    const { username } = res.locals;
    const { id } = req.params;

    const idNumber = parseInt(id as string);

    if (Number.isNaN(idNumber)) {
      return next(
        respondWithError({
          status: ErrorCodes.BAD_REQUEST_ERROR,
          message: 'id is not a number',
        })
      );
    }

    try {
      const result = await InvoiceService.GetInvoiceDetails(username, idNumber);
    } catch (error) {
      return next(error);
    }
  }
}
