import mongoose, { Schema } from "mongoose";

export interface ISale {
  _id?: string;
  customerId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  status: "pending" | "closed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

const SaleSchema = new Schema<ISale>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer ID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide a sale amount"],
      min: [0, "Amount cannot be negative"],
    },
    date: {
      type: Date,
      required: [true, "Please provide a sale date"],
      default: Date.now,
    },
    status: {
      type: String,
      required: [true, "Please provide a status"],
      enum: ["pending", "closed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Sale =
  mongoose.models.Sale || mongoose.model<ISale>("Sale", SaleSchema);
