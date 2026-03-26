import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { PriceHelper } from '../../utilities/PriceHelper';
import { Waits } from '../../utilities/Waits';
import { Components } from '../../pages/Components';
import { Contact } from '../../pages/ContactPage';

//JSONS EXPORTADOS PARA USAR EN LOS TESTS

const productsSearchData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Fixtures/productsSeachdata.json'), 'utf-8'));

const usuarioData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Fixtures/usuarios.json'), 'utf-8'));




test.describe('Búsqueda de productos, seleccionando el segundo', () => {

   for (const { product } of productsSearchData) {

    test(`Buscar producto: ${product}`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.open();
      await expect(page).toHaveURL('/');
   
      await homePage.buscarProducto(product);
  

      // seleccionarProducto index=1 (segundo producto) y lanza error si no existe
      await homePage.seleccionarProducto();


      const regex = new RegExp(`${product}\\s?.*`, 'i');
      await expect(homePage.getProductNameLocator()).toHaveText(regex);

    });
  }
});




 test('Validación de ordenamiento de productos por precio de menor a mayor',
   async ({ page }) => {

   const homePage = new HomePage(page);
     const wait = new Waits(page);

   await homePage.open();
   await expect(page).toHaveURL('/');
   await homePage.waitStaticDebug(4); // Espera estática para depuración
   await homePage.aplicarFiltro();  
    await homePage.waitStaticDebug(4); // Espera estática para depuración
   
    const precios = await homePage.obtenerPrecios();
   console.log('Precios obtenidos:', precios);
   
    await  homePage.waitStaticDebug(4); // Espera estática para depuración
    PriceHelper.validarOrdenAscendente(precios);

 });




test ('Validar subir un archivo.txt a los comprobantes', async({ page }) => { 

  const homePage = new HomePage(page);
     const wait = new Waits(page);
     const components = new Components(page);
     const contact = new Contact(page);


   await homePage.open();
   await expect(page).toHaveURL('/');

   
   await components.gotoContactPage();
   
   expect(page).toHaveURL('/contact');


   await contact.fillContactForm('Juan', 'Perez', 'juan.perez@example.com', 'Customer service', 'Este es un mensaje de prueba para validar la subida de archivos en el formulario de contacto.');
   
   await contact.uploadFile(); 
  
   await contact.submitForm();
  

   await expect(contact.successMessage).toHaveText('Thanks for your message! We will contact you shortly.');


});





 test('Validar iniciar sesion con credencial validas', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    const wait = new Waits(page);

    await homePage.open();
    await loginPage.gotoLoginPage();
    await expect(page).toHaveURL('/auth/login');
  
  

    await loginPage.login(usuarioData.usuarios[0].correo, usuarioData.usuarios[0].contraseña);
 
    
    await expect(loginPage.userName).toHaveText(usuarioData.usuarios[0].nombreUsuario);    
    

    }); 




test.describe('Login - Casos negativos', () => {
  
test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);


    await homePage.open();
    await loginPage.gotoLoginPage();

});


  test('Password incorrecto', async ({ page }) => {
const loginPage = new LoginPage(page);
 await loginPage.login(usuarioData.usuarios[1].correo, usuarioData.usuarios[1].contraseña);
 await expect(loginPage.isErrorMessageVisible()).toBeTruthy();


});

 test('Usuario inexistente', async ({ page }) => {
    const loginPage = new LoginPage(page);
 await loginPage.login(usuarioData.usuarios[2].correo, usuarioData.usuarios[2].contraseña);
 await expect(loginPage.isErrorMessageVisible()).toBeTruthy();
  });

   test('Campo vacío - debe mostrar mensaje de validación o error', async ({ page }) => {
    const loginPage = new LoginPage(page);
 await loginPage.login(usuarioData.usuarios[3].correo, usuarioData.usuarios[3].contraseña);
 await expect(loginPage.isErrorMessageVisible()).toBeTruthy();
  });

 });
