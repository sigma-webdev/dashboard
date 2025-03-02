import { getAllCustomers } from "../actions/customerActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Add type for Customer
type Customer = {
  id: string; // Changed from _id to id
  name: string;
  contact: string;
  leadType: string;
  query: string;
  remarks: string;
  salesPerson: string;
  referenceType: string;
  createdAt: string;
};

export async function ClientsTable() {
  // Add 'use server' directive at the start of the component
  "use server";

  const { data: customers = [] } = await getAllCustomers();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Mobile No.</TableHead>
          <TableHead>Lead Type</TableHead>
          <TableHead>Query</TableHead>
          <TableHead>Remarks</TableHead>
          <TableHead>Sales Person</TableHead>
          <TableHead>Reference Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer: Customer) => (
          <TableRow key={customer.id}>
            {" "}
            {/* Changed from _id to id */}
            <TableCell>
              {new Date(customer.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.contact}</TableCell>
            <TableCell>
              <Badge
                variant={
                  customer.leadType === "Hot"
                    ? "destructive"
                    : customer.leadType === "Warm"
                    ? "secondary"
                    : "default"
                }
                className={
                  customer.leadType === "Hot"
                    ? "bg-red-500 hover:bg-red-600"
                    : customer.leadType === "Warm"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-500 hover:bg-gray-600"
                }
              >
                {customer.leadType || "Cold"}
              </Badge>
            </TableCell>
            <TableCell>{customer.query || "Product Inquiry"}</TableCell>
            <TableCell>{customer.remarks || "NA"}</TableCell>
            <TableCell>{customer.salesPerson || "Unassigned"}</TableCell>
            <TableCell>{customer.referenceType || "Website"}</TableCell>
          </TableRow>
        ))}
        {customers.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No clients found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
