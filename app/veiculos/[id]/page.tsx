"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Fuel,
  Settings,
  ArrowLeft,
  Phone,
  MessageCircle,
  Car,
  Gauge,
  MapPin,
  Shield,
  CheckCircle,
} from "lucide-react"

export default function VehicleDetailsPage() {
  const params = useParams()
  const vehicleId = params.id

  const vehicle = {
    id: vehicleId,
    name: "Honda Civic 2022",
    brand: "Honda",
    price: "R$ 89.900",
    year: "2022",
    fuel: "Flex",
    transmission: "Automático",
    km: "25.000 km",
    color: "Prata",
    doors: "4 portas",
    engine: "2.0 16V",
    badge: "Seminovo",
    description:
      "Honda Civic 2022 em excelente estado de conservação. Veículo revisado, com baixa quilometragem e único dono. Todas as manutenções realizadas na concessionária autorizada.",
    features: [
      "Ar condicionado digital",
      "Direção elétrica",
      "Vidros elétricos",
      "Travas elétricas",
      "Central multimídia",
      "Câmera de ré",
      "Sensor de estacionamento",
      "Airbags frontais e laterais",
      "Freios ABS",
      "Controle de estabilidade",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  const [selectedImage, setSelectedImage] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado:", formData)
    alert("Obrigado pelo interesse! Entraremos em contato em breve.")
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-red-600">Início</Link>
          <span>/</span>
          <Link href="/veiculos" className="hover:text-red-600">Veículos</Link>
          <span>/</span>
          <span className="text-gray-900">{vehicle.name}</span>
        </div>

        <Link href="/veiculos" className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para veículos</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{vehicle.name}</h1>
                  <Badge className="bg-red-600">{vehicle.badge}</Badge>
                </div>
                <div className="text-3xl font-bold text-red-600">{vehicle.price}</div>
              </div>
              <div className="flex gap-2">
                <a href={`https://wa.me/5517991237276?text=Olá! Tenho interesse no ${vehicle.name}`} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />WhatsApp
                  </Button>
                </a>
                <a href="tel:+5517991237276">
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />Ligar
                  </Button>
                </a>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image src={vehicle.images[selectedImage]} alt={vehicle.name} width={600} height={400} className="w-full h-80 object-cover rounded-t-lg" />
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {vehicle.images.map((image, index) => (
                      <button key={index} onClick={() => setSelectedImage(index)} className={`relative rounded-lg overflow-hidden ${selectedImage === index ? "ring-2 ring-red-600" : ""}`}>
                        <Image src={image} alt={`${vehicle.name} - Foto ${index + 1}`} width={150} height={100} className="w-full h-20 object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Especificações</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-red-600" />
                    <div><span className="text-sm text-gray-600">Ano</span><div className="font-semibold">{vehicle.year}</div></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gauge className="h-5 w-5 text-red-600" />
                    <div><span className="text-sm text-gray-600">Quilometragem</span><div className="font-semibold">{vehicle.km}</div></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Fuel className="h-5 w-5 text-red-600" />
                    <div><span className="text-sm text-gray-600">Combustível</span><div className="font-semibold">{vehicle.fuel}</div></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-red-600" />
                    <div><span className="text-sm text-gray-600">Transmissão</span><div className="font-semibold">{vehicle.transmission}</div></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5 text-red-600" />
                    <div><span className="text-sm text-gray-600">Cor</span><div className="font-semibold">{vehicle.color}</div></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5 text-red-600" />
                    <div><span className="text-sm text-gray-600">Portas</span><div className="font-semibold">{vehicle.doors}</div></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
                <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Equipamentos e Opcionais</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Sticky */}
          <div className="sticky top-4 space-y-6 h-fit">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Tenho Interesse</h3>
                <p className="text-gray-600 mb-6">
                  Preencha o formulário e entraremos em contato para agendar uma visita ou test drive.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Seu nome completo" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">WhatsApp *</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(17) 99999-9999" required />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Gostaria de agendar um test drive, saber sobre financiamento..." rows={4} />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">Enviar Interesse</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                  <h3 className="text-xl font-semibold">Garantia Inclusa</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Veículo revisado e periciado</li>
                  <li>• Garantia de procedência</li>
                  <li>• Documentação em dia</li>
                  <li>• Suporte pós-venda</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold">Nossa Localização</h3>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>Av. Pref. Pedro Paschoal, 798</p>
                  <p>Jardim Ciranda - Bebedouro-SP</p>
                  <p className="font-semibold text-red-600">(17) 99123-7276</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
