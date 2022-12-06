const { test, expect } = require("@playwright/test");
test.only("Client App login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const email = "ismaildumann@web.de";
  const orderID= page.locator(".em-spacer-1 .ng-star-inserted");
  const loginBtn = page.locator("[value='Login']");
  const username = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const productsName = "zara coat 3";
  const products = page.locator(".card-body");
  const addCart = page.locator("text=  Add To Cart");
  await page.goto("https://rahulshettyacademy.com/client/");

  await username.type("ismaildumann@web.de");
  await password.fill("HKNclb8318.");
  await loginBtn.click();

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
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText('Thankyou for the order.');
  const OrderIdNumber= orderID.textContent();
  console.log(OrderIdNumber);

  await page.locator("button[routerlink*='myorders']").click();
  const rows= await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId =await rows.nth(i).locator('th').textContent();
    if(orderID.includes(rowOrderId)){
      await rows.nth(i).locator('button').first().click();
      break;
    }
    
  }


});
