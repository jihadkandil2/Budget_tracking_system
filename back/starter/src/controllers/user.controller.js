import {Router} from 'express';
import { addUser  ,login   , updateUser } from "../services/user-services/user.services.js";

const router=Router();

router.post('/signup' , addUser);
router.post('/login' , login);

router.patch('/update/:userId', updateUser);
export default router;
