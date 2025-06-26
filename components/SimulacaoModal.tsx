"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function SimulacaoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [possuiEntrada, setPossuiEntrada] = useState("nao")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode lidar com o envio, como enviar os dados para uma API
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Simulação de Financiamento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <Label htmlFor="nome" className="text-gray-700">Nome completo</Label>
            <Input
              id="nome"
              name="nome"
              required
              className="bg-white border-gray-300 text-black placeholder:text-gray-500"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <Label htmlFor="cpf" className="text-gray-700">CPF</Label>
            <Input
              id="cpf"
              name="cpf"
              required
              className="bg-white border-gray-300 text-black placeholder:text-gray-500"
              placeholder="000.000.000-00"
            />
          </div>

          <div>
            <Label htmlFor="dataNascimento" className="text-gray-700">Data de nascimento</Label>
            <Input
              id="dataNascimento"
              name="dataNascimento"
              type="date"
              required
              className="bg-white border-gray-300 text-black placeholder:text-gray-500"
            />
          </div>

          <div>
            <Label className="text-gray-700">Possui CNH?</Label>
            <RadioGroup name="cnh" defaultValue="sim" className="flex gap-4 mt-1">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="sim" id="cnhSim" />
                <Label htmlFor="cnhSim" className="text-gray-700">Sim</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="nao" id="cnhNao" />
                <Label htmlFor="cnhNao" className="text-gray-700">Não</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-gray-700">Possui entrada?</Label>
            <RadioGroup
              name="possuiEntrada"
              value={possuiEntrada}
              onValueChange={setPossuiEntrada}
              className="flex gap-4 mt-1"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="sim" id="entradaSim" />
                <Label htmlFor="entradaSim" className="text-gray-700">Sim</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="nao" id="entradaNao" />
                <Label htmlFor="entradaNao" className="text-gray-700">Não</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="valorEntrada" className="text-gray-700">Valor da entrada (R$)</Label>
            <Input
              id="valorEntrada"
              name="valorEntrada"
              placeholder="R$"
              disabled={possuiEntrada !== "sim"}
              className={`bg-white border-gray-300 text-black placeholder:text-gray-500 ${
                possuiEntrada !== "sim" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
            Enviar simulação
          </Button>
          <button type="button" onClick={onClose} className="w-full text-center text-gray-500 hover:underline text-sm">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  )
}
