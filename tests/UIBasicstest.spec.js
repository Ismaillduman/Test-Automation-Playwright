const { test, expect, request } = require("@playwright/test");
//normaly in config file we can not run inviduel tests as paralel
//but that can be able to configüre
test.describe.configure({mode: 'parallel'});
test("@web First Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
 // page.route('**/*.{jpg,png,jpeg}', route=> route.abort());
  const username = page.locator("#username");
  const password = page.locator("#password");
  const SinginBttn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  page.on('request', request=> console.log(request.url()));
  page.on('response', response=> console.log(response.url(),"|", response.status()));


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
  await Promise.all([
    page.waitForNavigation(), // thats for non server based application
    SinginBttn.click(),
  ]);

  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  console.log(await cardTitles.nth(2).textContent());
  console.log(await cardTitles.last().textContent());
});
test("@web UI Controls", async ({ page }) => {
  const username = page.locator("#username");
  const password = page.locator("#password");
  const SinginBttn = page.locator("#signInBtn");
  const dropDownBox = page.locator("select.form-control");
  const radioBtn = page.locator(".radiotextsty");
  const popup = page.locator("#okayBtn");
  const checkBox = page.locator("#terms");
  const documentLink = page.locator("[href*= 'documents-request']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await dropDownBox.selectOption("consult");
  await radioBtn.last().click();
  await popup.click();

  await checkBox.click();
  await expect(checkBox).toBeChecked();
  await checkBox.uncheck();
  expect(await checkBox.isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  //documentLink.click();
});

//to handel child web page on a new tab create a new test block and a newPage

test("@web Child Webpage", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*= 'documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = await newPage.locator(".im-para.red").textContent();
  //console.log(text);
  //out put

  //Please email us at mentor@rahulshettyacademy.com with below template to receive response

  const arrayText = await text.split("@");
  const domain = await arrayText[1].split(" ")[0];
  await page.locator("#username").type(domain);
  //await page.pause();
  console.log(await page.locator("#username").textContent());
});
