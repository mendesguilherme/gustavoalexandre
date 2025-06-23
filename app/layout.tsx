import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gustavo Alexandre Multimarcas - Compra, Venda e Troca de Veículos",
  description:
    "Carros revisados e periciados com garantia. Compra, venda, troca e financiamento de veículos novos e seminovos em Bebedouro-SP.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
