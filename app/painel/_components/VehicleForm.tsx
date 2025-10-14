"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type VehicleFormProps = {
  vehicle?: any;
};

export default function VehicleForm({ vehicle }: VehicleFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Features
  const [features, setFeatures] = useState<string[]>(
    vehicle?.features?.map((f: any) => f.feature) || [""]
  );

  // Images
  const [images, setImages] = useState<{ url: string; meta: any; file?: File; id?: number }[]>(
    vehicle?.images?.map((img: any, idx: number) => ({ 
      id: idx, 
      url: img.image_url, 
      meta: img.image_meta 
    })) || []
  );

  function addFeature() {
    setFeatures([...features, ""]);
  }

  function removeFeature(index: number) {
    setFeatures(features.filter((_, i) => i !== index));
  }

  function updateFeature(index: number, value: string) {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 10) {
      alert("Máximo de 10 imagens permitidas");
      return;
    }

    for (const file of files) {
      if (!file.type.includes("image")) continue;
      
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImages(prev => [...prev, { 
          url: evt.target?.result as string, 
          meta: null,
          file 
        }]);
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Adicionar features
    const validFeatures = features.filter(f => f.trim());
    formData.set("features", JSON.stringify(validFeatures));

    // Adicionar imagens existentes
    const existingImages = images.filter(img => !img.file);
    formData.set("existingImages", JSON.stringify(existingImages));

    // Adicionar novas imagens
    images.forEach((img, index) => {
      if (img.file) {
        formData.append(`newImage_${index}`, img.file);
      }
    });

    try {
      const url = vehicle?.id 
        ? `/api/vehicles/${vehicle.id}`
        : `/api/vehicles`;

      const method = vehicle?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar veículo");
      }

      router.push("/painel");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Erro ao salvar veículo");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full h-11 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Informações Básicas */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b">Informações Básicas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClass}>Nome do Veículo *</label>
            <input
              name="name"
              defaultValue={vehicle?.name || ""}
              className={inputClass}
              required
              placeholder="Ex: Golf Comfortline 1.4 TSI"
            />
          </div>

          <div>
            <label className={labelClass}>Marca</label>
            <input
              name="brand"
              defaultValue={vehicle?.brand || ""}
              className={inputClass}
              placeholder="Ex: Volkswagen"
            />
          </div>

          <div>
            <label className={labelClass}>Preço</label>
            <input
              name="price"
              defaultValue={vehicle?.price || ""}
              className={inputClass}
              placeholder="Ex: R$ 72.900,00"
            />
          </div>

          <div>
            <label className={labelClass}>Ano</label>
            <input
              name="year"
              defaultValue={vehicle?.year || ""}
              className={inputClass}
              placeholder="Ex: 2015 ou 2014/2015"
            />
          </div>

          <div>
            <label className={labelClass}>Combustível</label>
            <select name="fuel" defaultValue={vehicle?.fuel || ""} className={inputClass}>
              <option value="">Selecione</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Álcool">Álcool</option>
              <option value="Flex">Flex</option>
              <option value="Diesel">Diesel</option>
              <option value="Elétrico">Elétrico</option>
              <option value="Híbrido">Híbrido</option>
              <option value="GNV">GNV</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Câmbio</label>
            <select name="transmission" defaultValue={vehicle?.transmission || ""} className={inputClass}>
              <option value="">Selecione</option>
              <option value="Manual">Manual</option>
              <option value="Automático">Automático</option>
              <option value="Automatizado">Automatizado</option>
              <option value="CVT">CVT</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Quilometragem</label>
            <input
              name="km"
              defaultValue={vehicle?.km || ""}
              className={inputClass}
              placeholder="Ex: 116.000 KM"
            />
          </div>

          <div>
            <label className={labelClass}>Cor</label>
            <input
              name="color"
              defaultValue={vehicle?.color || ""}
              className={inputClass}
              placeholder="Ex: Branco"
            />
          </div>

          <div>
            <label className={labelClass}>Placa</label>
            <input
              name="placa"
              defaultValue={vehicle?.placa || ""}
              className={inputClass}
              placeholder="Ex: ABC1D23"
            />
          </div>

          <div>
            <label className={labelClass}>Portas</label>
            <select name="doors" defaultValue={vehicle?.doors || ""} className={inputClass}>
              <option value="">Selecione</option>
              <option value="2">2 portas</option>
              <option value="4">4 portas</option>
              <option value="2/3">2/3 portas</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Badge/Etiqueta</label>
            <input
              name="badge"
              defaultValue={vehicle?.badge || ""}
              className={inputClass}
              placeholder="Ex: Seminovo, Destaque, Promoção"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Descrição</label>
          <textarea
            name="description"
            defaultValue={vehicle?.description || ""}
            rows={5}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descreva o veículo em detalhes..."
          />
        </div>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="available"
              defaultChecked={vehicle?.available ?? true}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Disponível para venda</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="spotlight"
              defaultChecked={vehicle?.spotlight ?? false}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Destaque na página inicial</span>
          </label>
        </div>
      </div>

      {/* Características */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b mb-4">Características do Veículo</h2>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className={inputClass}
                placeholder="Ex: Ar condicionado, Direção elétrica, Airbags..."
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium"
          >
            + Adicionar Característica
          </button>
        </div>
      </div>

      {/* Imagens */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b mb-4">
          Imagens (máximo 10) - Formato .webp recomendado
        </h2>
        
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            {images.map((img, index) => (
              <div key={img.id || index} className="relative group">
                <img
                  src={img.url}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold"
                >
                  ✕
                </button>
                <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length < 10 && (
          <label className="block">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-gray-400 text-4xl mb-2">📷</div>
              <p className="text-sm text-gray-600 font-medium">Clique para adicionar imagens</p>
              <p className="text-xs text-gray-500 mt-1">
                {images.length} de 10 imagens • Formatos: JPG, PNG, WEBP
              </p>
            </div>
          </label>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {submitting ? "Salvando..." : vehicle?.id ? "Salvar Alterações" : "Criar Veículo"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/painel")}
          disabled={submitting}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 disabled:opacity-50 font-medium transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}