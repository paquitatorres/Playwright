import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { asyncWrapProviders } from 'node:async_hooks';

export class Cart extends BasePage {


readonly AddProducto:Locator; 
readonly CheckoutBtn1:Locator;
readonly CheckoutBtn2:Locator;

readonly TextboxState: Locator;
readonly TextboxPostcode: Locator;

readonly PaymentCbx: Locator;
readonly PaymentBtn: Locator;

readonly PaymentOkMenssage: Locator;











constructor(page:Page){ super(page);



this.AddProducto = this.page.getByRole('button', { name: 'Add to cart' });
this.CheckoutBtn1 = this.page.locator('[data-test="proceed-1"]');
this.CheckoutBtn2 = this.page.locator('[data-test="proceed-2"]');

this.TextboxState= this.page.getByRole('textbox', { name: 'State' });
this.TextboxPostcode= this.page.getByRole('textbox', { name: 'Postal code' });

this.PaymentCbx= this.page.getByRole('combobox', { name: 'Payment Method' });
this.PaymentBtn= this.page.getByRole('button', { name: 'Confirm' });

this.PaymentOkMenssage = this.page.getByText('Payment was successful');

}




 async agregarProducto() {
    await this.AddProducto.click();
 }

async processtoCheckout1(){
 await this.CheckoutBtn1.click();
}

async processtoCheckout2(){
 await this.CheckoutBtn2.click();
}


async completarDatosFaltantes(state: string, postcode: string){
 await this.TextboxState.fill(state);
 await this.TextboxPostcode.fill(postcode);

}
 

async payment(){
 
   await this.PaymentCbx.selectOption('Cash on delivery'); 
   await this.PaymentBtn.click();

}

async menssagePaymentOk(){
   await this.PaymentOkMenssage.isVisible();

}


}    