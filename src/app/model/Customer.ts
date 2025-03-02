import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer {
  _id?: string;
  name: string;
  email: string;
  contact: string;
  company: string;
  status: string;
  leadType: "Hot" | "Warm" | "Cold";
  query: string;
  remarks: string;
  salesPerson: string;
  referenceType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
    leadType: {
      type: String,
      enum: ["Hot", "Warm", "Cold"],
      default: "Cold",
    },
    query: { type: String, default: "Product Inquiry" },
    remarks: { type: String },
    salesPerson: { type: String },
    referenceType: {
      type: String,
      default: "Website",
    },
  },
  { timestamps: true }
);

export const Customer =
  mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", CustomerSchema);
