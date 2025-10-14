export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import LogoutButton from "./_components/LogoutButton";
import DeleteButton from "./_components/DeleteButton";
import { ChevronUp, ChevronDown } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Vehicle = {
  id: number;
  name: string;
  brand: string | null;
  price: string | null;
  year: string | null;
  badge: string | null;
  available: boolean;
  spotlight: boolean;
  created_at: string;
};

type SortColumn = "id" | "name" | "brand" | "year" | "price" | "created_at" | "spotlight";
type SortOrder = "asc" | "desc";

export default async function PainelPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/painel")}`);
  }

  const spRaw = await searchParams;
  const sp = Object.fromEntries(
    Object.entries(spRaw ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  ) as Record<string, string | undefined>;

  const page = Math.max(1, Number.parseInt(sp.p ?? "1") || 1);
  const rpp = Number.parseInt(sp.rpp ?? "25") || 25;
  const offset = (page - 1) * rpp;

  // Ordenação
  const sortColumn = (sp.sort ?? "created_at") as SortColumn;
  const sortOrder = (sp.order ?? "desc") as SortOrder;

  // Query base
  let query = supabase
    .from("vehicles")
    .select("id, name, brand, price, year, badge, available, spotlight, created_at", { count: "exact" });

  // Aplicar ordenação
  // Se ordenar por spotlight, trazer em destaque primeiro, depois por data
  if (sortColumn === "spotlight") {
    query = query.order("spotlight", { ascending: sortOrder === "asc" });
    query = query.order("created_at", { ascending: false });
  } else {
    query = query.order(sortColumn, { ascending: sortOrder === "asc" });
  }

  query = query.range(offset, offset + rpp - 1);

  const { data, error, count } = await query;

  if (error) {
    return (
      <main className="mx-auto max-w-7xl p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <LogoutButton />
        </div>
        <p className="text-red-600">Erro ao carregar veículos: {error.message}</p>
      </main>
    );
  }

  const vehicles = (data ?? []) as Vehicle[];
  const totalRows = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalRows / rpp));

  // Função helper para gerar links de ordenação
  function buildSortLink(column: SortColumn) {
    const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams();
    params.set("sort", column);
    params.set("order", newOrder);
    params.set("rpp", String(rpp));
    params.set("p", "1"); // Reset para página 1 ao ordenar
    return `/painel?${params.toString()}`;
  }

  // Função helper para gerar links de paginação
  function buildPageLink(newPage: number, newRpp?: number) {
    const params = new URLSearchParams();
    params.set("p", String(newPage));
    params.set("rpp", String(newRpp ?? rpp));
    if (sortColumn) params.set("sort", sortColumn);
    if (sortOrder) params.set("order", sortOrder);
    return `/painel?${params.toString()}`;
  }

  // Componente de ícone de ordenação
  function SortIcon({ column }: { column: SortColumn }) {
    if (sortColumn !== column) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortOrder === "asc" 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />;
  }

  return (
    <main className="mx-auto max-w-7xl p-6 pb-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Veículos</h1>
          <p className="text-sm text-gray-600 mt-1">{totalRows} veículo(s) cadastrado(s)</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{session?.user?.name ?? "Admin"}</span>
          <LogoutButton />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Itens por página:</label>
          <div className="flex gap-2">
            {[25, 50, 100].map((size) => (
              <Link
                key={size}
                href={buildPageLink(1, size)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  rpp === size
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {size}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/painel/veiculo/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors"
        >
          + Novo Veículo
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">
                <Link href={buildSortLink("id")} className="flex items-center gap-1 hover:text-blue-600 font-semibold text-gray-700">
                  ID
                  <SortIcon column="id" />
                </Link>
              </th>
              <th className="px-4 py-3 text-left">
                <Link href={buildSortLink("name")} className="flex items-center gap-1 hover:text-blue-600 font-semibold text-gray-700">
                  Nome
                  <SortIcon column="name" />
                </Link>
              </th>
              <th className="px-4 py-3 text-left">
                <Link href={buildSortLink("brand")} className="flex items-center gap-1 hover:text-blue-600 font-semibold text-gray-700">
                  Marca
                  <SortIcon column="brand" />
                </Link>
              </th>
              <th className="px-4 py-3 text-left">
                <Link href={buildSortLink("year")} className="flex items-center gap-1 hover:text-blue-600 font-semibold text-gray-700">
                  Ano
                  <SortIcon column="year" />
                </Link>
              </th>
              <th className="px-4 py-3 text-left">
                <Link href={buildSortLink("price")} className="flex items-center gap-1 hover:text-blue-600 font-semibold text-gray-700">
                  Preço
                  <SortIcon column="price" />
                </Link>
              </th>
              <th className="px-4 py-3 text-center">
                <Link href={buildSortLink("spotlight")} className="flex items-center justify-center gap-1 hover:text-blue-600 font-semibold text-gray-700">
                  Status
                  <SortIcon column="spotlight" />
                </Link>
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-600">{v.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{v.name}</div>
                  {v.badge && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded">
                      {v.badge}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">{v.brand ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">{v.year ?? "—"}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{v.price ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col items-center gap-1">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      v.available 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {v.available ? "Disponível" : "Indisponível"}
                    </span>
                    {v.spotlight && (
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⭐ Destaque
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/painel/veiculo/${v.id}`}
                      className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteButton vehicleId={v.id} vehicleName={v.name} />
                  </div>
                </td>
              </tr>
            ))}
            {!vehicles.length && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  <div className="text-gray-400 text-5xl mb-3">🚗</div>
                  <p className="font-medium">Nenhum veículo cadastrado ainda</p>
                  <p className="text-sm mt-1">Clique em "Novo Veículo" para começar</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between text-sm">
          <div className="text-gray-600">
            Página {page} de {totalPages} • Exibindo {vehicles.length} de {totalRows} veículos
          </div>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={buildPageLink(page - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Anterior
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={buildPageLink(page + 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Próxima →
              </Link>
            )}
          </div>
        </div>
      )}
    </main>
  );
}