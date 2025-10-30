import { Page } from "@playwright/test";

export class HelperBase {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNumberOfSecond(timeout:number) {
    await this.page.waitForTimeout(timeout * 60)
  }
}