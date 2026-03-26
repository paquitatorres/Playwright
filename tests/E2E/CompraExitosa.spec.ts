import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { Waits } from '../../utilities/Waits';
import { Components } from '../../pages/Components';
import { Cart } from '../../pages/Cart';

const DatosNecesarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Fixtures/ForE2EFlow.json'), 'utf-8'));



test('Compra Exitosa', async ({ page }) => {

 const homePage = new HomePage(page);
 const loginPage = new LoginPage(page);
 const wait = new Waits(page);
const components = new Components(page);
const cart = new Cart(page);


await test.step("seleccionar producto para el carrito de compras",async()=>{

 await homePage.open();

 await expect(page).toHaveURL('/');

 await homePage.buscarySeleccionarProductoHP(DatosNecesarios.DatosHappyPath.producto);

 await cart.agregarProducto();

});



 await test.step("ir al carrito de compras",async()=>{

  await components.gotoCart();

    await wait.waitStaticDebug(4); //para debbuguear

  await cart.processtoCheckout1(); 

});


await test.step("iniciar sesion para continuar ",async()=>{

 await cart.loginCart(DatosNecesarios.DatosHappyPath.correo, DatosNecesarios.DatosHappyPath.password);

  await page.getByRole('button', { name: 'Proceed to checkout' }).click();

 });


await test.step("completar datos faltantes y fin de compra",async()=>{

 await cart.completarDatosFaltantes(
  DatosNecesarios.DatosHappyPath.state,
  DatosNecesarios.DatosHappyPath.postcode); 
await page.getByRole('button', { name: 'Proceed to checkout' }).click();

 await cart.payment();

 await expect(cart.PaymentOkMenssage).toBeVisible();
});



});