import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

//que locators necesito para el login


readonly signInButton: Locator; 


 readonly emailInput: Locator;
 readonly passwordInput: Locator;
 readonly loginButton: Locator;

 readonly userName : Locator;
  readonly errorMessage: Locator;



//constructor

constructor (page: Page) { super(page);


// Selectores

 this.signInButton = this.page.getByRole('link', { name: 'Sign in' });
 this.loginButton = this.page.getByRole('button', { name: 'Login' });

    this.emailInput = this.page.getByRole('textbox', { name: 'Email address *' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
   

    this.userName = this.page.locator("//a[@id='menu']");

    this.errorMessage = this.page.getByText('Invalid email or password', { exact: true });
   
  }

// Métodos

async gotoLoginPage() {
    await this.goto('/'); // URL base
    await this.signInButton.click();
  }



  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }


  async checkUserLogged() {
    await this.userName
  }




  async isErrorMessageVisible() {
    return this.errorMessage.isVisible();
  }

  



}
















