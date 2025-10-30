import { Page } from "@playwright/test";


export class FormLayoutsPage
{
    private readonly page: Page;

    constructor(page: Page)
    {
        this.page = page
    }
 
    async submitUsingTheGridFormWithCredsAndSelectOptions(email: string, password: string, optionText: string)
    {
        const usingTheGrid = this.page.locator('nb-card', {hasText: "Using the Grid"})

        await usingTheGrid.getByRole('textbox', {name:"Email"}).fill(email);
        await usingTheGrid.getByRole('textbox', {name:"Password"}).fill(password);
        await usingTheGrid.getByRole('radio', {name: optionText}).check({force: true});
        await usingTheGrid.getByRole('button').click();

    }
}