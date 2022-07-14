import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("CustomerRepository - Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John");

    const address = new Address("Rua 1", 10, "BH", "MG", "30303000");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const foundCustomer = await CustomerModel.findOne({ where: { id: "1" } });
    expect(foundCustomer.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      state: address.state,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John");

    const address = new Address("Rua 1", 10, "BH", "MG", "30303000");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName("John Doe");
    customer.addRewardPoints(100);
    const address2 = new Address("Rua 2", 20, "BH", "MG", "30303001");
    customer.changeAddress(address2);

    await customerRepository.update(customer);

    const foundCustomer = await CustomerModel.findOne({ where: { id: "1" } });
    expect(foundCustomer.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: address2.street,
      number: address2.number,
      zip: address2.zip,
      city: address2.city,
      state: address2.state,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John");

    const address = new Address("Rua 1", 10, "BH", "MG", "30303000");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find("1");

    expect(foundCustomer).toStrictEqual(customer);
  });

  it("should throw an error when customer not found", async () => {
    const customerRepository = new CustomerRepository();
    await expect(customerRepository.find("1")).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "John");
    const address = new Address("Rua 1", 10, "BH", "MG", "30303000");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const customer2 = new Customer("2", "Maria");
    const address2 = new Address("Rua 2", 20, "BH", "MG", "30303001");
    customer2.changeAddress(address2);
    customer2.activate();
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();

    expect(foundCustomers).toContainEqual(customer);
    expect(foundCustomers).toContainEqual(customer2);
  });
});
