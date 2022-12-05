const {test, expect}= require("@playwright/test");
test.only('Client App login', async({ browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginBtn = page.locator("[value='Login']");
    const username= page.locator('#userEmail');
    const password= page.locator('#userPassword');
    
    const cardTitle= page.locator('.card-body b');
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('networkidle'); // for Server based Application
    await username.type("ismaildumann@web.de");
    await password.fill("HKNclb8318.");
    await loginBtn.click();
 
    
  



    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.allTextContents());

});