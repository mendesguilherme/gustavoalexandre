// components/forms/SimulacaoModal.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface SimulacaoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SimulacaoModal({ isOpen, onClose }: SimulacaoModalProps) {
  const [hasEntry, setHasEntry] = useState<string>("nao")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Simulação de Financiamento</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          // lógica de envio...
          onClose()
        }} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" required />
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" required />
          </div>
          <div>
            <Label htmlFor="dob">Data de nascimento</Label>
            <Input id="dob" type="date" required />
          </div>
          <div>
            <Label>Possui CNH?</Label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-1">
                <input type="radio" name="cnh" value="sim" required />
                Sim
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="cnh" value="nao" />
                Não
              </label>
            </div>
          </div>
          <div>
            <Label>Possui entrada?</Label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="entrada"
                  value="sim"
                  checked={hasEntry === "sim"}
                  onChange={() => setHasEntry("sim")}
                  required
                />
                Sim
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="entrada"
                  value="nao"
                  checked={hasEntry === "nao"}
                  onChange={() => setHasEntry("nao")}
                />
                Não
              </label>
            </div>
            <div className="mt-2">
              <Label htmlFor="valorEntrada">Valor da entrada</Label>
              <Input
                id="valorEntrada"
                placeholder="R$"
                disabled={hasEntry !== "sim"}
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
            Enviar simulação
          </Button>
        </form>
        <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:underline block mx-auto">
          Cancelar
        </button>
      </div>
    </div>
  )
}
