const {test, expect}= require("@playwright/test");
test('Demo blaze login page', async({ browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginBtn = page.locator('#login2');
    const username= page.locator('#loginusername');
    const password= page.locator('#loginpassword');
    const loginPageBtn= page.locator("button[onclick='logIn()']");
    const cardTitle= page.locator('.card-title a');
    await page.goto("https://demoblaze.com/index.html");
    await loginBtn.click();
    //await username.click();
    await username.fill("username");
    //await password.click();
    await password.fill("password");
    await loginPageBtn.click();



    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.allTextContents());

});