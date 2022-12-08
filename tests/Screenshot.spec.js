const{test,expect}= require("@playwright/test");

test('Moe validation',async({page}) =>{

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

test('Screenshot and Visual comparision',async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await expect( page.locator("#displayed-text")).toBeVisible();
    //partial screensjot locator level
    await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    // whole screen sjotpage level
    await page.screenshot({path: 'screenshot.png'});

    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
});  

test('visual',async({page})=>

{

await page.goto('https://www.lufthansa.com/de/de/homepage');
expect(await page.screenshot()).toMatchSnapshot('landing.png');


}

);
