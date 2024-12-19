import Goal from "../../models/goal.model.js";
import Expense from "../../models/expenses.model.js";
import Income from "../../models/income.model.js";
// ------------------------------- add goal ------------------------------

export const addGoal = async (req, res) => {
  try {
    const newGoal = await Goal.create(req.body);
    res.status(201).json({
      status: "success",
      data: newGoal,
    });
  } catch (err) {
    const firstErrorKey = Object.keys(err.errors || {})[0];
    console.log(firstErrorKey);
    if (firstErrorKey == 'category') {
      return res.status(400).json({
        status: 'fail',
        message: 'category is required',
      })
    }
    else if (firstErrorKey == 'name') {
      return res.status(400).json({
        status: 'fail',
        message: 'title is required',

      })
    }
    else if (firstErrorKey == 'targetAmount') {
      return res.status(400).json({
        status: 'fail',
        message: 'targetAmount is required',
      })
    } else if (firstErrorKey == 'deadline') {
      return res.status(400).json({
        status: 'fail',
        message: 'deadline is required',
      })
    }

  }
};

// ------------------------------- get all goals ------------------------------

export const getAllGoals = async (req, res) => {
  try {
    const { userId } = req.params;
    const goals = await Goal.find({ userId });
    res.status(200).json({
      status: "success",
      results: goals.length,
      data: goals,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "No goals found",
    });
  }
};



// -----------------------------get goal by categories --------------------------

export const getGoalsByCategories = async (req, res) => {
  try {
    const { userId, category } = req.params;
    const goals = await Goal.find({ userId, category });

    res.status(200).json({
      status: "success",
      results: goals.length,
      data: goals,
    });

  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "No goals found",
    });
  }
};




// ----------------------------------- calculate goal ------------------------------

export const calculateAllGoals = async (req, res) => {
  try {
    let goals = [];
    goals = await Goal.find({ userId: req.params.userId });
    console.log(goals);

    const incomes = await Income.find({ userId: req.params.userId });
    const expenses = await Expense.find({ userId: req.params.userId });
    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const savedAmount = totalIncome - totalExpense;

    if (!goals || goals.length === 0) {
      return res.status(404).json({
        message: 'No goals found for this user',
        totalExpense,
        totalIncome,
        savedAmount,
      });
    }
    let totalTargetAmount = 0; //not used
    let totalAchievement = 0; //not used

    // ---------------------------------------------------------------------------------------------------
    goals.forEach(goal => {
      // totalTargetAmount = totalTargetAmount + goal.targetAmount;

      goal.amountLeft = goal.targetAmount - savedAmount;
      if (goal.amountLeft < 0) {
        goal.amountLeft = 0
      }

      goal.progress = (savedAmount / goal.targetAmount) * 100;

      if (goal.progress >= 100) {
        goal.progress = 100
      } else if (goal.progress < 100)
        goal.finished = false;
    
    });
    ;
    // totalAchievement = (savedAmount / totalTargetAmount) * 100;
    // totalAchievement = parseFloat(totalAchievement.toFixed(2));

    res.status(200).json({
      results: goals.length,
      totalAchievement,
      totalExpense,
      totalIncome,
      savedAmount,
      goals
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }

}

// ------------------------------- update goal ------------------------------


// ------------------------------------------------------------------------------------------------


// ------------------------------- delete goal ------------------------------

export const deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const deletedGoal = await Goal.findByIdAndDelete(goalId);

    if (!deletedGoal) {
      return res.status(404).json({
        status: 'fail',
        message: 'goal not found'
      })
    }
    return res.status(200).json({
      status: 'success',
      deletedGoal
    })
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'error deleting goal',
      err
    })
  }
}