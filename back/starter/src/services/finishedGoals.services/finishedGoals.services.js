import finishedGoal from "../../models/finishedGoal.model.js";

export const addFinishedGoal = async (req, res) => {

    try{

        const newFinishedGoal = await finishedGoal.create(req.body);
        res.status(201).json({
            status:'success',
            newFinishedGoal
        });
    }catch(err){
        return res.status(400).json({
            status: 'fail',
            err

        })
        
    }
}

export const getAllFinishedGoals = async (req, res) => {
    try{
        const {userId}=req.params;
        const finishedGoals = await finishedGoal.find({userId});
        res.status(200).json({
            status:'success',
            results:finishedGoals.length,
            finishedGoals
        });
    }catch(err){
        return res.status(400).json({
            status: 'fail',
            err
        });
    }
}

// ------------------------------- delete goal ------------------------------

export const deleteFinishedGoal = async (req, res) => {
    try{
        const {goalId} = req.params;
        const deletedGoal = await finishedGoal.findByIdAndDelete(goalId);
        console.log(deletedGoal);
        
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
    }catch(err){
        return res.status(400).json({
            status: 'fail',
            message: 'error deleting goal',
            err
          })
    }
}
