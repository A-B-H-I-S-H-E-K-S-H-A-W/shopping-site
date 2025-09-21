import { Schema, model, models } from "mongoose";

const superAdminSchema = new Schema(
  {
    superSuperAdminName: {
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

export const SuperAdmin =
  models.SuperAdmin || model("SuperAdmin", superAdminSchema);
