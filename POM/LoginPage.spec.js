class LoginPage
{

constructor(page)
{
    this.page=page;
this.signButton= page.locator("[value='Login']");
this.userName=page.locator("#userEmail");
this.password=page.locator("#userPassword");

 
}

async goTo()
{
await this.page.goto("https://rahulshettyacademy.com/client/");


}

async validLogin(username,password){
await this.userName.type(username);
await this.password.type(password);
await this.signButton.click();
this.page.waitForLoadState("networkidle"); // for Server based Application
  //console.log(await products.first().textContent());

}
}
module.exports= {LoginPage};