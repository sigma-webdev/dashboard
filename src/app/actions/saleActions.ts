"use server";

import { Sale, ISale } from "../model/Sale";
import connectDB from "../lib/db";
import { revalidatePath } from "next/cache";

export async function createSale(
  saleData: Omit<ISale, "_id" | "createdAt" | "updatedAt">
) {
  try {
    await connectDB();
    const sale = await Sale.create(saleData);
    revalidatePath("/sales");
    return { success: true, data: sale };
  } catch (error) {
    console.error("Error creating sale:", error);
    return { success: false, error: "Failed to create sale" };
  }
}

export async function updateSale(saleId: string, saleData: Partial<ISale>) {
  try {
    await connectDB();
    const sale = await Sale.findByIdAndUpdate(saleId, saleData, {
      new: true,
      runValidators: true,
    });
    revalidatePath("/sales");
    return { success: true, data: sale };
  } catch (error) {
    console.error("Error updating sale:", error);
    return { success: false, error: "Failed to update sale" };
  }
}

export async function deleteSale(saleId: string) {
  try {
    await connectDB();
    await Sale.findByIdAndDelete(saleId);
    revalidatePath("/sales");
    return { success: true };
  } catch (error) {
    console.error("Error deleting sale:", error);
    return { success: false, error: "Failed to delete sale" };
  }
}

export async function getSale(saleId: string) {
  try {
    await connectDB();
    const sale = await Sale.findById(saleId).populate("customerId");
    return { success: true, data: sale };
  } catch (error) {
    console.error("Error fetching sale:", error);
    return { success: false, error: "Failed to fetch sale" };
  }
}

export async function getAllSales() {
  try {
    await connectDB();
    const sales = await Sale.find({}).populate("customerId");
    return { success: true, data: sales };
  } catch (error) {
    console.error("Error fetching sales:", error);
    return { success: false, error: "Failed to fetch sales" };
  }
}

export async function getCustomerSales(customerId: string) {
  try {
    await connectDB();
    const sales = await Sale.find({ customerId }).populate("customerId");
    return { success: true, data: sales };
  } catch (error) {
    console.error("Error fetching customer sales:", error);
    return { success: false, error: "Failed to fetch customer sales" };
  }
}
