import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD001",
      customer: "Alice Smith",
      date: "2023-10-26",
      status: "Processing",
      total: "$1,600.00",
      items: [{ name: "LumiVase® Classic", quantity: 1, price: "$1,600.00" }],
    },
    {
      id: "ORD002",
      customer: "Bob Johnson",
      date: "2023-10-25",
      status: "Shipped",
      total: "$2,800.00",
      items: [{ name: "Modern Platform Bed", quantity: 1, price: "$2,800.00" }],
    },
    {
      id: "ORD003",
      customer: "Charlie Brown",
      date: "2023-10-24",
      status: "Delivered",
      total: "$1,950.00",
      items: [{ name: "Sculptural Coffee Table", quantity: 1, price: "$1,950.00" }],
    },
    {
      id: "ORD004",
      customer: "Diana Prince",
      date: "2023-10-23",
      status: "Cancelled",
      total: "$850.00",
      items: [{ name: "Crystal Display Vase", quantity: 1, price: "$850.00" }],
    },
    {
      id: "ORD005",
      customer: "Eve Adams",
      date: "2023-10-22",
      status: "Processing",
      total: "$1,600.00",
      items: [{ name: "LumiVase® Classic", quantity: 1, price: "$1,600.00" }],
    },
  ]

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Processing":
        return "default"
      case "Shipped":
        return "secondary"
      case "Delivered":
        return "success" // Assuming a 'success' variant exists or can be added
      case "Cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage your customer orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
