import { Page, Locator} from "@playwright/test";
import { Waits } from "../utilities/waits";

export class BasePage {
    readonly page: Page;
    private readonly waits: Waits;

    constructor(page: Page) {
        this.page = page;
        this.waits = new Waits(page);
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async open() {
        await this.goto('/');
        await this.waitForPageLoad();
    }

    async waitForPageLoad() {
        await this.waits.waitForPageLoad();
    }

      async waitForVisible(locator: Locator): Promise<void> {
    await this.waits.waitForVisible(locator);
  }

  /** @internal Lo creo para para debugging local, no para usar en suite final. */
  async waitStaticDebug(seconds: number): Promise<void> {
    await this.waits.waitStaticDebug(seconds);
  }




}