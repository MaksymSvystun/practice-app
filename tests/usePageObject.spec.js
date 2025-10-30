import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200');
})


test('navigate to form page', async ({page}) =>{

    const navTo = new NavigationPage(page)

    await navTo.formLayoutsPage()

})

test('param method', async ({page}) =>{
    const navTo = new NavigationPage(page)
    const onFormLayoutPage = new FormLayoutsPage(page)
    await navTo.formLayoutsPage();
    await onFormLayoutPage.submitUsingTheGridFormWithCredsAndSelectOptions("tst@re.com", 'test', 'Option 1')
})

test('datepicker', async ({page})=>{
    const navTo = new NavigationPage(page)
    const datepicker = new DatePickerPage(page)

    await navTo.datepickerPage();

    await datepicker.selectDatepickerWithRangeFromToday(6, 10)
})