"use client"

import { useState } from "react"
import {
  BarChart3,
  Calculator,
  MessageSquare,
  Package,
  Coffee,
  Home,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AccountingPanel } from "./components/accounting-panel"
import AnalyticsPage from "./components/analytics-page"
import ChatPage from "./components/chat-page"
import StockPage from "./components/stock-page"

const menuItems = [
  {
    title: "Ana Sayfa",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Muhasebe",
    icon: Calculator,
    id: "accounting",
  },
  {
    title: "Analiz",
    icon: BarChart3,
    id: "analytics",
  },
  {
    title: "Ekip Chat",
    icon: MessageSquare,
    id: "chat",
  },
  {
    title: "Stok Yönetimi",
    icon: Package,
    id: "stock",
  },
]

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Kafe işletmenizin genel durumu</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Günlük Satış</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">₺2,450</div>
            <p className="text-xs text-blue-700">+12% önceki güne göre</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Müşteri Sayısı</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">127</div>
            <p className="text-xs text-green-700">+8% önceki güne göre</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Ortalama Sipariş</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">₺19.30</div>
            <p className="text-xs text-purple-700">+3% önceki güne göre</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">Aktif Siparişler</CardTitle>
            <Coffee className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">8</div>
            <p className="text-xs text-orange-700">Şu anda hazırlanıyor</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Son Siparişler</CardTitle>
            <CardDescription>Bugünkü son 5 sipariş</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "#001", item: "Cappuccino + Croissant", amount: "₺35", time: "14:30" },
                { id: "#002", item: "Americano", amount: "₺18", time: "14:25" },
                { id: "#003", item: "Latte + Cheesecake", amount: "₺42", time: "14:20" },
                { id: "#004", item: "Espresso", amount: "₺15", time: "14:15" },
                { id: "#005", item: "Mocha + Muffin", amount: "₺38", time: "14:10" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.item}</p>
                    <p className="text-sm text-gray-500">
                      {order.id} - {order.time}
                    </p>
                  </div>
                  <span className="font-semibold text-green-600">{order.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
            <CardDescription>Sık kullanılan işlemler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                <Calculator className="h-6 w-6 text-blue-600 mb-2" />
                <p className="text-sm font-medium text-blue-900">Gelir Ekle</p>
              </button>
              <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors">
                <TrendingUp className="h-6 w-6 text-red-600 mb-2" />
                <p className="text-sm font-medium text-red-900">Gider Ekle</p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                <Package className="h-6 w-6 text-green-600 mb-2" />
                <p className="text-sm font-medium text-green-900">Stok Kontrol</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-sm font-medium text-purple-900">Raporlar</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "accounting":
        return <AccountingPanel />
      case "analytics":
        return <AnalyticsPage />
      case "chat":
        return <ChatPage />
      case "stock":
        return <StockPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-200">
        <SidebarHeader className="border-b border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Coffeetainer</h1>
              <p className="text-sm text-gray-500">Kafe Yönetimi</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-600 font-medium">Menü</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(item.id)}
                      isActive={activeTab === item.id}
                      className="w-full justify-start gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-900 data-[active=true]:border-r-2 data-[active=true]:border-blue-500"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-6 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-gray-900">
              {menuItems.find((item) => item.id === activeTab)?.title || "Dashboard"}
            </h2>
          </div>
        </header>
        <div className="flex-1 p-6 bg-gray-50">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
