import { createTimesheet } from "../_mocks/createTimesheet.ts";
import { timesheetValidator } from "../../../src/validators/timesheetValidator.ts";
import { assertEquals } from "jsr:@std/assert";
import mongoose, { Decimal128 } from "mongoose";

Deno.test("given data object should parse it with the timesheet schema, validate and return true", () => {
  const timesheetData = createTimesheet();

  const result = timesheetValidator(timesheetData);

  assertEquals(result, true);
});

Deno.test("given a data object with missing employeeId should validate and return false", () => {
  const timesheetData = createTimesheet({ employeeId: "" });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object with missing year should validate and return false", () => {
  const timesheetData = createTimesheet({ year: 0 });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object with missing month should validate and return false", () => {
  const timesheetData = createTimesheet({ month: 0 });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object with missing totalHours should validate and return false", () => {
  const totalHours: Decimal128 = new mongoose.Schema.Types.Decimal128("8");
  const timesheetData = createTimesheet({ totalHours: totalHours });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object with missing totalBalance should validate and return false", () => {
  const totalBalance: Decimal128 = new mongoose.Schema.Types.Decimal128("0");
  const timesheetData = createTimesheet({ totalBalance: totalBalance });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object with missing days should validate and return true", () => {
  const timesheetData = createTimesheet({ days: [] });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, true);
});

Deno.test("given a data object has a day with missing day should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: null as unknown as number,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: false,
          isHoliday: false,
          isPaid: false,
          type: "none",
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with missing hours should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: null as unknown as Decimal128,
        checkIn: "08:00",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: false,
          isHoliday: false,
          isPaid: false,
          type: "none",
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with missing checkIn should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: false,
          isHoliday: false,
          isPaid: false,
          type: "none",
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with missing checkOut should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: false,
          isHoliday: false,
          isPaid: false,
          type: "none",
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with missing balance should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "16:00",
        balance: null as unknown as Decimal128,
        dayOff: {
          isDayOff: false,
          isHoliday: false,
          isPaid: false,
          type: "none",
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with missing dayOff should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {} as unknown as {
          isDayOff: boolean;
          isHoliday: boolean;
          isPaid: boolean;
          type: string;
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with dayOff when isDayOff is missing should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: null as unknown as boolean,
          isHoliday: false,
          isPaid: false,
          type: "none",
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with dayOff when isHoliday is missing should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: false,
          isHoliday: null as unknown as boolean,
          isPaid: false,
          type: "none",
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with dayOff when isPaid is missing should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: false,
          isHoliday: false,
          isPaid: null as unknown as boolean,
          type: "none",
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with dayOff when type is missing should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: false,
          isHoliday: false,
          isPaid: false,
          type: null as unknown as string,
        },
        sickLeave: {
          isSickLeave: false,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with missing sickLeave should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: false,
          isHoliday: false,
          isPaid: false,
          type: "none",
        },
        sickLeave: {} as unknown as {
          isSickLeave: boolean;
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});

Deno.test("given a data object has a day with sickLeave when isSickLeave is missing should validate and return false", () => {
  const timesheetData = createTimesheet({
    days: [
      {
        day: 1,
        hours: new mongoose.Schema.Types.Decimal128("8"),
        checkIn: "08:00",
        checkOut: "16:00",
        balance: new mongoose.Schema.Types.Decimal128("0"),
        dayOff: {
          isDayOff: false,
          isHoliday: false,
          isPaid: false,
          type: "none",
        },
        sickLeave: {
          isSickLeave: null as unknown as boolean,
        },
      },
    ],
  });

  const result = timesheetValidator(timesheetData);

  assertEquals(result, false);
});
