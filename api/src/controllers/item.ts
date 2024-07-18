import { NextFunction, Request, Response } from 'express';
import { ErrorCodes, respondWithError } from '../util/error';
import ItemService from '../services/item';

export default class ItemController {
  /**
   * Gets item by id in param 
   */
  static async GetItem(req: Request, res: Response, next: NextFunction) {
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
      const result = await ItemService.GetItemById(idNumber, username);

      res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  /*
   * Fetches item list by username in bearer token
   */
  static async GetItemList(req: Request, res: Response, next: NextFunction) {
    const { username } = res.locals;
    const { page } = req.query;

    let pageNumber;
    if (page?.length) {
      pageNumber = parseInt(page as string);

      if (Number.isNaN(pageNumber)) {
        return next(
          respondWithError({
            status: ErrorCodes.BAD_REQUEST_ERROR,
            message: 'page is not a number',
          })
        );
      }
    }

    if (!username) {
      return next(
        respondWithError({
          status: ErrorCodes.BAD_REQUEST_ERROR,
          message: 'No username found',
        })
      );
    }

    try {
      const itemsResponse = await ItemService.GetItemsByUsername(
        username,
        pageNumber ?? 0
      );

      res.status(200).json(itemsResponse);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Creates an item by request body item fields
   */
  static async CreateItem(req: Request, res: Response, next: NextFunction) {
    const { item } = req.body;
    const { username } = res.locals;

    if (!item) {
      return next(
        respondWithError({
          status: ErrorCodes.BAD_REQUEST_ERROR,
          message: 'Missing item object',
        })
      );
    }

    try {
      const newItemResult = await ItemService.NewItem(item, username);

      res.status(201).json(newItemResult);
    } catch (error) {
      return next(error);
    }
  }

  static async DeleteItem(req: Request, res: Response, next: NextFunction) {
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
      const result = await ItemService.DeleteItemById(idNumber, username);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
