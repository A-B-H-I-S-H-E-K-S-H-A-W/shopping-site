import { Schema, model, models } from "mongoose";

const adminSchema = new Schema(
  {
    adminName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = models.Admin || model("Admin", adminSchema);
