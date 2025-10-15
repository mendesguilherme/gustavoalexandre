export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MAX_IMAGES = 10;

type NewItem = {
  image_url: string;
  image_meta: any;
  // o cliente pode mandar display_order, mas vamos recalcular com base nas existentes
  display_order?: number;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const vehicleId = Number(body?.vehicleId);
    const items = (Array.isArray(body?.items) ? body.items : []) as NewItem[];

    if (!vehicleId || !Number.isFinite(vehicleId)) {
      return NextResponse.json({ error: "vehicleId inválido" }, { status: 400 });
    }
    if (!items.length) {
      return NextResponse.json({ error: "Nada para inserir" }, { status: 400 });
    }

    // Busca quantas imagens já existem para este veículo
    const { data: existing, error: exErr } = await supabase
      .from("vehicle_images")
      .select("id, display_order, image_meta")
      .eq("vehicle_id", vehicleId)
      .order("display_order", { ascending: true });

    if (exErr) throw exErr;

    const already = existing?.length ?? 0;

    // Se ultrapassar o máximo, corta o excedente
    const availableSlots = Math.max(0, MAX_IMAGES - already);
    if (availableSlots <= 0) {
      return NextResponse.json(
        { error: "Limite de 10 imagens já atingido para este veículo" },
        { status: 400 }
      );
    }

    const toInsert = items.slice(0, availableSlots);

    // Evita duplicar por path (mesma imagem repetida acidentalmente)
    const existingPaths = new Set<string>(
      (existing ?? [])
        .map((x) => (x?.image_meta?.path as string) || "")
        .filter(Boolean)
    );
    const unique = toInsert.filter((it) => {
      const path = (it?.image_meta?.path as string) || "";
      if (!path) return true; // sem path não dá para deduplicar, deixa passar
      if (existingPaths.has(path)) return false;
      existingPaths.add(path);
      return true;
    });

    if (!unique.length) {
      return NextResponse.json(
        { success: true, skipped: "Todas as imagens já existiam" },
        { status: 200 }
      );
    }

    // Recalcula a ordem final: depois das existentes, na sequência recebida
    const rows = unique.map((it, idx) => ({
      vehicle_id: vehicleId,
      image_url: it.image_url,
      image_meta: it.image_meta,
      display_order: already + idx,
    }));

    const { error: insErr } = await supabase.from("vehicle_images").insert(rows);
    if (insErr) throw insErr;

    return NextResponse.json({
      success: true,
      inserted: rows.length,
      total_after: already + rows.length,
    });
  } catch (e: any) {
    console.error("Erro em /api/vehicles/images/append:", e);
    return NextResponse.json(
      { error: e?.message || "Erro ao registrar imagens" },
      { status: 500 }
    );
  }
}
