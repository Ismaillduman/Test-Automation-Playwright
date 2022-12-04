const {test, expect} = require('@playwright/test');

test('First Playwright test', async({browser})=>{


const context= await browser.newContext();
const page= await context.newPage();
await page.goto('https://www.bequalified.de/');

});
test('Page Playwright test', async({page})=>{

// with 'only' keyword i can run only this test
    //const context= await browser.newContext(); // these are consist as a default in playwright
    //const page= await context.newPage();
    await page.goto('https://www.youtube.com/');
    console.log(await page.title()); 
    await expect(page).toHaveTitle('YouTube');
    });