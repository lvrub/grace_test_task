import { test as baseTest } from "playwright/test";
import LoginPage from "../pageObject/LoginPage";
import SalesPage from '../pageObject/SalesPage';

type MyFixture = {
  email: string;
};

export const test = baseTest.extend <{
  fix: MyFixture;
  loginPage: LoginPage;
  salesPage: SalesPage;
}> ({
  fix: {email: undefined},
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  salesPage: async ({ page }, use) => {
    await use(new SalesPage(page));
  }
  
});

