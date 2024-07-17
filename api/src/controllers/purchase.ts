import { NextFunction, Request, Response } from 'express';
import ItemService from '../services/item';
import { ErrorCodes, respondWithError } from '../util/error';

export default class PurchaseController {
  /**
   * Creates purchase for item
   * {
   *  id: id of the item the purchase is going to be for
   *  price: price item was bought
   *  supplier: name of the supplier
   *  quantity: amount of (id) item we purchased in the order
   * }
   */
  static async CreatePurchase(req: Request, res: Response, next: NextFunction) {
    const { username } = res.locals;
    const { purchase } = req.body;

    try {
      const purchaseResult = await ItemService.CreateItemPurchase(
        username,
        purchase
      );

      res.status(201).json(purchaseResult);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Gets list of purchases made by user
   */
  static async GetPurchases(req: Request, res: Response, next: NextFunction) {
    const { username } = res.locals;

    try {
      const purchases = await ItemService.GetItemPurchases(username);

      res.status(200).json(purchases);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Gets single purchase made by user
   * 
   * It returns an empty value if the user is not an owner of that id
   */
  static async GetPurchase(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { username } = res.locals;

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
      const purchases = await ItemService.GetItemPurchaseById(
        idNumber,
        username
      );

      res.status(200).json(purchases);
    } catch (error) {
      return next(error);
    }
  }
}
