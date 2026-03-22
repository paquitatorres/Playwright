import { Page, Locator } from "@playwright/test";

export class Waits {
  constructor(public page: Page) {}

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "visible" });
  }

   /** @internal */
   
  async waitStaticDebug(seconds: number): Promise<void> {
    await this.page.waitForTimeout(seconds * 1000);
  }
}