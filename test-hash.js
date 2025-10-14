// test-hash.js
const bcrypt = require('bcryptjs');

const senha = 'admin123';
const hash = bcrypt.hashSync(senha, 10);

console.log('\n=== HASH GERADO ===');
console.log(hash);
console.log('\n=== TESTE DE VALIDAÇÃO ===');
console.log('Senha:', senha);
console.log('Válido?', bcrypt.compareSync(senha, hash));

console.log('\n=== SQL PARA EXECUTAR ===');
console.log(`
UPDATE admin_users 
SET password_hash = '${hash}' 
WHERE username = 'admin';
`);