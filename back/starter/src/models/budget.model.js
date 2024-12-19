import mongoose from 'mongoose';
const budgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          month: {
            type: Date,
      default: Date.now,
          },
          name:{
            type: String,
            required: [true, 'name is required'],
          },
          limit:{
            type: Number,
            required: [true, 'limit is required'],
          },
          warning:{
            type:Boolean,
            default: false
          }
    }
    ,{timestamps: true}
)

const Budget=mongoose.model('Budget' , budgetSchema);

export default Budget;