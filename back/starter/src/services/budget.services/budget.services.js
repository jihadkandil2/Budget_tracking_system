import Budget from "../../models/budget.model.js";
import Expense from "../../models/expenses.model.js";
import Income from "../../models/income.model.js";
// ------------------------------- add budget ------------------------------
export const addBudget = async (req, res) => {

    try {
        const {name , userId}=req.body;

        const budgets=await Budget.find({name , userId});
        
        if(budgets.length>0){
          return  res.status(400).json({
                message: 'Budget name already exist you can edit it',
            })
            
        }
        const newBudget = await Budget.create(req.body);
        
        //    const userId=newUser._id
        res.status(201).json({
            status: 'success',
            newBudget
        })
    } catch (err) {
        const firstErrorKey = Object.keys(err.errors || {})[0];
        console.log(firstErrorKey);
        if(firstErrorKey=='name'){
            return res.status(400).json({
                status: 'fail',
                message:'name is required',
    
            })
        }else if(firstErrorKey=='limit'){
            return res.status(400).json({
                status: 'fail',
                message:'limit is required',
            })
        }
        
        
    }

}

// ------------------------------- get all budgets ------------------------------
export const getBudgets = async (req, res) => {
    try {
      let sumExpense=0;
        const incomes = await Income.find({ userId: req.params.userId });
        const expenses = await Expense.find({ userId: req.params.userId });
        const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
        const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        console.log(totalIncome);
        console.log(totalExpense);
        
        
        const remainingBudget=totalIncome-totalExpense;

        const AllBudgets=await Budget.find({userId: req.params.userId });
        
        return res.status(200).json({
            status: 'success',
           totalIncome,
           totalExpense,
           remainingBudget,
           AllBudgets
        })

    } catch (err) {
        return res.status(404).json({
            status: 'fail',
            message: 'error getting budgets',
            err
        })
    }
}


// ------------------------------- update budget  ------------------------------

export const updateBudget = async (req, res) => {
    try {
        const { budgetId } = req.params;
        
        const updatedBudget = await Budget.findByIdAndUpdate(budgetId, req.body, { new: true, runValidators: true });

        if (!updatedBudget) {
            return res.status(404).json({
                status: 'fail',
                message: 'budget not found'
            })
        }

        return res.status(200).json({
            status: 'success',
            updatedBudget
        })

    } catch (err) {
        

        const firstErrorKey = Object.keys(err.errors || {})[0];
        console.log(firstErrorKey);
        if(firstErrorKey=='name'){
            return res.status(400).json({
                status: 'fail',
                message:'name is required',
    
            })
        }else if(firstErrorKey=='limit'){
            return res.status(400).json({
                status: 'fail',
                message:'limit is required',
            })
        }

        return res.status(400).json({
            status: 'fail',
            message: 'error updating budget',
            err
        })
    }
}