"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { ChevronRight, Car, Shield, CreditCard, RefreshCw } from "lucide-react"
import Link from "next/link"
import React from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from 'swiper/modules'
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SimulacaoModal } from "@/components/SimulacaoModal"
import { useState } from "react"


export function HeroSection() {
  const [showSimulacaoModal, setShowSimulacaoModal] = useState(false)
  return (
    <section className="relative w-full overflow-hidden text-white">
      {/* Imagem de fundo responsiva */}
      <div className="absolute inset-0 z-[-1]">
        <img
          src="/images/Fundobanner.webp" // substitua pelo caminho correto da imagem
          alt="Banner de veículo esportivo"
          className="w-full h-[600px] sm:h-[900px] object-cover"
        />
        {/* Overlay escuro opcional */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Overlay escuro por cima do fundo */}
      <div className="absolute inset-0 bg-black opacity-10 z-0" />

      {/* Decorative arrows */}
      <div className="absolute top-5 right-10 hidden lg:block">
        <div className="flex space-x-2">
          {[...Array(6)].map((_, i) => (
            <ChevronRight key={i} className="h-6 w-6 text-white opacity-30" />
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-10 hidden lg:block">
        <div className="flex space-x-2">
          {[...Array(6)].map((_, i) => (
            <ChevronRight key={i} className="h-6 w-6 text-white opacity-20" />
          ))}
        </div>
      </div>
      
    <div className="w-full max-w-[1400px] mx-auto hero-wrapper px-4 flex flex-col lg:flex-row items-center lg:items-start gap-6 relative z-10">
      <div className="banner-swiper flex-1 mb-0">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
              }}
          autoplay={{ delay: 6000 }}
          pagination={{ clickable: true }}
          loop
          className="custom-swiper"
        >
          <SwiperSlide>
            <div className="space-y-8 min-h-[450px] flex flex-col justify-between">
              <div className="space-y-6">
                <h1 className="hero-title-sm text-3xl lg:text-5xl font-bold leading-tight">
                  CARROS REVISADOS E<br />
                  <span className="text-white">PERICIADOS COM</span>
                  <br />
                  <span className="text-red-500">GARANTIA</span>
                </h1>
                
                <div className="hero-buttons-sm text-lg font-semibold flex flex-wrap gap-2">
                  <span className="bg-red-600 px-4 py-2 rounded-full hero-badge-sm">COMPRA</span>
                  <span className="bg-red-600 px-4 py-2 rounded-full hero-badge-sm">VENDA</span>
                  <span className="bg-red-600 px-4 py-2 rounded-full hero-badge-sm">TROCA</span>
                  <span className="bg-red-600 px-4 py-2 rounded-full hero-badge-sm">FINANCIA</span>
                </div>
              </div>

              <p className="text-base text-gray-50 w-full sm:max-w-lg text-left sm:text-left px-2">
                Na Gustavo Alexandre Multimarcas, você encontra os melhores veículos novos e seminovos com total garantia e
                procedência. Facilitamos seu sonho com as melhores condições de financiamento.
              </p>

              <div className="flex flex-wrap gap-x-[6px] gap-y-3">
                <div className="flex items-center space-x-2">
                  <div className="bg-red-600 p-2 rounded-full">
                    <Car className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Veículos Revisados</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-red-600 p-2 rounded-full">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Com Garantia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-red-600 p-2 rounded-full">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Financiamento</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-red-600 p-2 rounded-full">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Troca Facilitada</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/veiculos">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-lg px-8 w-full sm:w-auto"
                  >
                    Ver Veículos Disponíveis
                  </Button>                  
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="space-y-8 min-h-[450px] flex flex-col justify-between">
              <div className="space-y-6">
                <h1 className="hero-title-sm text-3xl lg:text-5xl font-bold leading-tight">
                  FINANCIAMENTO<br />
                  <span className="text-white">EM ATÉ </span>
                  <span className="text-red-500">60X</span>
                </h1>
                
                <div className="hero-buttons-sm text-lg font-semibold flex flex-wrap gap-2">
                  <span className="bg-red-600 px-4 py-2 rounded-full hero-badge-sm">TAXAS REDUZIDAS</span>
                  <span className="bg-red-600 px-4 py-2 rounded-full hero-badge-sm">CRÉDITO RÁPIDO</span>
                </div>
                
              </div>

              <p className="text-base text-gray-50 w-full sm:max-w-lg text-left sm:text-left px-2">
                Condições exclusivas para você realizar o sonho do carro próprio sem comprometer o seu orçamento. Faça uma simulação!
              </p>

              <div className="flex flex-wrap gap-x-[6px] gap-y-3 items-center">
                <div className="flex items-center space-x-2">
                  <div className="bg-red-600 p-2 rounded-full">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Taxas a partir de 1,19%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-red-600 p-2 rounded-full">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Entrada Facilitada</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowSimulacaoModal(true)}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-lg px-8 w-full sm:w-auto"
                >
                  Simular Agora
                </Button>
              </div>
            </div>
          </SwiperSlide>                   
        </Swiper>   

        {/* Navegação abaixo do Swiper */}
        <div className="swiper-custom-nav flex justify-center items-center mt-4 gap-4 z-10 relative">
          <button className="swiper-prev">←</button>
          <button className="swiper-next">→</button>
        </div>
      </div>   

        {/* Right side - Lead Form */}
        <div className="hero-form flex justify-center w-full max-w-[480px] mt-6 mx-auto lg:mt-0 lg:ml-8">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-center text-white">Encontre seu veículo ideal</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Nome completo</Label>
                  <Input id="name" placeholder="Seu nome completo" className="bg-white/20 border-white/30 text-white placeholder:text-gray-300" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">WhatsApp</Label>
                  <Input id="phone" placeholder="(17) 99999-9999" className="bg-white/20 border-white/30 text-white placeholder:text-gray-300" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" className="bg-white/20 border-white/30 text-white placeholder:text-gray-300" />
                </div>
                <div>
                  <Label htmlFor="interest" className="text-white">Interesse</Label>
                  <Textarea id="interest" placeholder="Que tipo de veículo você procura?" className="bg-white/20 border-white/30 text-white placeholder:text-gray-300" rows={3} />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">Solicitar atendimento</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <SimulacaoModal
        isOpen={showSimulacaoModal}
        onClose={() => setShowSimulacaoModal(false)}
      />
    </section>
  )
}
