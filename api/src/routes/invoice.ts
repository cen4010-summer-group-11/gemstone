import { Router } from "express";
import { isAuthenticated } from "../middleware/auth";
import InvoiceController from "../controllers/invoice";

const router = Router();

// all routes need a bearer token
router.use(isAuthenticated);

router.get('/', InvoiceController.GetInvoices);
router.get('/:id', InvoiceController.GetInvoice);
router.post('/', InvoiceController.CreateInvoice);

const invoiceRouter = router;
export default invoiceRouter;