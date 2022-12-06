const{test,expect}= require("@playwright/test");

test.only('Moe validation',async({page}) =>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

await expect( page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
//await page.pause();

page.on('dialog', dialog => dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator('#mousehover').hover();

// iframe

const framespage = page.frameLocator("#courses-iframe");
await framespage.locator("li a[href*='lifetime-access']").first().click();
const textCheck= await framespage.locator('.text h2').textContent();

 console.log(textCheck.split(" ")[1]);


}
);