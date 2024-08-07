import express from 'express';
import UserController from '../controllers/user';
const router = express.Router();

router.post('/register', UserController.RegisterUser);
router.post('/login', UserController.LoginUser);
router.get('/me', UserController.RefreshUserToken);

const authRouter = router;
export default authRouter;
