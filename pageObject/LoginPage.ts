
import { Locator, Page, expect } from "playwright/test";
import BasePage from "./BasePage";


class LoginPage extends BasePage{

    constructor(page: Page) {
        super(page)
    }

    private getInputEmail(): Locator {
      return this.page.locator("//input[@id='login_email']");
    }

    private getInputPasssword(): Locator {
        return this.page.locator("//input[@id='login_password']");
      }

      private getButtonLogIn(): Locator {
        return this.page.locator("button[type='submit']");
      }

      async openLoginPage(){
        await this.page.goto('/');
      }

    async fillEmail() {
        await this.getInputEmail().fill(process.env.EMAIL)
    }

    async fillPassword() {
        await this.getInputPasssword().fill(process.env.PASSWORD)
    }

    async clickButoonLogIn() {
        await this.getButtonLogIn().click()
    }
}


export default LoginPage;