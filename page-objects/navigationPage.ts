import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    readonly formLayoutMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toasrtMenuItem: Locator
    readonly tooltipsMenuItem: Locator

    constructor(page: Page){
        super(page)
        this.formLayoutMenuItem = page.getByText("Form Layouts");
        this.datePickerMenuItem = page.getByText('Datepicker');
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toasrtMenuItem = page.getByText("Toastr")
        this.tooltipsMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage()
    { 
        await this.selectGroupMenyItem('Forms');     
        await this.formLayoutMenuItem.click();
    }

    async datepickerPage()
    {
        await this.selectGroupMenyItem('Forms');
        await this.page.waitForTimeout(1000);
        await this.datePickerMenuItem.click();
    }

    async smartTablePage() 
    {
        await this.selectGroupMenyItem("Tables & Data");
        await this.smartTableMenuItem.click();
    }

    async toastrPage()
    {
        await this.selectGroupMenyItem("Modal & Overlays");    
        await this.toasrtMenuItem.click();
    }

    async tooltipPage()
    {
        await this.selectGroupMenyItem("Modal & Overlays");
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenyItem(groupItemTitle: string)
    {
        const groupMenuItem = this.page.getByTitle(groupItemTitle);

        const expendedState = await groupMenuItem.getAttribute('aria-expanded');

        if(expendedState == "false")
        {
            await groupMenuItem.click();
        }
    }
}