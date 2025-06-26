"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Fuel, Settings, Search } from "lucide-react"
import Link from "next/link"
import { vehicles } from "@/data/vehicles"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function VeiculosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedPrice, setSelectedPrice] = useState("")
  const [showModal, setShowModal] = useState(false)

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBrand === "" || selectedBrand === "all" || vehicle.brand === selectedBrand) &&
      (selectedYear === "" || selectedYear === "all" || vehicle.year === selectedYear) &&
      (selectedPrice === "" || selectedPrice === "all" ||
        (selectedPrice === "ate-50k" && Number.parseInt(vehicle.price.replace(/\D/g, "")) <= 50000) ||
        (selectedPrice === "50k-80k" &&
          Number.parseInt(vehicle.price.replace(/\D/g, "")) > 50000 &&
          Number.parseInt(vehicle.price.replace(/\D/g, "")) <= 80000) ||
        (selectedPrice === "acima-80k" && Number.parseInt(vehicle.price.replace(/\D/g, "")) > 80000))
    )
  })

  const handleCustomVehicleSubmit = (e: any) => {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log("Interesse enviado:", Object.fromEntries(data.entries()))
    alert("Obrigado! Seu interesse foi enviado com sucesso.")
    setShowModal(false)
  }

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Nossos <span className="text-red-500">Veículos</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Encontre o veículo perfeito para você com garantia e as melhores condições
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar veículo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as marcas</SelectItem>
                <SelectItem value="Honda">Honda</SelectItem>
                <SelectItem value="Chevrolet">Chevrolet</SelectItem>
                <SelectItem value="Nissan">Nissan</SelectItem>
                <SelectItem value="Toyota">Toyota</SelectItem>
                <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                <SelectItem value="Hyundai">Hyundai</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os anos</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2013">2013</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPrice} onValueChange={setSelectedPrice}>
              <SelectTrigger>
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os preços</SelectItem>
                <SelectItem value="ate-50k">Até R$ 50.000</SelectItem>
                <SelectItem value="50k-80k">R$ 50.000 - R$ 80.000</SelectItem>
                <SelectItem value="acima-80k">Acima de R$ 80.000</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedBrand("")
                setSelectedYear("")
                setSelectedPrice("")
              }}
              variant="outline"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 pb-28"> {/* padding bottom aumentado */}
          <div className="mb-8">
            <p className="text-gray-600">
              Mostrando {filteredVehicles.length} de {vehicles.length} veículos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-600">{vehicle.badge}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{vehicle.name}</h3>
                  <div className="text-2xl font-bold text-red-600 mb-2">{vehicle.price}</div>
                  <p className="text-gray-600 text-sm mb-4">{vehicle.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{vehicle.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Fuel className="h-4 w-4" />
                      <span>{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Settings className="h-4 w-4" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="text-sm">
                      <span>{vehicle.km}</span>
                    </div>
                  </div>
                  <Link href={`/veiculos/${vehicle.id}`}>
                    <Button className="w-full bg-red-600 hover:bg-red-700">Ver Detalhes</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botão flutuante com posição correta */}
          <div className="absolute right-4 bottom-8 md:bottom-12">
            <Button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg"
            >
              🚘 Não encontrou seu veículo?
            </Button>
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum veículo encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg w-full max-w-sm shadow-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Encontre seu veículo ideal</h2>
      
            <form onSubmit={handleCustomVehicleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>
      
              <div>
                <Label htmlFor="phone" className="text-white">WhatsApp</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(17) 99999-9999"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>
      
              <div>
                <Label htmlFor="email" className="text-white">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>
      
              <div>
                <Label htmlFor="interest" className="text-white">Interesse</Label>
                <Textarea
                  id="interest"
                  name="interest"
                  placeholder="Que tipo de veículo você procura?"
                  rows={3}
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>
      
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">
                Quero ser Contactado
              </Button>
            </form>
      
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 mx-auto block text-sm text-gray-300 hover:underline"
            >
              Fechar
            </button>
          </div>
        </div>
      )}    

      <Footer />
    </div>
  )
}
