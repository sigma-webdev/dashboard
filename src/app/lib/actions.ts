"use server";

import { revalidateTag } from "next/cache";
import connectDB from "./db";
import { Task } from "../model/Task";

// Create a new task
export async function createTask(formData: FormData) {
  try {
    await connectDB();

    const task = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status:
        (formData.get("status") as "pending" | "in-progress" | "completed") ||
        "pending",
    };

    await Task.create(task);
    revalidateTag("tasks");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Get all tasks
export async function getTasks() {
  try {
    await connectDB();
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(tasks));
  } catch (error: any) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

// Get a single task
export async function getTask(id: string) {
  try {
    await connectDB();
    const task = await Task.findById(id);
    if (!task) return null;
    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    console.error("Failed to fetch task:", error);
    return null;
  }
}

// Update a task
export async function updateTask(id: string, formData: FormData) {
  try {
    await connectDB();

    const updatedTask = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as "pending" | "in-progress" | "completed",
    };

    await Task.findByIdAndUpdate(id, updatedTask);
    revalidateTag("tasks");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Delete a task
export async function deleteTask(id: string) {
  try {
    await connectDB();
    await Task.findByIdAndDelete(id);
    revalidateTag("tasks");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
