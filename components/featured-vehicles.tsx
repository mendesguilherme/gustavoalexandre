"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Calendar, Fuel, Settings } from "lucide-react"
import { vehicles as allVehicles } from "@/data/vehicles" // ajuste o path conforme seu projeto

export function FeaturedVehicles() {
  const vehicles = allVehicles.filter(
    (vehicle) => vehicle.spotlight && vehicle.available !== false
  )

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Veículos em Destaque</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confira nossa seleção especial de veículos com as melhores condições
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={vehicle.images?.[0] || "/images/placeholder.jpeg"}
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
