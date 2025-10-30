import { expect, mergeExpects, test } from '@playwright/test';
import { delayWhen } from 'rxjs-compat/operator/delayWhen';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200');
})

test.describe("Form layout page", () => {
    test.beforeEach(async ({page}) => {
        await page.getByText("Forms").click();    
        await page.getByText("Form layouts").click();
    })

    test('input fields', async ({page}) => { 
        const usingTheGridEmail = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"})

        await usingTheGridEmail.fill("test@test.com");

        await usingTheGridEmail.clear();

        await usingTheGridEmail.pressSequentially("test@test2.com", {delay:500})

        const inputValue = await usingTheGridEmail.inputValue();

        expect(inputValue).toEqual("test@test2.com");

        await expect(usingTheGridEmail).toHaveValue("test@test2.com");
    })


    test('radio but', async ({page}) => { 
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})


       //await usingTheGridForm.getByLabel('Option 1').check({force: true});

        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true});

        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked();
        expect(radioStatus).toBeTruthy();
        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked()


        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true});
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy();
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy();
    })  

})

test("checkboxes", async ({page}) => {
    await page.getByText("Modal & Overlays").click();    
    await page.getByText("Toastr").click();

    await page.getByRole('checkbox', {name : "Hide on click"}).check({force:true})


    const allBoxes = page.getByRole('checkbox');

    for(const box of await allBoxes.all())
    {
        await box.check({force:true})
        expect(box.isChecked).toBeTruthy()
    }
})

test("lists", async ({page}) =>{
    const dropdownMenu = page.locator('ngx-header nb-select');
    await dropdownMenu.click();

    page.getByRole('list');


    //const optionList = page.getByRole('list').locator('nb-option')

    const optionList = page.locator('nb-option-list nb-option');

    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

    await optionList.filter({hasText:"Cosmic"}).click();

    const header = page.locator('nb-layout-header');

    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
})


test("tooltips", async ({page}) => {
    page.getByText("Modal & Overlays").click();
    page.getByText('Tooltip').click()

    var tools = page.locator('nb-card', {hasText:"Tooltip Placements"})
    await tools.getByRole('button', {name:"Top"}).hover()

    page.locator
    var tooltip = await page.locator('nb-tooltip').textContent()

    expect(tooltip).toEqual("This is a tooltip")
})


test("dialogbox", async ({page}) => {
    await page.getByText("Tables & Data").click();
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');

        dialog.accept();
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click();

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
});

test("tables", async ({page}) => {
    await page.getByText("Tables & Data").click();
    await page.getByText('Smart Table').click()

    var row = page.getByRole('row', {name: "twitter@outlook.com"})

    await row.locator('.nb-edit').click();

    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('36')
    await page.locator('.nb-checkmark').click()

    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()

    const targetRowById = page.getByRole('row').filter({has: page.locator('td').nth(1).getByText('11')})

    await targetRowById.locator('.nb-edit').click();

    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@tes.com')
    await page.locator('.nb-checkmark').click()

    const ages = ['20', '30', '40', '200']

    for(let age of ages)
    {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        const ageRows = page.locator('tbody tr')

        await page.waitForTimeout(500)

        for (let row of await ageRows.all())
        {
            const cellValue = await row.locator('td').last().textContent()

            if (age == "200")
            {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
                continue
            }

            expect(cellValue).toEqual(age)
        }

    }
});


test('datepicker' , async ({page}) => {
    await page.getByText("Forms").click();  
    await page.getByText('Datepicker').click();

    var calendarInputField = page.getByPlaceholder('Form Picker')

    calendarInputField.click()

    let date = new Date()

    date.setDate(date.getDate() + 14)

    const expectedDate = date.getDate().toString()
    var expectedMonth = date.toLocaleString('En-US', {month:'short'})
    var expectedYear = date.getFullYear()

    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${date.toLocaleString('En-US', {month:'long'})} ${expectedYear} `;

    while(!calenderMonthAndYear.includes(expectedMonthAndYear))
    {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();

        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }



    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click()

    await expect(calendarInputField).toHaveValue(`${expectedMonth} ${expectedDate}, ${expectedYear}`)
    
})


test('sliders', async ({page}) => {
    // var tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

    // await tempGauge.evaluate(node => {
    //     node.setAttribute('cx', '232.630')
    //     node.setAttribute('cy', '232.630')
    // })

    // await tempGauge.click()

    var tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')

    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()

    const x = box.x + box.width / 2
    const y = box.y + box.height / 2

    await page.mouse.move(x, y)

    await page.mouse.down()

    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)

    await page.mouse.up()

    await expect(tempBox).toContainText('30')
})