import { expect, test } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200');
    await page.getByText("Forms").click();    
    await page.getByText("Form layouts").click();
})

test('Locator syntax rules', async ({page}) => {
    // by tag name
    page.locator('input')

    // by Id
    await page.locator('#inputEmail1').click();

    // by class 
    page.locator('.shape-rectangle')

    // by attribute
    page.locator('[placeholder="Email"]')

    //by class full value
    page.locator('[class="......."]')

    // combine
    page.locator('input[placeholder="Email"].shape-rectangle')

    page.locator('//*[@id="inputEmail1"]')

    page.locator(':text("Using")')

    page.locator(':text-is("Using the Grid")')
}); 

test("User facing locator", async ({page}) =>{
    await page.getByRole('textbox', {name: "Email"}).first().click();
    await page.getByRole('button', {name: "Sign in"}).first().click();

    await page.getByLabel('Email').first().click();

    await page.getByPlaceholder('Jane Doe').click();

    await page.getByText('Using the Grid').click();

    await page.getByTestId('SignIn').click();
});


test("Locating child element", async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();

    await page.locator('nb-card').nth(3).getByRole('button').click()
});

test('locating parent element', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click();

    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name:"Email"}).click();

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name:"Password"}).click();

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole('textbox', {name:"Password"}).click();

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click();
});

test('Reusing locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const emailField = basicForm.getByRole('textbox', {name:"Email"});

    await emailField.fill('test@test.com');
    await basicForm.getByRole('textbox', {name:"Password"}).fill('Welcome123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    await expect(emailField).toHaveValue('test@test.com')
});

test('Extract values', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const buttonText = await basicForm.locator('button').textContent();

    expect(buttonText).toEqual("Submit");

    // all text values

    const allRadioButtonValue = await page.locator('nb-radio').allTextContents();

    expect(allRadioButtonValue).toContain("Option 1")

    //input value

     const emailField = basicForm.getByRole('textbox', {name:"Email"});

     await emailField.fill('test@test.com')

     const emailValue = await emailField.inputValue();

     expect(emailValue).toEqual("test@test.com")

});

test('assertions', async ({page}) => {
    const basicFormBut = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');



    const value = 5;

    expect(value).toEqual(5);

    const text = await basicFormBut.textContent();
    expect(text).toEqual('Submit')

    await expect(basicFormBut).toHaveText("Submit")

    await expect.soft(basicFormBut).toHaveText('Submit')

    await basicFormBut.click();
})
 