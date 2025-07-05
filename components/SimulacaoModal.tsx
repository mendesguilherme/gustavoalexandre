"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { vehicles } from "@/data/vehicles"

export function SimulacaoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [possuiEntrada, setPossuiEntrada] = useState("nao")
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("")
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const payload = {
      tipoFormulario: data.tipoFormulario,
      nome: data.nome,
      cpf: data.cpf,
      telefone: data.telefone,
      dataNascimento: data.dataNascimento,
      veiculo: data.veiculo,
      cnh: data.cnh,
      possuiEntrada: data.possuiEntrada,
      valorEntrada: data.valorEntrada
    }

    try {
      const response = await fetch("https://webhook.nexii.com.br/webhook/b4660e0e-976d-47bc-8f73-a89ee50f3f32", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "__n8n_BLANK_VALUE_e5362baf-c777-4d57-a609-6eaf1f9e87f6"
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setFeedback({
          type: "success",
          message: "Simulação enviada com sucesso! Em breve nossa equipe entrará em contato."
        })
      } else {
        const errorText = await response.text()
        setFeedback({
          type: "error",
          message: `Erro ao enviar a simulação: ${errorText || "Resposta inesperada do servidor."}`
        })
        console.error("Erro na resposta da API:", response.status, errorText)
      }

        } catch (error: any) {
      setFeedback({
        type: "error",
        message: `Erro de rede ou execução: ${error?.message || "Erro desconhecido"}`
      })
      console.error("Erro de rede ou execução:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h2 className="w-full text-center text-2xl font-semibold mb-4 text-gray-800">Simulação de Financiamento</h2>

        {!feedback ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="tipoFormulario" value="simulacao_financiamento" />

            <div>
              <Label htmlFor="nome" className="text-gray-700">Nome completo</Label>
              <Input id="nome" name="nome" required className="bg-white border-gray-300 text-black placeholder:text-gray-500" placeholder="Digite seu nome" />
            </div>

            <div>
              <Label htmlFor="cpf" className="text-gray-700">CPF</Label>
              <Input id="cpf" name="cpf" required className="bg-white border-gray-300 text-black placeholder:text-gray-500" placeholder="000.000.000-00" />
            </div>

            <div>
              <Label htmlFor="telefone" className="text-gray-700">Número de contato</Label>
              <Input id="telefone" name="telefone" required className="bg-white border-gray-300 text-black placeholder:text-gray-500" placeholder="(00) 00000-0000" />
            </div>

            <div>
              <Label htmlFor="dataNascimento" className="text-gray-700">Data de nascimento</Label>
              <Input id="dataNascimento" name="dataNascimento" type="date" required className="bg-white border-gray-300 text-black placeholder:text-gray-500" />
            </div>

            <div>
              <Label htmlFor="veiculo" className="text-gray-700">Veículo de interesse</Label>
              <select
                id="veiculo"
                name="veiculo"
                value={veiculoSelecionado}
                onChange={(e) => setVeiculoSelecionado(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-black"
              >
                <option value="">Selecione um veículo</option>
                {vehicles
                  .filter(v => v.available !== false)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((v) => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
              </select>
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
              <RadioGroup name="possuiEntrada" value={possuiEntrada} onValueChange={setPossuiEntrada} className="flex gap-4 mt-1">
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
                className={`bg-white border-gray-300 text-black placeholder:text-gray-500 ${possuiEntrada !== "sim" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
              Enviar simulação
            </Button>
            <button type="button" onClick={onClose} className="w-full text-center text-gray-500 hover:underline text-sm">
              Cancelar
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className={`text-xl font-semibold mb-4 ${feedback.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {feedback.type === "success" ? "Sucesso" : "Erro"}
            </h3>
            <p className="text-gray-700 mb-6">{feedback.message}</p>
            <button
              onClick={() => {
                setFeedback(null)
                if (feedback.type === "success") {
                  onClose()
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
