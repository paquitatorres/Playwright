import { test, expect } from '@playwright/test';
import { initTokenPool, getToken , getRandomToken } from '../../utilities/Helpers';

const apiUrl = 'https://api.practicesoftwaretesting.com';


test('API test respuesta y tiempos de respuesta crear carrito ', async ({ request }) => {


  const startTime = Date.now();

   try {

 const respuesta = await request.post(`${apiUrl}/carts`);

 const tiempoDeRespuesta = Date.now() - startTime;

console.log(`Tiempo de respuesta: ${tiempoDeRespuesta} ms`);

  expect(respuesta.status()).toBe(201);

  const body = await respuesta.json();

  expect(body.id).toBeTruthy();

   expect(tiempoDeRespuesta).toBeLessThan(2000);

   }
catch (error) {
    console.error('Error en crear carrito o si el tiempo de respuesta mayor a 2000ms:', error);
    throw error;
  }
});




test('Obtener Lista de productos extraida correctamente de BD, y tomar de ellos un ID de un producto', async ({ request }) => {
  // Obtengo la lista de productos
  const productsRes = await request.get(`${apiUrl}/products`);
  expect(productsRes.status()).toBe(200);
  
  const products = await productsRes.json();
  console.log(`Lista de productos extraida correctamente:Se encontraron ${products.data.length} productos.`);
  
  // los primeros 3 productos para elegir uno
  products.data.slice(0, 3).forEach((p: any) => {
    console.log(`- ${p.name}: ID = ${p.id}`);
  });
  
  // Guarda un ID de producto válido para la siguiente prueba , el del primer producto
  const validProductId = products.data[0].id;
  console.log(`\n✅ Se puede usar este ID para producta para pruebas: ${validProductId}`);
});



test.beforeAll(async () => { await initTokenPool(); });

test('Verificar estados de endpoints específicos', async ({ request }) => {
 
 const resultadosendpoints = [];
  
  async function probarEndpoint(nombre: string, fn: () => Promise<any>) {
    try {
      await fn();
      resultadosendpoints.push({ nombre, estado: 'OK', error: null });
    } catch (error) {
      resultadosendpoints.push({ nombre, estado: 'FALLÓ', error: error.message });
    }
  }

console.log('Verificando endpoints publicos sin necesidad de token');

await probarEndpoint('GET /brands', async () => {
    const res = await request.get(`${apiUrl}/brands`);
    expect(res.status()).toBe(200);
  });

  await probarEndpoint('GET /categories', async () => {
    const res = await request.get(`${apiUrl}/categories`);
    expect(res.status()).toBe(200);
  });

  await probarEndpoint('GET /products', async () => {
    const res = await request.get(`${apiUrl}/products`);
    expect(res.status()).toBe(200);
  });


 
  console.log('Verificando endpoints protegidos con token');

  const token = getToken(0); // primer usuario del pool
  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };


    await probarEndpoint('POST /carts', async () => {
      const res = await request.post(`${apiUrl}/carts`, { headers: authHeaders });
      expect(res.status()).toBe(201);

    });


 console.log(' REPORTE DE ENDPOINTS');
 
   
  resultadosendpoints.forEach(r => {
    console.log(`   ${r.estado} ${r.nombre}`);
    if (r.error) console.log(`        ${r.error}`);
  });
  
  const total = resultadosendpoints.length;
  const exitosos = resultadosendpoints.filter(r => r.estado === 'OK').length;

 console.log(`RESUMEN: ${exitosos}/${total} endpoints funcionando`);

});




test('Agregar si es que se puede 10 veces un producto al carrito tendria que andar', async ({ request }) => {
  
  const token = getToken(1); // segundo usuario
  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  // Crear carrito
  
  console.log(' Creando carrito...');
  const createCartResponse = await request.post(`${apiUrl}/carts`, { 
    headers: authHeaders  
  });
  expect(createCartResponse.status()).toBe(201);
  const cart = await createCartResponse.json();
  const cartId = cart.id;
  console.log(' Carrito creado con ID:', cartId);

 
  console.log('Obteniendo un producto de la lista de productos...');
  const productsResponse = await request.get(`${apiUrl}/products`, { 
    headers: authHeaders 
  });
  expect(productsResponse.status()).toBe(200);
  const products = await productsResponse.json();
  const productId = products.data[0].id;
  console.log('Producto seleccionado:', products.data[0].name);

  
  // Agregar producto 10 veces 
  console.log('Agregando el producto 10 veces...');
  const addRequests = [];
  const startTimeAdd = Date.now();
  
  for (let i = 0; i < 10; i++) {
    addRequests.push(
      request.post(`${apiUrl}/carts/${cartId}`, {
        headers: authHeaders,
        data: {
          cart_id: cartId,      
          product_id: productId,
          quantity: 1
        }
      })
    );
  }
  
  const addResponses = await Promise.all(addRequests);
  const totalAddTime = Date.now() - startTimeAdd;
  
  console.log(` Tiempo total 10 peticiones: ${totalAddTime} ms`);
  console.log(`Tiempo promedio por petición: ${totalAddTime/10} ms`);

  // Verificar cada respuesta
  for (let index = 0; index < addResponses.length; index++) {
    const res = addResponses[index];
    const status = res.status();
    console.log(`Petición ${index + 1}: Status ${status}`);

    if (status !== 200) { 
      const errorText = await res.text();
      console.log(`Error en petición ${index + 1}:`, errorText);
      console.log('Headers:', res.headers());
    }
    expect(status).toBe(200);
    console.log(`Petición ${index + 1}: OK`);
  }

  //Verificar carrito final

 console.log('Verificando el carrito como quedo al final...');
  const getCartResponse = await request.get(`${apiUrl}/carts/${cartId}`, {
    headers: authHeaders
  });
  expect(getCartResponse.status()).toBe(200);
  const cartContents = await getCartResponse.json();
  
  // Mostrar estructura completa para entender
  console.log(` Item en carrito: ${cartContents.cart_items[0].product.name}`);
console.log(` Cantidad final: ${cartContents.cart_items[0].quantity}`);

// Validaciones (se mantienen igual)
expect(cartContents.cart_items.length).toBe(1);
expect(cartContents.cart_items[0].quantity).toBe(10);
expect(cartContents.cart_items[0].product_id).toBe(productId);

});



