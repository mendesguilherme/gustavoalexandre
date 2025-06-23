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

export default function VeiculosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedPrice, setSelectedPrice] = useState("")

  const vehicles = [
    {
      id: 1,
      name: "Honda Civic 2022",
      brand: "Honda",
      price: "R$ 89.900",
      year: "2022",
      fuel: "Flex",
      transmission: "Automático",
      km: "25.000 km",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Seminovo",
      description: "Veículo em excelente estado, revisado e com garantia.",
    },
    {
      id: 2,
      name: "Chevrolet Onix 2023",
      brand: "Chevrolet",
      price: "R$ 65.900",
      year: "2023",
      fuel: "Flex",
      transmission: "Manual",
      km: "15.000 km",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Novo",
      description: "Veículo zero km com todas as garantias de fábrica.",
    },
    {
      id: 3,
      name: "Nissan Kicks 2021",
      brand: "Nissan",
      price: "R$ 78.900",
      year: "2021",
      fuel: "Flex",
      transmission: "CVT",
      km: "35.000 km",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Seminovo",
      description: "SUV completo com baixa quilometragem e único dono.",
    },
    {
      id: 4,
      name: "Toyota Corolla 2020",
      brand: "Toyota",
      price: "R$ 95.900",
      year: "2020",
      fuel: "Flex",
      transmission: "Automático",
      km: "40.000 km",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Seminovo",
      description: "Sedan premium com manutenção em dia na concessionária.",
    },
    {
      id: 5,
      name: "Volkswagen T-Cross 2022",
      brand: "Volkswagen",
      price: "R$ 82.900",
      year: "2022",
      fuel: "Flex",
      transmission: "Automático",
      km: "20.000 km",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Seminovo",
      description: "SUV compacto ideal para cidade com baixo consumo.",
    },
    {
      id: 6,
      name: "Hyundai HB20 2023",
      brand: "Hyundai",
      price: "R$ 58.900",
      year: "2023",
      fuel: "Flex",
      transmission: "Manual",
      km: "8.000 km",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Seminovo",
      description: "Hatch econômico e confiável, perfeito para o dia a dia.",
    },
    {
      id: 7,
      name: "Chevrolet Classic 1.0 LS",
      brand: "Chevrolet",
      price: "R$ 29.000",
      year: "2013",
      fuel: "Flex",
      transmission: "Manual",
      km: "154.000 km",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Usado",
      description: "Único dono, direção hidráulica, alarme, em ótimo estado de conservação.",
    },
  ]

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBrand === "" || vehicle.brand === selectedBrand) &&
      (selectedYear === "" || vehicle.year === selectedYear) &&
      (selectedPrice === "" ||
        (selectedPrice === "ate-50k" && Number.parseInt(vehicle.price.replace(/\D/g, "")) <= 50000) ||
        (selectedPrice === "50k-80k" &&
          Number.parseInt(vehicle.price.replace(/\D/g, "")) > 50000 &&
          Number.parseInt(vehicle.price.replace(/\D/g, "")) <= 80000) ||
        (selectedPrice === "acima-80k" && Number.parseInt(vehicle.price.replace(/\D/g, "")) > 80000))
    )
  })

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-black text-white py-20">
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
      <section className="py-12">
        <div className="container mx-auto px-4">
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

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum veículo encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
