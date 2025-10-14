import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    // Dados do veículo
    const vehicleData = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      price: formData.get("price") as string,
      year: formData.get("year") as string,
      fuel: formData.get("fuel") as string,
      transmission: formData.get("transmission") as string,
      km: formData.get("km") as string,
      color: formData.get("color") as string,
      placa: formData.get("placa") as string,
      doors: formData.get("doors") as string,
      badge: formData.get("badge") as string,
      description: formData.get("description") as string,
      spotlight: formData.get("spotlight") === "on",
      available: formData.get("available") === "on",
    };

    // Criar veículo
    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .insert([vehicleData])
      .select()
      .single();

    if (vehicleError) throw vehicleError;

    const vehicleId = vehicle.id;

    // Inserir features
    const features = JSON.parse(formData.get("features") as string || "[]");
    if (features.length > 0) {
      await supabase.from("vehicle_features").insert(
        features.map((feature: string, idx: number) => ({
          vehicle_id: vehicleId,
          feature,
          display_order: idx
        }))
      );
    }

    // Upload e inserir imagens
    const imageRecords = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("newImage_")) {
        const file = value as File;
        const uploaded = await uploadToStorage(file, vehicleId);
        imageRecords.push({
          vehicle_id: vehicleId,
          image_url: uploaded.url,
          image_meta: uploaded.meta,
          display_order: imageRecords.length
        });
      }
    }

    if (imageRecords.length > 0) {
      await supabase.from("vehicle_images").insert(imageRecords);
    }

    return NextResponse.json({ success: true, id: vehicleId });
  } catch (error: any) {
    console.error("Erro ao criar veículo:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar veículo" },
      { status: 500 }
    );
  }
}

async function uploadToStorage(file: File, vehicleId: number): Promise<{ url: string; meta: any }> {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 15);
  const folder = `vehicles/${vehicleId}/${timestamp}-${randomId}`;
  const fileName = `original.webp`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("vehicles-media")
    .upload(filePath, file, {
      contentType: "image/webp",
      upsert: false,
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from("vehicles-media")
    .getPublicUrl(data.path);

  const meta = {
    bucket: "vehicles-media",
    folder: folder,
    formats: ["webp"],
    sources: {
      original: {
        url: publicUrl,
        size: file.size,
        format: "webp"
      }
    },
    original: {
      mime: "image/webp",
      width: null,
      height: null
    },
    updated_at: new Date().toISOString(),
    originalOnly: true
  };

  return { url: publicUrl, meta };
}