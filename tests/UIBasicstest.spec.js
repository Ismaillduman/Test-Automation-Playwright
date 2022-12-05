const {test, expect} = require('@playwright/test');

test.only('First Playwright test', async({browser})=>{


const context= await browser.newContext();
const page= await context.newPage();
await page.goto('https://sso.teachable.com/secure/9521/identity/login/password');

await page.locator('#email').type('ismailduman');
await page.locator("[name='password']").type('ismail');
await page.locator("input[value='Log in']").click();
console.log(await page.locator('.text-with-icon').textContent());
await expect(page.locator('.text-with-icon')).toContainText('Your email or password is incorrect.');


});
test('Page Playwright test', async({page})=>{

// with 'only' keyword i can run only this test
    //const context= await browser.newContext(); // these are consist as a default in playwright
    //const page= await context.newPage();
    await page.goto('https://www.youtube.com/');
    console.log(await page.title()); 
    await expect(page).toHaveTitle('YouTube');
    });