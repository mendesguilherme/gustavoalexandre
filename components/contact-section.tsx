"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contato" className="py-20 text-white bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estamos prontos para ajudar você a encontrar o veículo dos seus sonhos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-red-500" />
                    Endereço
                  </h4>
                  <div className="rounded-lg overflow-hidden border border-white/10">
                    <a
                      href="https://www.google.com/maps?q=Av.+Pref.+Pedro+Paschoal,+798+-+Bebedouro-SP"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <iframe
                        src="https://www.google.com/maps?q=Av.+Pref.+Pedro+Paschoal,+798+-+Bebedouro-SP&output=embed"
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                      ></iframe>
                    </a>
                    <p className="text-gray-300 text-sm text-center mt-2">
                      Av. Pref. Pedro Paschoal, 798<br />Jardim Ciranda - Bebedouro-SP
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Telefone</h4>
                    <p className="text-gray-300">(17) 99123-7276</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">WhatsApp</h4>
                    <p className="text-gray-300">(17) 99123-7276</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Horário de Funcionamento</h4>
                    <p className="text-gray-300">
                      Segunda a Sexta: 9h às 18h
                      <br />
                      Sábado: 8h às 13h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-600 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">Atendimento Personalizado</h4>
              <p className="text-red-100">
                Nossa equipe está pronta para oferecer o melhor atendimento e encontrar o veículo perfeito para suas
                necessidades.
              </p>
            </div>
          </div>

          <div id="contato-footer" className="flex flex-col justify-end h-full">
            <Card className="bg-white text-gray-900">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Envie sua Mensagem</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Nome</Label>
                      <Input id="contact-name" placeholder="Seu nome" />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Telefone</Label>
                      <Input id="contact-phone" placeholder="(17) 99999-9999" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-email">E-mail</Label>
                    <Input id="contact-email" type="email" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="contact-subject">Assunto</Label>
                    <Input id="contact-subject" placeholder="Como podemos ajudar?" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Mensagem</Label>
                    <Textarea id="contact-message" placeholder="Descreva sua necessidade ou dúvida..." rows={4} />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">Enviar Mensagem</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
