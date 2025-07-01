"use client"

import { Car, Shield, CreditCard, RefreshCw } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

export function ServicesSection() {
  const services = [
    {
      icon: Car,
      title: "Compra de Veículos",
      description: "Compramos seu veículo pelo melhor preço do mercado com avaliação justa e transparente.",
    },
    {
      icon: Shield,
      title: "Venda com Garantia",
      description: "Todos os nossos veículos passam por rigorosa inspeção e vêm com garantia inclusa.",
    },
    {
      icon: RefreshCw,
      title: "Troca Facilitada",
      description: "Troque seu veículo atual por um novo com as melhores condições e facilidades.",
    },
    {
      icon: CreditCard,
      title: "Financiamento",
      description: "Oferecemos as melhores condições de financiamento com parcelas que cabem no seu bolso.",
    },
  ]

  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferecemos soluções completas para todas as suas necessidades automotivas
          </p>
        </div>

        {/* Swiper Mobile */}
        <div className="block md:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }}
            spaceBetween={16}
            slidesPerView={1}
            loop
            className="!px-6"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <Card className="text-center h-[300px] w-full shadow-md flex items-center justify-center">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                      <service.icon className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 text-center">{service.description}</p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow h-[300px]">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm text-center">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
