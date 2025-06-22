"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Calendar, Fuel, Settings } from "lucide-react"

export function FeaturedVehicles() {
  const vehicles = [
    {
      id: 1,
      name: "Honda Civic 2022",
      price: "R$ 89.900",
      year: "2022",
      fuel: "Flex",
      transmission: "Automático",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Seminovo",
    },
    {
      id: 2,
      name: "Chevrolet Onix 2023",
      price: "R$ 65.900",
      year: "2023",
      fuel: "Flex",
      transmission: "Manual",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Novo",
    },
    {
      id: 3,
      name: "Nissan Kicks 2021",
      price: "R$ 78.900",
      year: "2021",
      fuel: "Flex",
      transmission: "CVT",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Seminovo",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Veículos em Destaque</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confira nossa seleção especial de veículos com as melhores condições
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {vehicles.map((vehicle) => (
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
                <div className="text-2xl font-bold text-red-600 mb-4">{vehicle.price}</div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
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
                </div>
                <Link href={`/veiculos/${vehicle.id}`}>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Ver Detalhes</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/veiculos">
            <Button
              size="lg"
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Ver Todos os Veículos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
