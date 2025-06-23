"use client"
import { MobileMenuProvider } from "@/Context/MobileMenuContext"

export function MobileMenuWrapper({ children }: { children: React.ReactNode }) {
  return <MobileMenuProvider>{children}</MobileMenuProvider>
}
