class DashboardPage

{

constructor(page)
{
  this.products = page.locator(".card-body");
  this.productsText = page.locator(".card-body b");
  this.cart=page.locator("[routerlink*='cart']") ;
  this.page=page;
 
}

//custom method

async searchProductAddCart(productsName)
{
    await this.page.waitForLoadState("networkidle");
    //console.log(await products.first().textContent());
    console.log(await this.productsText.allTextContents());
  
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (await this.products.nth(i).locator("b").textContent() === productsName) {
        //add to chart
        await this.products.nth(i).locator("text=  Add To Cart").click();
        break;
      }
    }

}
async navigetToCart(){

    await this.cart.click();
}
}
module.exports= {DashboardPage};