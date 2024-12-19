import userController from './controllers/user.controller.js'
import budgetController from './controllers/budget.controller.js'
import incomeController from './controllers/income.controller.js'
import expenseController from './controllers/expense.contrller.js'
import goalController from './controllers/goal.controller.js'
import finishedGoalsController from './controllers/finishedGoals.controller.js'
import reportController from './controllers/report.controller.js'

import cors from 'cors';
const bootstrap=(express , app ,morgan)=>{
    app.use(cors());
    app.use(cors({
        origin: 'http://localhost:4200'
    }));

    if(process.env.NODE_ENV=='development'){
        app.use(morgan('dev'))
    }
    
    app.use(express.json())

    app.use('/user',userController);

    app.use('/budget' , budgetController)

    app.use('/income' , incomeController)
    app.use('/expense' , expenseController)
    app.use('/goal' , goalController)
    app.use('/report' , reportController)
    app.use('/finished' , finishedGoalsController)
    // -------------------------param middleware -------------------

// app.param('id' , (req,res,next , val)=>{
//     console.log(`the id is = ${val}`);
//     next();
// })

};
export default bootstrap;