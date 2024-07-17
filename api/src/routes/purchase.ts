import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';
import PurchaseController from '../controllers/purchase';

const router = Router();

// all routes need a bearer token
router.use(isAuthenticated);

router.get('/', PurchaseController.GetPurchases);
router.get('/:id', PurchaseController.GetPurchase);
router.post('/',PurchaseController.CreatePurchase);

const purchaseRouter = router;
export default purchaseRouter;