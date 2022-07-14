import Address from "./address";
import Customer from "./customer";

describe("Customer unit testes", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should throw error when changeName calls with empty string ", () => {
    const customer = new Customer("123", "John");
    expect(() => {
      customer.changeName("");
    }).toThrowError("Name is required");
  });

  it("should throw error when activate calls with empty address ", () => {
    const customer = new Customer("123", "John");
    expect(() => {
      customer.activate();
    }).toThrowError("Address is mandatory to activate an customer");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("John");
    expect(customer.name).toBe("John");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua um", 20, "123", "123", "123");
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua um", 20, "123", "123", "123");
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined and you activate a customer", () => {
    const customer = new Customer("123", "John");
    expect(() => {
      customer.activate();
    }).toThrowError("Address is mandatory to activate an customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "John");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
