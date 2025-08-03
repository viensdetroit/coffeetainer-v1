"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Coffee, Target } from "lucide-react"

export default function AnalyticsPage() {
  const salesData = [
    { day: "Pzt", sales: 1200 },
    { day: "Sal", sales: 1800 },
    { day: "Çar", sales: 1600 },
    { day: "Per", sales: 2200 },
    { day: "Cum", sales: 2800 },
    { day: "Cmt", sales: 3200 },
    { day: "Paz", sales: 2400 },
  ]

  const topProducts = [
    { name: "Cappuccino", sales: 145, percentage: 28 },
    { name: "Americano", sales: 120, percentage: 23 },
    { name: "Latte", sales: 98, percentage: 19 },
    { name: "Espresso", sales: 76, percentage: 15 },
    { name: "Mocha", sales: 45, percentage: 9 },
  ]

  const maxSales = Math.max(...salesData.map((d) => d.sales))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Analiz & Raporlar</h2>
        <p className="text-gray-600">İşletmenizin performans analizi</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Haftalık Ortalama</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">₺2,174</div>
            <p className="text-xs text-purple-700">+15% önceki haftaya göre</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Müşteri Artışı</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">+23%</div>
            <p className="text-xs text-green-700">Bu ay yeni müşteri</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">En Çok Satan</CardTitle>
            <Coffee className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">Cappuccino</div>
            <p className="text-xs text-orange-700">145 adet bu hafta</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Hedef Tamamlama</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">87%</div>
            <p className="text-xs text-blue-700">Aylık satış hedefi</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Haftalık Satış Trendi</CardTitle>
            <CardDescription>Son 7 günün satış performansı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data) => (
                <div key={data.day} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.day}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(data.sales / maxSales) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-16">₺{data.sales}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>En Çok Satan Ürünler</CardTitle>
            <CardDescription>Bu haftanın popüler ürünleri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 text-white text-sm font-bold rounded-full">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      <span className="text-sm text-gray-600">{product.sales} adet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${product.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{product.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Müşteri Memnuniyeti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">4.8</div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">127 değerlendirme</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ortalama Bekleme Süresi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3.2</div>
              <p className="text-gray-600">dakika</p>
              <p className="text-sm text-green-600 mt-2">-0.8 dk geçen haftaya göre</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tekrar Eden Müşteri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">68%</div>
              <p className="text-gray-600">müşteri sadakati</p>
              <p className="text-sm text-green-600 mt-2">+5% artış</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
