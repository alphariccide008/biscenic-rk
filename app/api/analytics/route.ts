import { NextResponse } from "next/server"

export async function GET() {
  // Simulate fetching data from a database or external API
  const analyticsData = {
    totalRevenue: "$45,231.89",
    subscriptions: "+2350",
    sales: "+12,234",
    activeNow: "+573",
    overviewChart: [
      { name: "Jan", total: 4000 },
      { name: "Feb", total: 3000 },
      { name: "Mar", total: 2000 },
      { name: "Apr", total: 2780 },
      { name: "May", total: 1890 },
      { name: "Jun", total: 2390 },
      { name: "Jul", total: 3490 },
      { name: "Aug", total: 3000 },
      { name: "Sep", total: 2000 },
      { name: "Oct", total: 2780 },
      { name: "Nov", total: 1890 },
      { name: "Dec", total: 2390 },
    ],
    recentSales: [
      { name: "Olivia Martin", email: "olivia.martin@example.com", amount: "$1,999.00" },
      { name: "Jackson Lee", email: "jackson.lee@example.com", amount: "$3,999.00" },
      { name: "Isabella Nguyen", email: "isabella.nguyen@example.com", amount: "$2,999.00" },
      { name: "William Kim", email: "will.kim@example.com", amount: "$899.00" },
      { name: "Sofia Davis", email: "sofia.davis@example.com", amount: "$5,999.00" },
    ],
    topProducts: [
      { name: "LumiVase Classic", sales: 1200 },
      { name: "Modern Platform Bed", sales: 900 },
      { name: "Sculptural Coffee Table", sales: 750 },
      { name: "Crystal Display Vase", sales: 600 },
      { name: "Aetheris Collection", sales: 500 },
    ],
    salesByCategory: [
      { name: "Vases", sales: 3000 },
      { name: "Beds", sales: 2500 },
      { name: "Tables", sales: 2000 },
      { name: "Sculptures", sales: 1500 },
      { name: "Other", sales: 1000 },
    ],
  }

  return NextResponse.json(analyticsData)
}
