import { Router } from "express";
import { addFinishedGoal , getAllFinishedGoals ,deleteFinishedGoal} from "../services/finishedGoals.services/finishedGoals.services.js";

const router=Router();
router.post('/add' , addFinishedGoal);
router.get('/user/:userId' , getAllFinishedGoals)

router.delete('/delete/:goalId', deleteFinishedGoal)
export default router;