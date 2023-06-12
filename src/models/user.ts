import mongoose from 'mongoose';

import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    authorization:{
      password: { type: String, required: true },
      gAccesstoken: { type: String,  },
      gRfreshtoken: { type: String,  },

      
    },
     mobile: {
      type: String,
      unique: true,
      required: [true, "Mobile is required."],
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;