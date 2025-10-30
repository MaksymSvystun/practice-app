import { expect, mergeExpects, test } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText("Button Triggering AJAX Request").click();
})

test("auto waiting", async ({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click();

    // await successButton.waitFor({state:"attached"})
    // var text = await successButton.allTextContents();
    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout:20000})
})

test('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    //await page.waitForSelector('.bg-success');

    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    await page.waitForLoadState('networkidle')

    var text = await successButton.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.')
})


test('timeouts', async ({page}) => {

    test.slow()
    const successButton = page.locator('.bg-success');

    await successButton.click();

})