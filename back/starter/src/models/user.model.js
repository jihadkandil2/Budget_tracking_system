import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'name is required'],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true,'email already exists'],
        // match: [/\S+@\S+\.\S+/, 'Invalid email address'],
      },
      password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6,
        maxlength: 100
      },
    },
    { timestamps: true } 
  );

const User=mongoose.model('User' , userSchema);



export default User;