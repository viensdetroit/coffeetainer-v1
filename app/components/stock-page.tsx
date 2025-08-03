"use client"

import { Search, Package, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface StockItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  unit: string
  lastUpdated: string
  status: "low" | "normal" | "out"
  supplier: string
}

const StockPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const stockItems: StockItem[] = [
    {
      id: "1",
      name: "Arabica Kahve Çekirdeği",
      category: "Kahve",
      currentStock: 2,
      minStock: 5,
      unit: "kg",
      lastUpdated: "2024-01-15",
      status: "low",
      supplier: "Kahve Dünyası",
    },
    {
      id: "2",
      name: "Süt",
      category: "İçecek",
      currentStock: 15,
      minStock: 10,
      unit: "litre",
      lastUpdated: "2024-01-15",
      status: "normal",
      supplier: "Süt Merkezi",
    },
    {
      id: "3",
      name: "Şeker",
      category: "Tatlandırıcı",
      currentStock: 0,
      minStock: 3,
      unit: "kg",
      lastUpdated: "2024-01-14",
      status: "out",
      supplier: "Gıda Market",
    },
    {
      id: "4",
      name: "Kağıt Bardak (250ml)",
      category: "Ambalaj",
      currentStock: 500,
      minStock: 200,
      unit: "adet",
      lastUpdated: "2024-01-15",
      status: "normal",
      supplier: "Ambalaj Plus",
    },
    {
      id: "5",
      name: "Croissant",
      category: "Atıştırmalık",
      currentStock: 8,
      minStock: 15,
      unit: "adet",
      lastUpdated: "2024-01-15",
      status: "low",
      supplier: "Fırın Evi",
    },
    {
      id: "6",
      name: "Cheesecake",
      category: "Tatlı",
      currentStock: 12,
      minStock: 8,
      unit: "dilim",
      lastUpdated: "2024-01-15",
      status: "normal",
      supplier: "Tatlı Dünyası",
    },
  ]

  const filteredItems = stockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "out":
        return { color: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle, text: "Tükendi" }
      case "low":
        return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock, text: "Az Kaldı" }
      case "normal":
        return { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle, text: "Normal" }
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: Package, text: "Bilinmiyor" }
    }
  }

  const outOfStockCount = stockItems.filter((item) => item.status === "out").length
  const lowStockCount = stockItems.filter((item) => item.status === "low").length
  const totalItems = stockItems.length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Stok Yönetimi</h2>
        <p className="text-gray-600">Mevcut stok durumunu görüntüleyin</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-900">Tükenen Ürünler</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{outOfStockCount}</div>
            <p className="text-xs text-red-700">Acil sipariş gerekli</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">Az Kalan Ürünler</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{lowStockCount}</div>
            <p className="text-xs text-yellow-700">Yakında sipariş verin</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Toplam Ürün</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{totalItems}</div>
            <p className="text-xs text-blue-700">Takip edilen ürün</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Stok Listesi</CardTitle>
              <CardDescription>Tüm ürünlerin mevcut stok durumu</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const statusInfo = getStatusInfo(item.status)
              const StatusIcon = statusInfo.icon

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Package className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>Tedarikçi: {item.supplier}</span>
                        <span>•</span>
                        <span>Son güncelleme: {new Date(item.lastUpdated).toLocaleDateString("tr-TR")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {item.currentStock} {item.unit}
                      </div>
                      <div className="text-sm text-gray-500">
                        Min: {item.minStock} {item.unit}
                      </div>
                    </div>

                    <Badge className={`${statusInfo.color} flex items-center gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusInfo.text}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StockPage
