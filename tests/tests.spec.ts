
import { expect } from 'playwright/test';
import { test } from '@fix';
import { Interface } from 'readline';
import { getAuthData } from 'utilities/jsonReader';

test.describe('test suit for testinng', () => {

 const authData = getAuthData(); 
 test.use({fix : {email:""}});
test.beforeEach( async ({loginPage})=> {

  await loginPage.openLoginPage();
  await loginPage.fillEmail(authData.email);
  await loginPage.fillPassword(authData.password);
  await loginPage.clickButoonLogIn()


})

test.afterEach(async ({page})=> {
await page.close();
})

test('verify total premium data', async ({ salesPage }) => {
  
  await salesPage.selectTab('Total Premium');
  await salesPage.clickSelectBrand();
  await salesPage.selectItemFromList('Stone Island');
  await salesPage.clickSelectYear();
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
  
  interface SalesData { 
    monthlySalesCounts: { [month: string]: number };
}

  await salesPage.selectTab('Number of Sales');
  await salesPage.clickSelectBrand();
  await salesPage.selectItemFromList('Pi');
  await salesPage.clickSelectYear()
  await salesPage.selectItemFromList('2023');
  await salesPage.clickSelectYear()
  await salesPage.selectItemFromList('2024');
  let response:any;
  let responseData:SalesData;
  try {
    response = await salesPage.waitForResponse('monthly-sales-counts');
    responseData = await response.json();
} catch (error) {
    console.error('Error parsing response JSON:', error);
} await salesPage.waitForTimeOut()
  await salesPage.compareScreenshotSalesChart('withData.png');
  await salesPage.pageReload()
  await salesPage.waitLoadingToBeHidden()
  await salesPage.verifySelectedBrandFilter('Pi');
  await salesPage.verifySelectedYearFilter('2024');
  await salesPage.verifyTabSelected('Number of Sales');

  //additionally verified data for every month from responce 
  // const responseData = await response.json();
  const monthlySalesCounts = responseData.monthlySalesCounts;
  const expectedSalesData = [35, 44, 84, 38, 0, 0, 0, 0, 0, 0, 0, 0];
  const actualSalesData = Object.values(monthlySalesCounts);
  expect(actualSalesData).toEqual(expectedSalesData);
});

});
