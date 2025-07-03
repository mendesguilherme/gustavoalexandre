"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { vehicles } from "@/data/vehicles"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import InnerImageZoom from "react-inner-image-zoom"
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css"

import {
  Calendar,
  Fuel,
  Settings,
  ArrowLeft,
  Phone,
  MessageCircle,
  Gauge,
  MapPin,
  Shield,
} from "lucide-react"

export default function VehicleDetailsPage() {
  const params = useParams()
  const vehicleId = params?.id
  const vehicle = vehicles.find((v) => String(v.id) === String(vehicleId))
  const [showModal, setShowModal] = useState(false)

  const [selectedImage, setSelectedImage] = useState(0)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" })
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])

  if (!vehicle) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-12 text-center text-xl text-red-600">
          Veículo não encontrado.
        </div>
        <Footer onOpenSimulacaoModal={() => setShowModal(true)} />
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{vehicle.name}</h1>
                  <Badge className="bg-red-600">{vehicle.badge}</Badge>
                </div>
                <div className="text-3xl font-bold text-red-600">{vehicle.price}</div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/5517991237276?text=Olá! Tenho interesse no ${vehicle.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:+5517991237276"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-800 rounded hover:bg-gray-100 transition text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Ligar
                </a>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={vehicle.images[selectedImage] || "/images/placeholder.webp"}
                    alt={`${vehicle.name} - imagem ${selectedImage + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover rounded-t-lg cursor-zoom-in"
                    onClick={() => setIsModalOpen(true)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/placeholder.webp"
                    }}
                  />
                </div>
                {vehicle.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {vehicle.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative rounded-lg overflow-hidden ${selectedImage === idx ? "ring-2 ring-red-600" : ""}`}
                      >
                        <Image
                          src={img}
                          alt={`${vehicle.name} miniatura ${idx + 1}`}
                          width={150}
                          height={100}
                          className="w-full h-20 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/placeholder.webp"
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4" onClick={() => setIsModalOpen(false)}>
                <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-white text-2xl font-bold z-50">&times;</button>
                  <InnerImageZoom
                    src={vehicle.images[selectedImage]}
                    zoomSrc={vehicle.images[selectedImage]}
                    zoomType="hover"
                    zoomPreload
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Especificações</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Item icon={<Calendar />} label="Ano" value={vehicle.year} />
                  <Item icon={<Gauge />} label="Quilometragem" value={vehicle.km} />
                  <Item icon={<Fuel />} label="Combustível" value={vehicle.fuel} />
                  <Item icon={<Settings />} label="Transmissão" value={vehicle.transmission} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
                <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
              </CardContent>
            </Card>
          </div>

          <aside className="sticky top-4 space-y-6 h-fit">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Tenho Interesse</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <InputField label="Nome completo *" name="name" value={formData.name} onChange={handleInputChange} required />
                  <InputField label="WhatsApp *" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  <InputField label="E-mail" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Gostaria de agendar um test drive..." rows={4} />
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
          </aside>
        </div>
      </div>

      <Footer onOpenSimulacaoModal={() => setShowModal(true)} />
    </div>
  )
}

function Item({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="text-red-600">{icon}</div>
      <div>
        <span className="text-sm text-gray-600">{label}</span>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  )
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} value={value} onChange={onChange} required={required} />
    </div>
  )
}
