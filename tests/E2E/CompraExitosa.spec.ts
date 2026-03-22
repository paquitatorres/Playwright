import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { Waits } from '../../utilities/Waits';
import { Components } from '../../pages/Components';
import { Cart } from '../../pages/Cart';

// const productsSearchData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Fixtures/productsSeachdata.json'), 'utf-8'));

// const usuarioData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Fixtures/usuarios.json'), 'utf-8'));

const DatosNecesarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Fixtures/ForE2EFlow.json'), 'utf-8'));




test('Compra Exitosa', async ({ page }) => {

 const homePage = new HomePage(page);
 const loginPage = new LoginPage(page);
 const wait = new Waits(page);
const components = new Components(page);
const cart = new Cart(page);



 //ir a pagina
 await homePage.open();

//logguearme 
await loginPage.gotoLoginPage();
await expect(page).toHaveURL('/auth/login');

await loginPage.login(DatosNecesarios.DatosHappyPath.correo, DatosNecesarios.DatosHappyPath.password);



 // Ir al Home y seleccionar Producto 

 await components.gotoHomePage();

 await homePage.buscarProducto(DatosNecesarios.DatosHappyPath.producto[0]);

 await homePage.seleccionarProducto();


 //  Agregar el producto y acciones en el carrito de compra 


  await cart.agregarProducto();

  await components.gotoCart();

  await cart.processtoCheckout1();

  await cart.processtoCheckout2();

  await cart.completarDatosFaltantes("Centro","s4200"); 

  await cart.payment();

  await expect (cart.menssagePaymentOk()).toBeTruthy();











});