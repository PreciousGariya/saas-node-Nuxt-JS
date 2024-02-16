
import mongoose, { Schema, Document } from 'mongoose';

// Define the schema for the user model
const verificationCodeSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    code: {type: String,required: true},
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Define the User model
  const verificationCodeModel = mongoose.model('ValidationCode', verificationCodeSchema);
  
  export {verificationCodeModel};
  