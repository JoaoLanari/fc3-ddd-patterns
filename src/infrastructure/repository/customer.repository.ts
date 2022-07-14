import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepositoryInterface from "../../domain/repository/costumer.repository.interface";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      state: entity.address.state,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
        state: entity.address.state,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    let foundCustomer;

    try {
      foundCustomer = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(foundCustomer.id, foundCustomer.name);
    const address = new Address(
      foundCustomer.street,
      foundCustomer.number,
      foundCustomer.city,
      foundCustomer.state,
      foundCustomer.zip
    );
    customer.changeAddress(address);
    return customer;
  }
  async findAll(): Promise<Customer[]> {
    const foundCustomers = await CustomerModel.findAll();
    const customers = foundCustomers
      .map((foundCustomer) => {
        const customer = new Customer(foundCustomer.id, foundCustomer.name);
        const address = new Address(
          foundCustomer.street,
          foundCustomer.number,
          foundCustomer.city,
          foundCustomer.state,
          foundCustomer.zip
        );
        customer.changeAddress(address);
        if (foundCustomer.active) {
          customer.activate();
        }
        return customer;
      })
      .filter((customer) => customer.isActive());
    return customers;
  }
}
