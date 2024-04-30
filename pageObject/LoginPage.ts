
import { Locator, Page, expect } from "playwright/test";
import BasePage from "./BasePage";


class LoginPage extends BasePage{

    constructor(page: Page) {
        super(page)
    }

    private getInputEmail(): Locator {
      return this.page.getByPlaceholder("Email");
    }

    private getInputPasssword(): Locator {
        return this.page.getByPlaceholder("Password");
      }

      private getButtonLogIn(): Locator {
        return this.page.getByRole("button");
      }

      async openLoginPage(){
        await this.page.goto('/');
      }

    async fillEmail(email: string) {
        await this.getInputEmail().fill(email)
    }

    async fillPassword(password: string) {
        await this.getInputPasssword().fill(password)
    }

    async clickButoonLogIn() {
        await this.getButtonLogIn().click()
    }
}


export default LoginPage;