import Expense from "../../models/expenses.model.js";
import Income from "../../models/income.model.js";
import Budget from "../../models/budget.model.js";
export const addexpense = async (req, res) => {
    try {
        const { amount, category , userId } = req.body;
        const incomes = await Income.find({ userId});
        const expenses = await Expense.find({ userId });
        const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
        const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        let remaining;
        if(!incomes && !expenses){
            remaining=0;
            
        }else if(!expenses && incomes){
           remaining=totalIncome;
            
        }else if(expenses && incomes){

            remaining = totalIncome - totalExpense;
        }
        console.log(remaining);
        
        const requestedExpensesByCategory = expenses.filter(item => item.category==category);

        let budgets = await Budget.find({ userId ,name: category});
        console.log(budgets);
        if(!incomes){
            return res.status(400).json({
                status: 'fail',
                message: 'Insufficient budget',
            })
        }
        if(requestedExpensesByCategory.length==0){
            console.log(`i am in line 35`);
            console.log(budgets);
            
            if( budgets.length>0){
                console.log(amount);
                
               if( amount>budgets[0].limit){
                console.log(`i am in line 38`);
                
                return res.status(400).json({
                    status: 'fail',
                    message: 'you exceeded budget category limit, you can edit it',
                })
               }
                
            }else if(amount>remaining || remaining==0){
                    console.log(` iam in line 46`);
                    
                    return res.status(400).json({
                        status: 'fail',
                        message: 'Insufficient budget',
                    })
                }
            else {
                console.log(`iam in line 53`);
                
                const newExpense = await Expense.create(req.body);
                console.log(`new expense : ${newExpense}`);
                
               return res.status(201).json({
                    status: 'success',
                    newExpense
                })
            }
            
        }
        else if(requestedExpensesByCategory.length>0){
            console.log(`i am in line 57`);
            
            const totalExpenseByBudget = requestedExpensesByCategory.reduce((sum, exp) => sum + exp.amount, 0);
            console.log(totalExpenseByBudget+amount);
            
            if(totalExpenseByBudget +amount>budgets[0].limit){
                console.log(` i am in line 63`);
                
                console.log(`you exceeded budget category limit, you can edit it`);
                return res.status(400).json({
                    status: 'fail',
                    message: 'you exceeded budget category limit, you can edit it',
                })
            }
            else if(amount>remaining){
                console.log(` i am in line 72`);
                
                return res.status(400).json({
                    status: 'fail',
                    message: 'Insufficient budget',
                })
            }
            
        }
        
        const newExpense = await Expense.create(req.body);
        console.log(`new expense : ${newExpense}`);
        
      return  res.status(201).json({
            status: 'success',
            newExpense
        })
    } catch (err) {
        const firstErrorKey = Object.keys(err.errors || {})[0];
        console.log(firstErrorKey);
        if (firstErrorKey == 'category') {
            return res.status(400).json({
                status: 'fail',
                message: 'category is required',
            })
        }
        else if (firstErrorKey == 'amount') {
            return res.status(400).json({
                status: 'fail',
                message: 'amount is required',

            })
        }
        else if (firstErrorKey == 'description') {
            return res.status(400).json({
                status: 'fail',
                message: 'description is required',
            })
        }

    }

}

// -----------------------get expenses --------------------
export const getAllExpenses = async (req, res) => {
    try {
        const { userId } = req.params;

        const expenses = await Expense.find({ userId });
        const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        return res.status(200).json({
            status: 'success',
            results: expenses.length,
            totalExpense,
            data: expenses
        })

    } catch (err) {
        return res.status(404).json({
            status: 'fail',
            message: 'error getting bidgets',
            err
        })
    }
}


// -----------------------update expense --------------------
export const updateExpense = async (req, res) => {
    try {
        const { expenseId , userId } = req.params;
        const { amount , category } = req.body;
        const incomes = await Income.find({ userId });
        const expenses = await Expense.find({ userId});
        const expensesByCategory= await Expense.find({category})
        let totalInCategory = expensesByCategory.reduce((sum, exp) => sum + exp.amount, 0);
        const budgetsByCategory=await Budget.find({name:category})
        const budgetLimit= budgetsByCategory[0].limit;
        const prevExpensesAmount= await Expense.findById(expenseId);
        const prevAmount=prevExpensesAmount.amount;
        const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
        let totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        totalExpense=totalExpense-prevAmount;
        const budget = totalIncome - totalExpense;
        totalInCategory=totalInCategory-prevAmount;
        
        if (budget < amount) {
            return res.status(400).json({
                status: 'fail',
                message: 'Insufficient budget',
            })
        }
        else if((totalInCategory+amount)>budgetLimit){
            return res.status(400).json({
                status: 'fail',
                message: 'you exceeded your budget limit , you can edit it',
            })
        }
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, req.body, { new: true, runValidators: true });

        if (!updatedExpense) {
            return res.status(404).json({
                status: 'fail',
                message: 'Expense not found'
            })
        }

        return res.status(200).json({
            status: 'success',
            updatedExpense
        })

    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'error updating expense',
            err
        })
    }


    
}
export const findByCategory=async (req, res) => {

    try {
        const { userId, category } = req.params;
        const expenses = await Expense.find({ userId , category });
        return res.status(200).json({
            status:'success',
            results: expenses.length,
            expenses
        })
    }catch(error){
        return res.status(400).json({
            status: 'fail',
            message: 'error updating expense',
            err
        })  
    }

}
