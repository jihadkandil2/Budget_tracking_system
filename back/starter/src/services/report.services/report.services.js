import Report from "../../models/report.model.js";


// ---------------------- add report  ----------------------
export const addReport= async(req,res)=>{
    
    try{
        
       const newReport=await Report.create(req.body);
    res.status(201).json({
       status:'success',
       newReport
    })
    } catch(err){
        return res.status(400).json({
            status:'fail',
            err
        })
        }
   
   }

    // ---------------------- get all reports  ----------------------
    export const getAllReports= async(req,res)=>{
        
        try{
            const { userId } = req.params;
           const reports=await Report.find({userId , });
        res.status(200).json({
           status:'success',
           results:reports.length,
           reports
        })
        } catch(err){
            return res.status(500).json({
                status:'fail',
                message:'error getting reports'
            })
            }
       
       }
