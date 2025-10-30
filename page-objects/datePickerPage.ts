import { Page, expect } from "@playwright/test";

export class DatePickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectCommonDatePickerDateFromToday(numberFromDaysFromToday: number) {
    var calendarInputField = this.page.getByPlaceholder("Form Picker");

    calendarInputField.click();

    var dateToAssert = await this.selectDateInCalendar(numberFromDaysFromToday);

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  async selectDatepickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number
  ) {
    var calendarInputField = this.page.getByPlaceholder("Range Picker");

    calendarInputField.click();
    var startDateToAssert = await this.selectDateInCalendar(startDayFromToday);
    var endDateToAssert = await this.selectDateInCalendar(endDayFromToday);

    await expect(calendarInputField).toHaveValue(
      `${startDateToAssert} - ${endDateToAssert}`
    );
  }

  private async selectDateInCalendar(numberFromDaysFromToday: number) {
    let date = new Date();

    date.setDate(date.getDate() + numberFromDaysFromToday);

    const expectedDate = date.getDate().toString();
    var expectedMonth = date.toLocaleString("En-US", { month: "short" });
    var expectedYear = date.getFullYear();

    let calenderMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = ` ${date.toLocaleString("En-US", {
      month: "long",
    })} ${expectedYear} `;

    while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();

      calenderMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator('.day-cell.ng-star-inserted')
      .getByText(expectedDate, { exact: true }).nth(0)
      .click();

    return `${expectedMonth} ${expectedDate}, ${expectedYear}`;
  }
}
