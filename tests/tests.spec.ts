
import { expect } from 'playwright/test';
import { test } from '@fix';

test.describe('test suit for testinng', () => {

test.beforeEach( async ({loginPage})=> {

  await loginPage.openLoginPage();
  await loginPage.fillEmail(process.env.EMAIL);
  await loginPage.fillPassword(process.env.PASSWORD);
  await loginPage.clickButoonLogIn()


})

test('verify total premium data', async ({ salesPage }) => {
  
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

test('verify number of sales data', async ({ salesPage }) => {

  await salesPage.selectTab('Number of Sales');
  await salesPage.clickSelectBrand();
  await salesPage.selectItemFromList('Pi');
  await salesPage.clickSelectYear()
  await salesPage.selectItemFromList('2023');
  await salesPage.clickSelectYear()
  await salesPage.selectItemFromList('2024');
  let response = await salesPage .waitForResponse('monthly-sales-counts');
  await salesPage.waitForTimeOut()
  await salesPage.compareScreenshotSalesChart('withData.png');
  await salesPage.pageReload()
  await salesPage.waitLoadingToBeHidden()
  await salesPage.verifySelectedBrandFilter('Pi');
  await salesPage.verifySelectedYearFilter('2024');
  await salesPage.verifyTabSelected('Number of Sales');

  //additionally verified data for every month from responce 
  const responseData = await response.json();
  const monthlySalesCounts = responseData.monthlySalesCounts;
  const expectedSalesData = [35, 44, 84, 38, 0, 0, 0, 0, 0, 0, 0, 0];
  const actualSalesData = Object.values(monthlySalesCounts);
  expect(actualSalesData).toEqual(expectedSalesData);
});

});
