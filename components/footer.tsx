import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, MessageCircle } from "lucide-react"

type FooterProps = {
  onOpenSimulacaoModal: () => void
}

export function Footer({ onOpenSimulacaoModal }: FooterProps) {
  return (
    <footer className="text-white py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Gustavo Alexandre Multimarcas"
                width={150}
                height={75}
              />
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Há anos no mercado automotivo, oferecemos veículos revisados e periciados com total garantia e as melhores
              condições de financiamento.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/gustavo.alexandre.518841" className="text-gray-300 hover:text-red-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/gustavoalexandremultimarcas/" className="text-gray-300 hover:text-red-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://wa.me/5517991237276" className="text-gray-300 hover:text-red-500 transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-red-500 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/veiculos" className="text-gray-300 hover:text-red-500 transition-colors">
                  Veículos
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onOpenSimulacaoModal()
                  }}
                  className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                >
                  Simulação
                </a>
              </li>
              <li>
                <Link href="#servicos" className="text-gray-300 hover:text-red-500 transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-gray-300 hover:text-red-500 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Compra de Veículos</li>
              <li>Venda com Garantia</li>
              <li>Troca Facilitada</li>
              <li>Consignação de Veículos</li>          
              <li>Financiamento</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="text-white">&copy; 2025 Gustavo Alexandre Multimarcas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
