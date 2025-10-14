import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const vehicleId = parseInt(id);
    const formData = await request.formData();

    // Dados do veículo
    const vehicleData = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string || null,
      price: formData.get("price") as string || null,
      year: formData.get("year") as string || null,
      fuel: formData.get("fuel") as string || null,
      transmission: formData.get("transmission") as string || null,
      km: formData.get("km") as string || null,
      color: formData.get("color") as string || null,
      placa: formData.get("placa") as string || null,
      doors: formData.get("doors") as string || null,
      badge: formData.get("badge") as string || null,
      description: formData.get("description") as string || null,
      spotlight: formData.get("spotlight") === "on",
      available: formData.get("available") === "on",
    };

    // Atualizar veículo
    const { error: updateError } = await supabase
      .from("vehicles")
      .update(vehicleData)
      .eq("id", vehicleId);

    if (updateError) throw updateError;

    // Deletar features antigas e inserir novas
    await supabase.from("vehicle_features").delete().eq("vehicle_id", vehicleId);

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

    // Deletar imagens antigas do storage
    const { data: oldImages } = await supabase
      .from("vehicle_images")
      .select("image_meta")
      .eq("vehicle_id", vehicleId);

    for (const img of oldImages || []) {
      if (img.image_meta?.folder) {
        try {
          const { data: files } = await supabase.storage
            .from("vehicles-media")
            .list(img.image_meta.folder);

          if (files && files.length > 0) {
            const filePaths = files.map(f => `${img.image_meta.folder}/${f.name}`);
            await supabase.storage.from("vehicles-media").remove(filePaths);
          }
        } catch (e) {
          console.error("Erro ao deletar imagem do storage:", e);
        }
      }
    }

    await supabase.from("vehicle_images").delete().eq("vehicle_id", vehicleId);

    // Manter imagens existentes
    const existingImages = JSON.parse(formData.get("existingImages") as string || "[]");
    if (existingImages.length > 0) {
      await supabase.from("vehicle_images").insert(
        existingImages.map((img: any, idx: number) => ({
          vehicle_id: vehicleId,
          image_url: img.url,
          image_meta: img.meta,
          display_order: idx
        }))
      );
    }

    // Upload novas imagens
    const newImageRecords = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("newImage_")) {
        const file = value as File;
        const uploaded = await uploadToStorage(file, vehicleId);
        newImageRecords.push({
          vehicle_id: vehicleId,
          image_url: uploaded.url,
          image_meta: uploaded.meta,
          display_order: existingImages.length + newImageRecords.length
        });
      }
    }

    if (newImageRecords.length > 0) {
      await supabase.from("vehicle_images").insert(newImageRecords);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Erro ao atualizar veículo:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao atualizar veículo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const vehicleId = parseInt(id);

    // Deletar imagens do storage
    const { data: images } = await supabase
      .from("vehicle_images")
      .select("image_meta")
      .eq("vehicle_id", vehicleId);

    for (const img of images || []) {
      if (img.image_meta?.folder) {
        try {
          const { data: files } = await supabase.storage
            .from("vehicles-media")
            .list(img.image_meta.folder);

          if (files && files.length > 0) {
            const filePaths = files.map(f => `${img.image_meta.folder}/${f.name}`);
            await supabase.storage.from("vehicles-media").remove(filePaths);
          }
        } catch (e) {
          console.error("Erro ao deletar imagem do storage:", e);
        }
      }
    }

    // Deletar veículo (cascade vai deletar features e images)
    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", vehicleId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Erro ao excluir veículo:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao excluir veículo" },
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