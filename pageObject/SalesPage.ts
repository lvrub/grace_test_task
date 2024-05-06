import { Locator, Page, expect } from "playwright/test";
import BasePage from "./BasePage";


class SalesPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }


    private getSelectBrand(): Locator {
        return this.page.locator("//div[contains(@class, 'brandSelect')]");
    }

    private getSelectYear(): Locator {
        return this.page.locator("//div[@class='ant-select-selector']").nth(1);
    }

    private getTab(name: String): Locator {
        return this.page.locator(`//div[@role='tab' and .='${name}']`);
    }

    private getSelectList(): Locator {
        return this.page.locator("//div[@class='rc-virtual-list']")
    }

    private getChartSales(): Locator {
        return this.page.locator("//div[contains(@id, 'sales')]//canvas");
    }

    private getChartPremium(): Locator {
        return this.page.locator("//div[contains(@id, 'premium')]//canvas");
    }

    async selectTab(name: string) {
        await this.getTab(name).click()
    }

    async clickSelectBrand() {
        await this.getSelectBrand().click()
    }

    async clickSelectYear() {
        await this.getSelectYear().click()
    }

    async selectItemFromList(name: string) {
        await this.getSelectList().locator(`//*[@title='${name}']`).click()
    }

    async compareScreenshotPremiumChart(shapshotName: string) {
        await expect(this.getChartPremium()).toHaveScreenshot(shapshotName);
    }

    async compareScreenshotSalesChart(shapshotName: string) {
        await expect(this.getChartSales()).toHaveScreenshot(shapshotName);
    }

    async verifySelectedBrandFilter(item: string) {
        await expect(this.getSelectBrand().locator("//span[contains(@class,'selection-item')]")).toContainText(item);
    }

    async verifySelectedYearFilter(item: string) {
        await expect(this.getSelectYear().locator("//span[contains(@class,'selection-item')]")).toContainText(item);
    }

    async verifyTabSelected(tab: string) {
        expect(await this.getTab(tab).getAttribute("aria-selected")).toBeTruthy()
    }



}

export default SalesPage;