const { test, expect } = require("@playwright/test");

test.only("First Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("#username");
  const password = page.locator("#password");
  const SinginBttn = page.locator("#signInBtn");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await username.type("ismailduman");
  await password.type("ismail");
  await SinginBttn.click();
  console.log(
    await page.locator(".alert.alert-danger.col-md-12").textContent()
  );
  await expect(page.locator(".alert.alert-danger.col-md-12")).toContainText(
    "Incorrect username/password."
  );
  //type - fill
  await username.fill("");
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await SinginBttn.click();

  console.log(await page.locator('.card-body a').first().textContent());
  console.log(await page.locator('.card-body a').nth(1).textContent());
  console.log(await page.locator('.card-body a').nth(2).textContent());
  console.log(await page.locator('.card-body a').last().textContent());

});
test("Page Playwright test", async ({ page }) => {
  // with 'only' keyword i can run only this test
  //const context= await browser.newContext(); // these are consist as a default in playwright
  //const page= await context.newPage();
  await page.goto("https://www.youtube.com/");
  console.log(await page.title());
  await expect(page).toHaveTitle("YouTube");
});
