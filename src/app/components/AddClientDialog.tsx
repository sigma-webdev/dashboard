"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCustomer } from "../actions/customerActions";
import { toast } from "sonner";

export function AddClientDialog({
  onClientAdded,
}: {
  onClientAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const customerData = {
      name: (formData.get("name") as string).trim(),
      email: (formData.get("email") as string).trim(),
      contact: (formData.get("contact") as string).trim(),
      company: (formData.get("company") as string).trim(),
      status: "active",
      leadType: (formData.get("leadType") as "Hot" | "Warm" | "Cold") || "Cold",
      query: (formData.get("query") as string).trim() || "Product Inquiry",
      remarks: (formData.get("remarks") as string).trim() || "NA",
      salesPerson:
        (formData.get("salesPerson") as string).trim() || "Unassigned",
      referenceType:
        (formData.get("referenceType") as string).trim() || "Website",
    };

    // Basic validation
    const validationErrors: Record<string, string> = {};
    if (!customerData.name) validationErrors.name = "Name is required";
    if (!customerData.email) validationErrors.email = "Email is required";
    if (!customerData.contact) validationErrors.contact = "Contact is required";
    if (!customerData.company) validationErrors.company = "Company is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const result = await createCustomer(customerData);
      if (result.success && result.data) {
        toast.success("Client added successfully");
        setOpen(false);
        onClientAdded();
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || "Failed to add client");
        if (result.details) {
          console.error("Detailed error:", result.details);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while adding the client");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add New Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter client name"
              required
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <span className="text-sm text-red-500">{errors.name}</span>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              required
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              name="contact"
              placeholder="Enter contact number"
              required
              className={errors.contact ? "border-red-500" : ""}
            />
            {errors.contact && (
              <span className="text-sm text-red-500">{errors.contact}</span>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Enter company name"
              required
              className={errors.company ? "border-red-500" : ""}
            />
            {errors.company && (
              <span className="text-sm text-red-500">{errors.company}</span>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="leadType">Lead Type</Label>
            <select
              id="leadType"
              name="leadType"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              required
            >
              <option value="Cold">Cold</option>
              <option value="Warm">Warm</option>
              <option value="Hot">Hot</option>
            </select>
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="query">Query</Label>
            <Input
              id="query"
              name="query"
              placeholder="Enter query"
              defaultValue="Product Inquiry"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Input id="remarks" name="remarks" placeholder="Enter remarks" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="salesPerson">Sales Person</Label>
            <Input
              id="salesPerson"
              name="salesPerson"
              placeholder="Enter sales person name"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="referenceType">Reference Type</Label>
            <Input
              id="referenceType"
              name="referenceType"
              placeholder="Enter reference type"
              defaultValue="Website"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Adding...
              </span>
            ) : (
              "Add Client"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
