describe("Authentication Tests", () => {
  let testUser;

  beforeEach(() => {
    const randomSuffix = Math.floor(Math.random() * 1000000);
    
    testUser = {
      username: `testuser${randomSuffix}`,
      email: `testuser${randomSuffix}@example.com`,
      password: "testpass123",
    };

    cy.visit("/");
  });

  it("should register a new user", () => {
    cy.visit("/register");
    cy.get('[data-cy="username-input"]').type(testUser.username);
    cy.get('[data-cy="email-input"]').type(testUser.email);
    cy.get('[data-cy="password-input"]').type(testUser.password);
    cy.get('[data-cy="register-button"]').click();

    cy.url().should("include", "/login");
  });

  it("should login with valid credentials", () => {
    // First register the user
    cy.register(testUser.username, testUser.email, testUser.password);

    // Then login
    cy.login(testUser.email, testUser.password);

    cy.get('[data-cy="dashboard"]').should("contain", "Welcome");
  });

  it("should show error for invalid credentials", () => {
    cy.visit("/login");

    cy.get('[data-cy="email-input"]').type("wrong@example.com");
    cy.get('[data-cy="password-input"]').type("wrongpass");
    cy.get('[data-cy="login-button"]').click();

    // Wait for loading to finish (button text changes back)
    cy.get('[data-cy="login-button"]').should("not.contain", "Logging in...");

    // Then check for error with increased timeout
    cy.get('[data-cy="error-message"]', { timeout: 15000 })
      .should("be.visible")
      .and("not.be.empty");
  });

  it("should logout successfully", () => {
    cy.register(testUser.username, testUser.email, testUser.password);
    cy.login(testUser.email, testUser.password);

    cy.get('[data-cy="logout-button"]', { timeout: 15000 })
      .should("be.visible")
      .click();
    cy.url().should("include", "/login");
    
  });
});
