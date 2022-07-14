import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Product service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("1", "Customer 1");
    const item1 = new OrderItem("i1", "Product 1", 10, "p1", 10);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });

  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "Product 1", 100, "p1", 1);
    const item2 = new OrderItem("2", "Product 2", 200, "p2", 2);

    const order1 = new Order("1", "c1", [item1]);
    const order2 = new Order("1", "c1", [item2]);

    const total = OrderService.getTotal([order1, order2]);

    expect(total).toBe(500);
  });
});
