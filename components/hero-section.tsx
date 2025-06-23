"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/autoplay"
import { Autoplay } from "swiper/modules"

import { ChevronRight, Car, Shield, CreditCard, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"

const banners = [
  {
    title: "CARROS REVISADOS E PERICIADOS COM GARANTIA",
    subtitle: "Encontre o carro ideal com segurança e procedência.",
    image: "/banners/banner1.jpg",
  },
  {
    title: "AS MELHORES CONDIÇÕES DE FINANCIAMENTO",
    subtitle: "Facilitamos seu sonho com taxas competitivas.",
    image: "/banners/banner2.jpg",
  },
]

export function HeroSection() {
  return (
    <section className="relative text-white">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        className="h-[700px]"
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              <div className="h-full w-full bg-black/60 flex items-center">
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left side - Content */}
                  <div className="space-y-8">
                    <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                      {banner.title.split("GARANTIA")[0]}<br />
                      <span className="text-red-500">GARANTIA</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-lg">{banner.subtitle}</p>
                    <div className="flex flex-wrap gap-2 text-lg font-semibold">
                      <span className="bg-red-600 px-4 py-2 rounded-full">COMPRA</span>
                      <span className="bg-red-600 px-4 py-2 rounded-full">VENDA</span>
                      <span className="bg-red-600 px-4 py-2 rounded-full">TROCA</span>
                      <span className="bg-red-600 px-4 py-2 rounded-full">FINANCIA</span>
                    </div>
                    <Link href="/veiculos">
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8">
                        Ver Veículos Disponíveis
                      </Button>
                    </Link>
                  </div>

                  {/* Right side - Form */}
                  <div className="lg:justify-self-end w-full max-w-md">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-6 text-center text-white">
                          Encontre seu veículo ideal
                        </h3>
                        <form className="space-y-4">
                          <div>
                            <Label htmlFor="name" className="text-white">Nome completo</Label>
                            <Input className="bg-white/20 border-white/30 text-white placeholder:text-gray-300" />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-white">WhatsApp</Label>
                            <Input className="bg-white/20 border-white/30 text-white placeholder:text-gray-300" />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-white">E-mail</Label>
                            <Input type="email" className="bg-white/20 border-white/30 text-white placeholder:text-gray-300" />
                          </div>
                          <div>
                            <Label htmlFor="interest" className="text-white">Interesse</Label>
                            <Textarea rows={3} className="bg-white/20 border-white/30 text-white placeholder:text-gray-300" />
                          </div>
                          <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">Quero ser Contactado</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
