import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit testes", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 2, "p1", 2);
    const item2 = new OrderItem("2", "Item 2", 5, "p2", 2);
    const order = new Order("123", "123", [item1, item2]);
    expect(order.total()).toBe(14);
  });

  it("should throw erro if item quantity is less or equals zero", () => {
    expect(() => {
      const item1 = new OrderItem("1", "Item 1", 2, "p1", 0);
      new Order("123", "123", [item1]);
    }).toThrowError("Quantity must be greater than 0");
  });
});
