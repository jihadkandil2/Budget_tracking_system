import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalIncome:{
      type: Number,
    },
    title:{
      type: String,
    },
    source: {
      type: String,
      required: [true, 'source is required'],
    },
    amount: {
      type: Number,
      required: [true, 'amount is required'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model('Income', incomeSchema);
export default Income;
