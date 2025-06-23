"use client"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { useMobileMenu } from "../context/MobileMenuContext"

export function MobileMenu() {
  const { isOpen } = useMobileMenu()

  if (!isOpen) return null

  return (
    <nav className="py-4 border-t border-gray-800 mt-2">
      <div className="flex flex-col space-y-4">
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
        <Button className="bg-red-600 hover:bg-red-700 w-fit">Fale Conosco</Button>
      </div>
    </nav>
  )
}
