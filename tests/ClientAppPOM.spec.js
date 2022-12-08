const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../POM/LoginPage.spec");
test("Client App login POM", async ({ page }) => {
  const username = "ismaildumann@web.de";
  const password="HKNclb8318.";
  
  const productsName = "zara coat 3";
  const products = page.locator(".card-body");
  const loginPage= new LoginPage(page);
  loginPage.goTo();
  loginPage.validLogin(username,password);
  

 

  await page.waitForLoadState("networkidle"); // for Server based Application
  //console.log(await products.first().textContent());
  console.log(await products.allTextContents());

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productsName) {
      //add to chart
      await products.nth(i).locator("text=  Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li[class*='even']").waitFor();
  const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text='Checkout'").click();
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
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
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
