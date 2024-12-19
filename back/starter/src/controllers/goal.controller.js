import { Router } from "express";
import { addGoal ,getAllGoals , getGoalsByCategories , calculateAllGoals  , deleteGoal} from "../services/goal.services/goal.services.js";
const router=Router();

router.post('/add' , addGoal)
router.get('/user/:userId' , getAllGoals)
router.get('/user/:userId/category/:category' , getGoalsByCategories)
router.get('/calculate-all/:userId' , calculateAllGoals)

router.delete('/delete/:goalId' , deleteGoal)
export default router;