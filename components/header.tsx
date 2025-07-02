"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { MobileMenu } from "../components/MobileMenu"
import { MobileMenuButton } from "../components/MobileMenuButton"
import { SimulacaoModal } from "@/components/SimulacaoModal"

export function Header() {
  const [showSimulacaoModal, setShowSimulacaoModal] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleAnchorNavigation = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`)
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <>
      <header className="bg-black text-white sticky top-0 z-50 w-full overflow-x-hidden">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-gray-800">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4 text-red-500" />
                <span>(17) 99123-7276</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>Av. Pref. Pedro Paschoal, 798 - Bebedouro-SP</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/gustavo.alexandre.518841" className="text-gray-300 hover:text-red-500 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/gustavoalexandremultimarcas/" className="text-gray-300 hover:text-red-500 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://wa.me/5517991237276" className="text-gray-300 hover:text-red-500 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Linha principal do header */}
          <div className="relative py-3 flex items-center justify-center md:justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 mx-auto md:mx-0">
              <div className="h-13 md:h-15 overflow-hidden flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={210}
                  height={90}
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Botão do menu mobile */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 md:hidden">
              <MobileMenuButton />
            </div>

            {/* Navegação desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                <Link href="/" className="hover:text-red-500 transition-colors">Início</Link>
                <Link href="/veiculos" className="hover:text-red-500 transition-colors">Veículos</Link>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowSimulacaoModal(true)
                  }}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Simulação
                </a>
                <a
                  href="#servicos"
                  onClick={(e) => {
                    e.preventDefault()
                    handleAnchorNavigation("servicos")
                  }}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Serviços
                </a>
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault()
                    handleAnchorNavigation("contato")
                  }}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Contato
                </a>
              </nav>
              <Button
                onClick={() => {
                  const el = document.getElementById("contato-footer")
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" })
                  } else {
                    router.push("/#contato-footer")
                  }
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Fale Conosco
              </Button>
            </div>
          </div>

          {/* Menu mobile abaixo do header */}
          <MobileMenu onOpenSimulacaoModal={() => setShowSimulacaoModal(true)} />
        </div>
      </header>

      {/* Modal de Simulação */}
      <SimulacaoModal
        isOpen={showSimulacaoModal}
        onClose={() => setShowSimulacaoModal(false)}
      />
    </>
  )
}
