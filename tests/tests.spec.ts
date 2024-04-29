
import { test, expect } from 'playwright/test';
import LoginPage from './pageObject/LoginPage';
import SalesPage from './pageObject/SalesPage';

let salesPage : SalesPage;

test.describe('test suit for testinng', () => {

test.beforeEach( async ({page})=> {
  let loginPage = new LoginPage(page);
  salesPage = new SalesPage(page);

  await page.goto('/');
  await loginPage.fillEmail();
  await loginPage.fillPassword();
  await loginPage.clickButoonLogIn()

})

test('verify total premium data', async ({ page }) => {
  
  await salesPage.selectTab('Total Premium');
  await salesPage.clickSelectBrand();
  await salesPage.selectItemFromList('Stone Island');
  await salesPage.clickSelectYear()
  await salesPage.selectItemFromList('2023');
  //here I have an error "Error fetching premium data"
  await salesPage.waitForTimeOut()
  await salesPage.compareScreenshotPremiumChart('emptyChart.png');
  await salesPage.pageReload()
  await salesPage.waitLoadingToBeHidden()
  await salesPage.verifySelectedBrandFilter('Stone Island');
  await salesPage.verifySelectedYearFilter('2023');
  await salesPage.verifyTabSelected('Total Premium');

});

test('verify number of sales data', async ({ page }) => {

  await salesPage.selectTab('Number of Sales');
  await salesPage.clickSelectBrand();
  await salesPage.selectItemFromList('Pi');
  await salesPage.clickSelectYear()
  await salesPage.selectItemFromList('2023');
  await salesPage.clickSelectYear()
  await salesPage.selectItemFromList('2024');
  let response = await page.waitForResponse(response => 
    response.url().includes('monthly-sales-counts') && response.status() === 200);
  await salesPage.waitForTimeOut()
  await salesPage.compareScreenshotSalesChart('withData.png');
  await salesPage.pageReload()
  await salesPage.waitLoadingToBeHidden()
  await salesPage.verifySelectedBrandFilter('Pi');
  await salesPage.verifySelectedYearFilter('2024');
  await salesPage.verifyTabSelected('Number of Sales');

  //additionally verified data for evry month from responce 
  const responseData = await response.json();
  const monthlySalesCounts = responseData.monthlySalesCounts;
  const expectedSalesData = [35, 44, 84, 38, 0, 0, 0, 0, 0, 0, 0, 0];
  const actualSalesData = Object.values(monthlySalesCounts);
  expect(actualSalesData).toEqual(expectedSalesData);
});

});
