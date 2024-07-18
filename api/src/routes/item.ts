import express from "express";
import ItemController from "../controllers/item";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

// all routes below need user to be authenticated
router.use(isAuthenticated);

router.get("/", ItemController.GetItemList);
router.post("/", ItemController.CreateItem);
router.get("/:id", ItemController.GetItem);
router.delete("/:id", ItemController.DeleteItem);

const itemRouter = router;
export default itemRouter;