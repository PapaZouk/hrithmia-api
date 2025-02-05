import Timesheet, { ITimesheet } from "../../../src/model/ITimesheet.ts";
import { assertEquals } from "jsr:@std/assert";
import { assertInstanceOf } from "https://deno.land/std/assert/assert_instance_of.ts";
import mapResponseToTimesheet from "../../../src/mapper/mapResponseToTimesheet.ts";
import mongoose from "mongoose";

Deno.test("given data should map to Timesheet instance", () => {
  // Arrange
  const id = "60d5ec49b3c0a12d74c3f543";
  const data = {
    _id: id,
    employeeId: id,
    year: 2021,
    month: 1,
    totalHours: new mongoose.Types.Decimal128("10"),
    totalBalance: new mongoose.Types.Decimal128("5"),
    days: [
      {
        day: 1,
        hours: 8,
        checkIn: new Date(),
        checkOut: new Date(),
        balance: 9,
        dayOff: {
          isDayOff: true,
          isHoliday: true,
          isPaid: true,
          type: "type",
        },
        sickLeave: {
          isSickLeave: true,
        },
      },
    ],
  };

  // Act
  const timesheet = mapResponseToTimesheet(data as unknown as ITimesheet);

  // Assert
  assertInstanceOf(timesheet, Timesheet);
  assertEquals(timesheet.employeeId.toString(), id);
  assertEquals(timesheet.year, 2021);
  assertEquals(timesheet.month, 1);
  assertEquals(timesheet.totalHours.toString(), "10");
  assertEquals(timesheet.totalBalance.toString(), "5");
  assertEquals(timesheet.days.length, 1);
  assertEquals(timesheet.days[0].day, 1);
  assertEquals(timesheet.days[0].hours.toString(), "8");
  assertEquals(timesheet.days[0].dayOff.isDayOff, true);
  assertEquals(timesheet.days[0].sickLeave.isSickLeave, true);
});
