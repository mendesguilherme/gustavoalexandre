import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin } from "lucide-react"
import { Button } from "../components/ui/button"
import { MobileMenu } from "../components/MobileMenu"
import { MobileMenuButton } from "../components/MobileMenuButton"
import { MobileMenuContext } from '../Context/MobileMenuContext'

export function Header() {
  return (
  <MobileMenuProvider>
    <header className="bg-black text-white sticky top-0 z-50">
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
          <div className="flex space-x-2">
            <span>@gustavoalexandremultimarcas</span>
          </div>
        </div>

        {/* Logo centralizado com menu button no mobile */}
        <div className="relative flex items-center justify-center py-1 md:justify-between">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={160}
              height={48}
              className="object-contain"
            />
          </Link>

          {/* Botão do menu mobile alinhado à direita */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden">
            <MobileMenuButton />
          </div>

          {/* Navegação desktop */}
          <nav className="hidden md:flex space-x-8">
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

          <Button className="hidden md:block bg-red-600 hover:bg-red-700">
            Fale Conosco
          </Button>
        </div>

        {/* Menu mobile abaixo do header */}
        <MobileMenu />
      </div>
    </header>
  </MobileMenuProvider>
  )
}
