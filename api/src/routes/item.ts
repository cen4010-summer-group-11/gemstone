import express from "express";
import ItemController from "../controllers/item";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

// all routes below need user to be authenticated
router.use(isAuthenticated);

router.get("/", ItemController.GetItemList);
router.post("/", ItemController.CreateItem);
router.get("/:itemId", ItemController.GetItem);
router.delete("/:itemId", ItemController.DeleteItem);

const itemRouter = router;
export default itemRouter;