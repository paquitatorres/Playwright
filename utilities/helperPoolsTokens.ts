import { request as apiRequest } from '@playwright/test';

const apiUrl = 'https://api.practicesoftwaretesting.com';

const testUsers =
[
  { email: "customer@practicesoftwaretesting.com", password: "welcome01" },
  { email: "customer2@practicesoftwaretesting.com", password: "welcome01" },
  { email: "customer3@practicesoftwaretesting.com", password: "pass123" }
];

let tokenPool: string[] = [];

export async function initTokenPool() {
  
const tokens: string[] = [];
  for (const user of testUsers) {
    
     try {
      const context = await apiRequest.newContext({ baseURL: apiUrl });
      const loginRes = await context.post('/users/login', { data: user });
   

      if (loginRes.status() === 200) {
        const token = (await loginRes.json()).access_token;
        tokens.push(token);
        console.log(` Token obtenido para ${user.email}`);
      } 
      else {console.log(` Login falló para ${user.email} (status: ${loginRes.status()})`);
      }


      await context.dispose();
    
    
     } 
    
     catch (error) {
      console.log(` Error en login para ${user.email}: ${error.message}`);
     } }


tokenPool = tokens;
  if (tokenPool.length === 0) {
    throw new Error('No se pudo obtener ningún token'); }

    console.log(`Token pool inicializado con ${tokenPool.length} tokens`);
}

export function getToken(index: number): string {
  if (index >= tokenPool.length)
  throw new Error(`Token index ${index} out of bounds. Solo hay ${tokenPool.length} tokens.`);
  return tokenPool[index];
}

export function getRandomToken(): string {
  return tokenPool[Math.floor(Math.random() * tokenPool.length)];

}

