const { test, expect } = require("@playwright/test");

test('Verify "All Books" link is visible', async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForSelector("nav.navbar");

  const allBooksLink = await page.$('a[href="/catalog"]');
  const isLinkVisible = await allBooksLink.isVisible();

  expect(isLinkVisible).toBe(true);
});

test('Verify "Login" button is visible', async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForSelector("nav.navbar");

  const loginButton = await page.$('a[href="/login"]');
  const isLoginButtonVisible = await loginButton.isVisible();

  expect(isLoginButtonVisible).toBe(true);
});

test('Verify "Register" button is visible', async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForSelector("nav.navbar");

  const registerButton = await page.$('a[href="/register"]');
  const isRegisterButtonVisible = await registerButton.isVisible();

  expect(isRegisterButtonVisible).toBe(true);
});

test('Verify that the "All Books" link is visible after user login', async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  const allBooksLink = await page.$('a[href="/catalog"]');
  const isAllBooksLinkVisible = await allBooksLink.isVisible();

  expect(isAllBooksLinkVisible).toBe(true);
});

test('Verify that the "My Books" link is visible after user login', async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  const myBooksLink = await page.$('a[href="/profile"]');
  const isMyBooksLinkVisible = await myBooksLink.isVisible();

  expect(isMyBooksLinkVisible).toBe(true);
});

test('Verify that the "Add Book" link is visible after user login', async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  const addBookLink = await page.$('a[href="/create"]');
  const isAddBookLinkVisible = await addBookLink.isVisible();

  expect(isAddBookLinkVisible).toBe(true);
});

test('Verify that the "User Email Address" link is visible after user login', async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  const userEmail = await page.$("span");
  const isUserEmailVisible = await userEmail.isVisible();

  expect(isUserEmailVisible).toBe(true);
});

test("Login with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  await page.$('a[href="/catalog"]');

  expect(page.url()).toBe("http://localhost:3000/catalog");
});

test("Submit login form with empty input fields", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$("a[href=/login]");
  expect(page.url()).toBe("http://localhost:3000/login");
});

test("Submit login form with empty email and valid password", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$("a[href=/login]");
  expect(page.url()).toBe("http://localhost:3000/login");
});

test("Submit login form with empty password and valid email", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$("a[href=/login]");
  expect(page.url()).toBe("http://localhost:3000/login");
});

test("Register with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.fill('input[name="repeat-pass"]', "123456");
  await page.click('input[type="submit"]');

  await page.$('a[href="/catalog"]');

  expect(page.url()).toBe("http://localhost:3000/catalog");
});

test("Register with empty fields", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe("http://localhost:3000/register");
});

test("Register with empty email", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="password"]', "123456");
  await page.fill('input[name="repeat-pass"]', "123456");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe("http://localhost:3000/register");
});

test("Register with empty password", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="repeat-pass"]', "123456");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe("http://localhost:3000/register");
});

test("Register with empty confirm password", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe("http://localhost:3000/register");
});

test("Register with different passwords", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "12345");
  await page.fill('input[name="repeat-pass"]', "123456");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Passwords don't match!");
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe("http://localhost:3000/register");
});

test("Add book with correct data", async ({ page }) => {
  page.goto("http://localhost:3000/login");

  page.fill('input[name="email"]', "peter@abv.bg");
  page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL("http://localhost:3000/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");

  await page.fill("#title", "Test Book");
  await page.fill("#description", "This is a test book description");
  await page.fill("#image", "https://example.com/book-image.jpg");
  await page.fill("#type", "Fiction");

  await page.click('#create-form input[type="submit"]');
  await page.waitForURL("http://localhost:3000/catalog");

  expect(page.url()).toBe("http://localhost:3000/catalog");
});

test("Add book with empty title field", async ({ page }) => {
  page.goto("http://localhost:3000/login");

  page.fill('input[name="email"]', "peter@abv.bg");
  page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL("http://localhost:3000/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");

  await page.fill("#description", "This is a test book description");
  await page.fill("#image", "https://example.com/book-image.jpg");
  await page.fill("#type", "Fiction");
  await page.click('#create-form input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$('a[href="/create"]');

  expect(page.url()).toBe("http://localhost:3000/create");
});

test("Add book with empty description field", async ({ page }) => {
  page.goto("http://localhost:3000/login");

  page.fill('input[name="email"]', "peter@abv.bg");
  page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL("http://localhost:3000/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");

  await page.fill("#title", "Test Book");
  await page.fill("#image", "https://example.com/book-image.jpg");
  await page.fill("#type", "Fiction");
  await page.click('#create-form input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$('a[href="/create"]');

  expect(page.url()).toBe("http://localhost:3000/create");
});

test("Add book with empty confirm password field", async ({ page }) => {
  page.goto("http://localhost:3000/login");

  page.fill('input[name="email"]', "peter@abv.bg");
  page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL("http://localhost:3000/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");

  await page.fill("#description", "This is a test book description");
  await page.fill("#image", "https://example.com/book-image.jpg");
  await page.fill("#type", "Fiction");
  await page.click('#create-form input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$('a[href="/create"]');

  expect(page.url()).toBe("http://localhost:3000/create");
});

test("Add book with empty image field", async ({ page }) => {
  page.goto("http://localhost:3000/login");

  page.fill('input[name="email"]', "peter@abv.bg");
  page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL("http://localhost:3000/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");

  await page.fill("#title", "Test Book");
  await page.fill("#description", "This is a test book description");
  await page.fill("#type", "Fiction");
  await page.click('#create-form input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.accept();
  });

  await page.$('a[href="/create"]');

  expect(page.url()).toBe("http://localhost:3000/create");
});

test("Login and verify all books are displayed", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL("http://localhost:3000/catalog"),
  ]);

  await page.waitForSelector(".dashboard");

  const bookElements = await page.$$(".other-books-list li");

  expect(bookElements.length).toBeGreaterThan(0);
});

test("Login and navigate to Details page", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL("http://localhost:3000/catalog"),
  ]);

  await page.click('a[href="/catalog"]');
  await page.waitForSelector(".otherBooks");

  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");

  const detailsPageTitle = await page.textContent(".book-information h3");

  expect(detailsPageTitle).toBe("Test Book");
});

test("Guest user can see and use Details page", async ({ page }) => {
  page.goto("http://localhost:3000/catalog");

  await page.click('a[href="/catalog"]');
  await page.waitForSelector(".otherBooks");

  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");

  const detailsPageTitle = await page.textContent(".book-information h3");

  expect(detailsPageTitle).toBe("Test Book");
});

test("Verify if display info is correct", async ({ page }) => {
  page.goto("http://localhost:3000/catalog");

  await page.click('a[href="/catalog"]');
  await page.waitForSelector(".otherBooks");

  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");

  const detailsPageTitle = await page.textContent(".book-information h3");

  expect(detailsPageTitle).toBe("Test Book");
});
