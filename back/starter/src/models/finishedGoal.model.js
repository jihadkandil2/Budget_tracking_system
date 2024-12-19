import mongoose from 'mongoose';
const finishedGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
    progress:{
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const finishedGoal = mongoose.model('finishedGoal', finishedGoalSchema);
export default finishedGoal;
