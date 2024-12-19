import { Router } from "express";
import { addReport  ,getAllReports} from "../services/report.services/report.services.js";
const router=Router();

router.post('/add' , addReport)
router.get('/user/:userId' , getAllReports)

export default router;