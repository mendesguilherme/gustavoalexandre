// scripts/create-admin.ts
// Execute: npx tsx scripts/create-admin.ts

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("\n🔧 Criar Novo Usuário Administrativo\n");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Erro: Variáveis de ambiente não configuradas");
    console.error("   Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const username = await question("Usuário: ");
  const password = await question("Senha: ");
  const name = await question("Nome completo (opcional): ");

  if (!username || !password) {
    console.error("❌ Usuário e senha são obrigatórios");
    rl.close();
    process.exit(1);
  }

  // Hash da senha
  const passwordHash = await bcrypt.hash(password, 10);

  // Inserir no banco
  const { data, error } = await supabase
    .from("admin_users")
    .insert([
      {
        username,
        password_hash: passwordHash,
        name: name || username,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("❌ Erro ao criar usuário:", error.message);
    rl.close();
    process.exit(1);
  }

  console.log("\n✅ Usuário criado com sucesso!");
  console.log(`   ID: ${data.id}`);
  console.log(`   Usuário: ${data.username}`);
  console.log(`   Nome: ${data.name}\n`);

  rl.close();
}

main();