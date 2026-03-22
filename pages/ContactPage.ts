import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import path from 'path';




export class Contact extends BasePage {





readonly firstNameInput: Locator;
readonly lastNameInput: Locator;
readonly emailInput: Locator;
readonly subjectInput: Locator;
readonly messageInput: Locator;

readonly uploadFileInput: Locator;

readonly sendButton: Locator;
readonly successMessage: Locator;


constructor (page: Page) { super(page);


// Selectores   


this.firstNameInput = this.page.getByRole('textbox', { name: 'First name' });
this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
this.emailInput = this.page.getByRole('textbox', { name: 'Email address' });
this.subjectInput = this.page.getByRole('combobox', { name: 'Subject' });
this.messageInput = this.page.getByRole('textbox', { name: 'Message *' });

this.uploadFileInput = this.page.locator('input[type="file"]');

this.sendButton = this.page.getByRole('button', { name: 'Send' });

this.successMessage = this.page.getByRole('alert');
}


async fillContactForm(firstName: string, lastName: string, email: string, subject: string, message: string) {

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.waitStaticDebug(2); // Espera estática para depuración
    await this.emailInput.fill(email);
    await this.waitStaticDebug(2); // Espera estática para depuración
    await this.subjectInput.selectOption(subject);
    await this.waitStaticDebug(2); // Espera estática para depuración
    await this.messageInput.fill(message);
    
  }


 

async uploadFile() {
    const filePathTxt = path.join(__dirname, '../utilities/archivoPruebaSubida.txt');
    await this.uploadFileInput.setInputFiles(filePathTxt);
  }

 

async submitForm() {
    await this.sendButton.click();
  }

}