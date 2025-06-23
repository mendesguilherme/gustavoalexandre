"use client"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { ChevronRight, Car, Shield, CreditCard, RefreshCw } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-[#0c0e16] to-[#111827] text-white py-16 lg:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 flex justify-center overflow-hidden">
        <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
      </div>

      {/* Decorative arrows */}
      <div className="absolute top-10 right-10 hidden lg:block">
        <div className="flex space-x-2">
          {[...Array(6)].map((_, i) => (
            <ChevronRight key={i} className="h-6 w-6 text-white opacity-10" />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="flex space-x-2">
          {[...Array(6)].map((_, i) => (
            <ChevronRight key={i} className="h-6 w-6 text-white opacity-10" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
              CARROS REVISADOS E<br />
              <span className="text-white">PERICIADOS COM</span>
              <br />
              <span className="text-red-500">GARANTIA</span>
            </h1>

            <div className="flex flex-wrap gap-2 text-lg font-semibold">
              <span className="bg-red-600 px-4 py-2 rounded-full">COMPRA</span>
              <span className="bg-red-600 px-4 py-2 rounded-full">VENDA</span>
              <span className="bg-red-600 px-4 py-2 rounded-full">TROCA</span>
              <span className="bg-red-600 px-4 py-2 rounded-full">FINANCIA</span>
            </div>
          </div>

          <p className="text-lg text-gray-300 max-w-lg">
            Na Gustavo Alexandre Multimarcas, você encontra os melhores veículos novos e seminovos com total garantia e
            procedência. Facilitamos seu sonho com as melhores condições de financiamento.
          </p>

          {/* Service highlights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-full">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-sm">Veículos Revisados</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-full">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-sm">Com Garantia</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-full">
                <CreditCard className="h-5 w-5" />
              </div>
              <span className="text-sm">Financiamento</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-full">
                <RefreshCw className="h-5 w-5" />
              </div>
              <span className="text-sm">Troca Facilitada</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/veiculos">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 w-full sm:w-auto">
                Ver Veículos Disponíveis
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side - Lead Form */}
        <div className="lg:justify-self-end w-full max-w-md">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-center text-white">Encontre seu veículo ideal</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Nome completo
                  </Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    WhatsApp
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(17) 99999-9999"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="interest" className="text-white">
                    Interesse
                  </Label>
                  <Textarea
                    id="interest"
                    placeholder="Que tipo de veículo você procura?"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                    rows={3}
                  />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">Quero ser Contactado</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
