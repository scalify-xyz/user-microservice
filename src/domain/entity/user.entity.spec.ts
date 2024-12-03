import { User } from "./user.entity";

describe("User", () => {

  it("should create a new user with the correct properties", () => {
    const name = "John Doe";
    const email = "john.doe@example.com";
    const password = "password123";
    
    const user = User.create(name, email, password);
    
    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    expect(user.isAccountConfirmed).toBe(false);
    expect(user.id).toBeDefined();
  });

  it("should create a user with specific properties using with()", () => {
    const userProps = {
      id: "12345",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password123",
      isAccountConfirmed: true,
    };
    
    const user = User.with(userProps);
    
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(userProps.id);
    expect(user.name).toBe(userProps.name);
    expect(user.email).toBe(userProps.email);
    expect(user.password).toBe(userProps.password);
    expect(user.isAccountConfirmed).toBe(userProps.isAccountConfirmed);
  });

  it("should not allow modification of user properties", () => {
    const user = User.create("Alice", "alice@example.com", "password");
    
    expect(() => { user.name = "New Name"; }).toThrow();
    expect(user.name).toBe("Alice");
  });

});
