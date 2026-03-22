import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class Components extends BasePage {

readonly ContactBtn: Locator; 

readonly HomeBtn: Locator;

readonly Cart: Locator;



// NOTA : el boton SING IN lo inclui en logIn 
//constructor

 constructor (page: Page) { super(page);


//  Selectores

this.ContactBtn = this.page.getByRole('link', { name: 'Contact' });
this.HomeBtn = this.page.getByRole('link', { name: 'Home' });
this.Cart = this.page.getByRole('link', { name: 'cart' });

}



// // Métodos

 async gotoContactPage() {    
        await this.ContactBtn.click();
}

async gotoHomePage() {    
    await this.HomeBtn.click(); 
}

async gotoCart(){
    await this.Cart.click();

}


}