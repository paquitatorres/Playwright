import { BasePage } from "./BasePage";
import {Locator, Page} from "@playwright/test";


export class HomePage extends BasePage {

    

    readonly searchBar:Locator; 
    readonly searchButton:Locator;
    readonly productoSeleccionado:Locator;
    readonly nombreProducto:Locator;
    readonly filtroDropdown: Locator;
    readonly precioProducto: Locator;
    readonly primerProductoSeleccionado: Locator;
    




constructor (page: Page) {

    super(page);

this.searchBar = this.page.locator('[data-test="search-query"]');
this.searchButton = this.page.locator('[data-test="search-submit"]');
this.productoSeleccionado = this.page.locator('[data-test^="product-"]');
this.nombreProducto = this.page.locator('[data-test="product-name"]');
this.filtroDropdown = this.page.locator('[data-test="sort"]');
this.precioProducto = this.page.locator('span.float-end.text-muted:visible');
this.primerProductoSeleccionado = this.page.locator("//div[@class='container']//a[2]");

}
    

//metodos 


//ir al home
 async irAlHome() {
    await super.open();
 }


// buscar producto en la barra de busqueda
 async buscarProducto(producto: string) {
    await this.searchBar.fill(producto);
    await this.searchButton.click();
    await this.waitForPageLoad();
    await this.waitForVisible(this.productoSeleccionado.first());
 }


//seleccionar producto 2 
async seleccionarProducto(index: number = 1) { 
    const count = await this.productoSeleccionado.count();

    if (count === 0) {
        throw new Error(`No se encontraron productos en la búsqueda`);
    }

    // ✅ Mensaje específico para cuando no existe el segundo producto
    if (count < 2) {
        throw new Error(`No hay segundo producto para seleccionar. Solo se encontró ${count} producto`);
    }

    await this.productoSeleccionado.nth(index).click();
    await this.waitForPageLoad();
}


 getProductNameLocator() {
        return this.nombreProducto;
    }

    getProductItemsLocator() {
        return this.productoSeleccionado;
    }

async aplicarFiltro() {

    await this.filtroDropdown.selectOption('price,asc');
    await this.waitForPageLoad();
    await this.waitForVisible(this.precioProducto.first());
}

async obtenerPrecios(): Promise<number[]> {
    const precios = await this.precioProducto.allTextContents();
    return precios.map(p => parseFloat(p.replace('$', '')));
  }


async buscarySeleccionarProductoHP(producto: string) {

    await this.searchBar.fill(producto);
    await this.searchButton.click();
    await this.primerProductoSeleccionado.waitFor({state: 'visible'});
    await this.primerProductoSeleccionado.click();
 
}





}



