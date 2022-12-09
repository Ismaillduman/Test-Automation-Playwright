const {test, expect} = require('@playwright/test');
const {coustomtest} = require('../utils/test-base');
const {POMManager}= require('../POM/POMManager.spec');
//Json-->string ->js object
const dataset= JSON.parse(JSON.stringify(require("../utils/placaOrderTestData.json")));
//with the JSON.parse i convert json to javascript

for(const data of dataset){
test(` Client App login POM for ${data.productsName}`, async ({ page }) => {

  const poManager = new POMManager(page);
  
 
  
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(data.username,data.password);
  const dashboardPage=poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productsName);
  await dashboardPage.navigetToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productsName);
  await cartPage.Checkout();

 
 
 
  //await page.locator("text='Checkout'").click();
  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
  const dropDown = page.locator(".ta-results");
  await dropDown.waitFor();
  const optionsCount = await dropDown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropDown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropDown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText('Thankyou for the order.');
  const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();
  const rows= await page.locator("tbody tr"); 

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId =await rows.nth(i).locator('th').textContent();
    
    if(orderId.includes(rowOrderId)){
      await rows.nth(i).locator('button').first().click();
      break;
    }
    
  }
const orderIdDetails= await page.locator('.col-text').textContent();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
}
coustomtest(`Client App login POM`, async ({ page,testDataForOrder }) =>
{

  const poManager = new POMManager(page);
  
 
  
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
  const dashboardPage=poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productsName);
  await dashboardPage.navigetToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productsName);
  await cartPage.Checkout();
})
