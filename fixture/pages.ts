import { test as baseTest } from "playwright/test";
import LoginPage from "../pageObject/LoginPage";
import SalesPage from '../pageObject/SalesPage';

const test = baseTest.extend<{
  loginPage: LoginPage;
  salesPage: SalesPage;
}> ({
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  salesPage: async ({ page }, use) => {
    await use(new SalesPage(page));
  }
  
});

export { test }