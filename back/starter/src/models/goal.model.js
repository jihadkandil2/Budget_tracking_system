import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, //forign key declaration
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: [true, 'category is required'],
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
      default: '',
    },
    targetAmount: {
      type: Number,
      required: [true, 'target amount is required'],
    },
    deadline: {
      type: Date,
      required: [true, 'deadline is required'],
    },
    finished:{
      type: Boolean,
      default: false,
    },
    amountLeft:{
      type: Number,
      default: 0,
    },
    progress:{
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const Goal = mongoose.model('Goal', goalSchema);
export default Goal;
