import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change de prices of all products", () => {
    const product = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 20);
    const products = [product, product2];

    ProductService.increasePrices(products, 100);

    expect(product.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
