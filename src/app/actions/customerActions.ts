"use server";

import { Customer, ICustomer } from "../model/Customer";
import connectDB from "../lib/db";
import { revalidatePath } from "next/cache";

// Add this helper function to serialize the customer data
function serializeCustomer(customer: any) {
  return {
    id: customer._id.toString(),
    name: customer.name,
    email: customer.email,
    contact: customer.contact,
    company: customer.company,
    status: customer.status,
    leadType: customer.leadType,
    query: customer.query,
    remarks: customer.remarks,
    salesPerson: customer.salesPerson,
    referenceType: customer.referenceType,
    createdAt: customer.createdAt?.toISOString(),
    updatedAt: customer.updatedAt?.toISOString(),
  };
}

export async function createCustomer(
  customerData: Omit<ICustomer, "_id" | "createdAt" | "updatedAt">
) {
  try {
    await connectDB();

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "contact",
      "company",
      "status",
      "leadType",
    ];
    for (const field of requiredFields) {
      if (!customerData[field as keyof typeof customerData]) {
        throw new Error(`${field} is required`);
      }
    }

    // Add default values for optional fields if not provided
    const enrichedCustomerData = {
      ...customerData,
      company: customerData.company || "",
      status: customerData.status || "active",
      leadType: customerData.leadType || "Cold",
      query: customerData.query || "Product Inquiry",
      remarks: customerData.remarks || "NA",
      salesPerson: customerData.salesPerson || "Unassigned",
      referenceType: customerData.referenceType || "Website",
      // Add timestamp
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log("front end data", enrichedCustomerData);
    const customer = await Customer.create(enrichedCustomerData);

    if (!customer) {
      throw new Error("Failed to create customer record");
    }

    revalidatePath("/customers");
    return {
      success: true,
      data: serializeCustomer(customer),
    };
  } catch (error: any) {
    console.error("Error creating customer:", error);
    return {
      success: false,
      error: error.message || "Failed to create customer",
      details: error,
    };
  }
}

export async function updateCustomer(
  customerId: string,
  customerData: Partial<ICustomer>
) {
  try {
    await connectDB();
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      customerData,
      { new: true, runValidators: true }
    );
    revalidatePath("/customers");
    return { success: true, data: customer };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error: "Failed to update customer" };
  }
}

export async function deleteCustomer(customerId: string) {
  try {
    await connectDB();
    await Customer.findByIdAndDelete(customerId);
    revalidatePath("/customers");
    return { success: true };
  } catch (error) {
    console.error("Error deleting customer:", error);
    return { success: false, error: "Failed to delete customer" };
  }
}

export async function getCustomer(customerId: string) {
  try {
    await connectDB();
    const customer = await Customer.findById(customerId);
    return { success: true, data: customer };
  } catch (error) {
    console.error("Error fetching customer:", error);
    return { success: false, error: "Failed to fetch customer" };
  }
}

export async function getAllCustomers() {
  try {
    await connectDB();
    const customers = await Customer.find({});
    return {
      success: true,
      data: customers.map((customer) => serializeCustomer(customer)),
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    return { success: false, error: "Failed to fetch customers" };
  }
}
