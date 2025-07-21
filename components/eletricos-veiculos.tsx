"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Calendar, Fuel, Settings } from "lucide-react"
import { vehicles as allVehicles } from "@/data/vehicles"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"

export function EletricosVeiculos() {
  const vehicles = allVehicles.filter(
    (vehicle) => vehicle.electric && vehicle.available !== false
  )

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Destaques em mobilidade elétrica</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confira nossa seleção especial de scooters elétricas práticas e estilosas
          </p>
        </div>

        {/* Cards lado a lado (sm para cima) */}
        <div className="hidden sm:flex flex-wrap justify-center gap-8 mb-12">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="w-full md:w-[330px] h-[500px] flex">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col justify-between w-full">
                <div className="w-full aspect-[4/3] relative overflow-hidden">
                  {vehicle.images?.[0]?.endsWith(".svg") ? (
                    <img
                      src={vehicle.images[0]}
                      alt={vehicle.name}
                      className="w-full h-full object-contain bg-white"
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.webp"
                      }}
                    />
                  ) : (
                    <Image
                      src={vehicle.images?.[0] || "/images/placeholder.webp"}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <Badge className="absolute top-4 left-4 bg-red-600">{vehicle.badge}</Badge>
                </div>
                <CardContent className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {vehicle.name}
                    </h3>
                    <div className="text-2xl font-bold text-red-600 mb-4">{vehicle.price}</div>
                    <p className="text-sm text-gray-600 truncate mb-4">{vehicle.description}</p>
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
                  </div>
                  <Link href={`/veiculos/${vehicle.id}`}>
                    <Button className="w-full bg-red-600 hover:bg-red-700">Ver Detalhes</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Paginação (mobile) */}
        <div className="block sm:hidden mb-12">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            className="[&_.swiper-pagination-bullets]:!static [&_.swiper-pagination-bullets]:!mt-4"
          >
            {vehicles.map((vehicle) => (
              <SwiperSlide key={vehicle.id}>
                <div className="w-full h-[500px] flex">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col justify-between w-full">
                    <div className="w-full aspect-[4/3] relative overflow-hidden">
                      {vehicle.images?.[0]?.endsWith(".svg") ? (
                        <img
                          src={vehicle.images[0]}
                          alt={vehicle.name}
                          className="w-full h-full object-contain bg-white"
                          onError={(e) => {
                            e.currentTarget.src = "/images/placeholder.webp"
                          }}
                        />
                      ) : (
                        <Image
                          src={vehicle.images?.[0] || "/images/placeholder.webp"}
                          alt={vehicle.name}
                          fill
                          className="object-cover"
                        />
                      )}
                      <Badge className="absolute top-4 left-4 bg-red-600">{vehicle.badge}</Badge>
                    </div>
                    <CardContent className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {vehicle.name}
                        </h3>
                        <div className="text-2xl font-bold text-red-600 mb-4">{vehicle.price}</div>
                        <p className="text-sm text-gray-600 truncate mb-4">{vehicle.description}</p>
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
                      </div>
                      <Link href={`/veiculos/${vehicle.id}`}>
                        <Button className="w-full bg-red-600 hover:bg-red-700">Ver Detalhes</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
