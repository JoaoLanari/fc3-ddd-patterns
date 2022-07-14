export default class Address {
  private _street: string = "";
  private _number: number = 0;
  private _city: string = "";
  private _state: string = "";
  private _zip: string = "";

  constructor(street: string, number: number, city: string, state: string, zip: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._zip = zip;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zip(): string {
    return this._zip;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number <= 0) {
      throw new Error("Number is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
    if (this._state.length === 0) {
      throw new Error("State is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Zip is required");
    }
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._city} - ${this._zip}`;
  }

}