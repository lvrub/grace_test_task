import { Locator, Page, expect } from "playwright/test";

class BasePage {
    protected readonly page: Page;
    private readonly loading: Locator

    constructor(page: Page) {
        this.page = page;
        this.loading = this.page.locator("//div[@aria-label='animation']");
    }

    async waitForTimeOut(timeout = 2000) {
        await this.page.waitForTimeout(timeout)
    }

    async pageReload() {
        await this.page.reload()
    }

    async waitLoadingToBeHidden() {
        await (this.loading).waitFor({ state: "hidden" })

    }

    async waitForResponse(url: string) {
       return await this.page.waitForResponse(response => response.url().includes(url) && response.status() === 200);
    }


}

export default BasePage;