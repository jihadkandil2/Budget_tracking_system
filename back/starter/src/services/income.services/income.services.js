import Income from "../../models/income.model.js";

export const addIncome= async(req,res)=>{
    
    try{
        
       const newIncome=await Income.create(req.body);
    res.status(201).json({
       status:'success',
       newIncome
    })
    } catch(err){
        const firstErrorKey = Object.keys(err.errors || {})[0];
        console.log(firstErrorKey);
        if(firstErrorKey=='title'){
            return res.status(400).json({
                status: 'fail',
                message:'title is required',
    
            })
        }else if(firstErrorKey=='source'){
            return res.status(400).json({
                status: 'fail',
                message:'source is required',
            })
        }
        else if(firstErrorKey=='amount'){
            return res.status(400).json({
                status: 'fail',
                message:'amount is required',
            })
        }
        
        }
   
   }

   // ------------------------------- get all incomes ------------------------------
export const getAllIncomes= async(req,res)=>{
    try{
        const { userId } = req.params;
        
        const incomes=await Income.find({ userId});
        const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
         
        return res.status(200).json({
            status:'success',
            results:incomes.length,
            totalIncome,
            data:incomes
        })

    }catch(err){
        return res.status(404).json({
            status:'fail',
            message:'error getting income',
            err
        })
    }
}



// ------------------------------- update income  ------------------------------

export const updateIncomes= async(req,res)=>{
    try{
        const {  incomeId } = req.params;
        
        const updatedIncome=await Income.findByIdAndUpdate(incomeId,req.body,{new:true,runValidators:true});
        
        if(!updatedIncome){
            return res.status(404).json({
                status:'fail',
                message:'Income not found'
            })
        }

        return res.status(200).json({
            status:'success',
            updatedIncome
        })

    }catch(err){
        return res.status(400).json({
            status:'fail',
            message:'error updating Income',
            err
        })
    }
}