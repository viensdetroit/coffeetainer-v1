"use client"

import { useState } from "react"
import { Plus, TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  date: string
}

export function AccountingPanel() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "income", amount: 2450, description: "Günlük satış", category: "Satış", date: "2024-01-15" },
    {
      id: "2",
      type: "expense",
      amount: 350,
      description: "Kahve çekirdeği alımı",
      category: "Malzeme",
      date: "2024-01-15",
    },
    { id: "3", type: "expense", amount: 120, description: "Elektrik faturası", category: "Fatura", date: "2024-01-14" },
    { id: "4", type: "income", amount: 1890, description: "Önceki gün satış", category: "Satış", date: "2024-01-14" },
  ])

  const [newTransaction, setNewTransaction] = useState({
    type: "income" as "income" | "expense",
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  })

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const netProfit = totalIncome - totalExpense

  const handleAddTransaction = () => {
    if (newTransaction.amount && newTransaction.description && newTransaction.category) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: newTransaction.type,
        amount: Number.parseFloat(newTransaction.amount),
        description: newTransaction.description,
        category: newTransaction.category,
        date: newTransaction.date,
      }
      setTransactions([transaction, ...transactions])
      setNewTransaction({
        type: "income",
        amount: "",
        description: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Muhasebe Paneli</h2>
          <p className="text-gray-600">Gelir ve giderlerinizi yönetin</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Yeni İşlem
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Yeni İşlem Ekle</DialogTitle>
              <DialogDescription>Yeni bir gelir veya gider işlemi ekleyin</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">İşlem Türü</Label>
                <Select
                  value={newTransaction.type}
                  onValueChange={(value: "income" | "expense") => setNewTransaction({ ...newTransaction, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Gelir</SelectItem>
                    <SelectItem value="expense">Gider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Tutar (₺)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={newTransaction.category}
                  onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {newTransaction.type === "income" ? (
                      <>
                        <SelectItem value="Satış">Satış</SelectItem>
                        <SelectItem value="Catering">Catering</SelectItem>
                        <SelectItem value="Diğer">Diğer</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Malzeme">Malzeme</SelectItem>
                        <SelectItem value="Fatura">Fatura</SelectItem>
                        <SelectItem value="Maaş">Maaş</SelectItem>
                        <SelectItem value="Kira">Kira</SelectItem>
                        <SelectItem value="Diğer">Diğer</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  placeholder="İşlem açıklaması"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="date">Tarih</Label>
                <Input
                  id="date"
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                />
              </div>
              <Button onClick={handleAddTransaction} className="w-full">
                İşlem Ekle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Toplam Gelir</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">₺{totalIncome.toLocaleString()}</div>
            <p className="text-xs text-green-700">Bu ay toplam</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-900">Toplam Gider</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">₺{totalExpense.toLocaleString()}</div>
            <p className="text-xs text-red-700">Bu ay toplam</p>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br ${netProfit >= 0 ? "from-blue-50 to-blue-100 border-blue-200" : "from-orange-50 to-orange-100 border-orange-200"}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${netProfit >= 0 ? "text-blue-900" : "text-orange-900"}`}>
              Net Kar
            </CardTitle>
            <DollarSign className={`h-4 w-4 ${netProfit >= 0 ? "text-blue-600" : "text-orange-600"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-blue-900" : "text-orange-900"}`}>
              ₺{netProfit.toLocaleString()}
            </div>
            <p className={`text-xs ${netProfit >= 0 ? "text-blue-700" : "text-orange-700"}`}>Bu ay net</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Son İşlemler</CardTitle>
          <CardDescription>En son eklenen gelir ve gider kayıtları</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(transaction.date).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type === "income" ? "+" : "-"}₺{transaction.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
