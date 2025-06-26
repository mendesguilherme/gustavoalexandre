import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { MobileMenu } from "../components/MobileMenu"
import { MobileMenuButton } from "../components/MobileMenuButton"

export function Header() {
  return (
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
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={160}
              height={48}
              className="object-contain"
            />
          </Link>

          {/* Navegação desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link href="/" className="hover:text-red-500 transition-colors">
                Início
              </Link>
              <Link href="/veiculos" className="hover:text-red-500 transition-colors">
                Veículos
              </Link>
              <Link href="#servicos" className="hover:text-red-500 transition-colors">
                Serviços
              </Link>
              <Link href="#contato" className="hover:text-red-500 transition-colors">
                Contato
              </Link>
            </nav>

            <Button className="bg-red-600 hover:bg-red-700">
              Fale Conosco
            </Button>
          </div>

          {/* Botão do menu mobile fixado à direita */}
          <div className="md:hidden absolute right-0">
            <MobileMenuButton />
          </div>
          
          {/* Botão do menu mobile */}
          <div className="md:hidden">
            <MobileMenuButton />
          </div>
        </div>

        {/* Menu mobile abaixo do header */}
        <MobileMenu />
      </div>
    </header>
  )
}
