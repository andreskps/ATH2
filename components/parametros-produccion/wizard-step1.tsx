"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { getProducts, getMachines, type Product, type Machine } from "@/lib/data/parametros-produccion"

interface WizardStep1Props {
  data: any
  onUpdate: (data: any) => void
}

export function WizardStep1({ data, onUpdate }: WizardStep1Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [machines, setMachines] = useState<Machine[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, machinesData] = await Promise.all([getProducts(), getMachines()])
        setProducts(productsData)
        setMachines(machinesData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleProductChange = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    onUpdate({
      product: product?.name || "",
      productId: productId,
      name: data.machine && product ? `${product.name} - ${data.machine}` : data.name,
    })
  }

  const handleMachineChange = (machineId: string) => {
    const machine = machines.find((m) => m.id === machineId)
    onUpdate({
      machine: machine?.name || "",
      machineId: machineId,
      name: data.product && machine ? `${data.product} - ${machine.name}` : data.name,
    })
  }

  const suggestedParameters = [
    {
      id: "1",
      name: "Vaso 200ml - PP Transparente",
      product: "Vaso 200ml",
      machine: "INY-001",
      similarity: 95,
    },
    {
      id: "2",
      name: "Vaso 250ml - PP Transparente",
      product: "Vaso 250ml",
      machine: "INY-001",
      similarity: 87,
    },
  ]

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="product">Producto *</Label>
          <Select value={data.productId} onValueChange={handleProductChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar producto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name} ({product.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="machine">Máquina *</Label>
          <Select value={data.machineId} onValueChange={handleMachineChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar máquina" />
            </SelectTrigger>
            <SelectContent>
              {machines.map((machine) => (
                <SelectItem key={machine.id} value={machine.id}>
                  {machine.name} ({machine.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nombre del Set de Parámetros *</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Ej: Vaso 200ml - PP Transparente"
        />
      </div>

      {/* Sugerencias */}
      {data.product && data.machine && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Parámetros Similares</CardTitle>
            <CardDescription>
              Basado en tu selección, estos parámetros existentes podrían ser útiles como referencia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestedParameters.map((param) => (
                <div key={param.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{param.name}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline">{param.product}</Badge>
                      <Badge variant="outline">{param.machine}</Badge>
                      <Badge className="bg-green-100 text-green-800">{param.similarity}% similar</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Usar como base
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
