import { createEmployeeData } from "../_mocks/createEmployee.ts";
import { employeeValidator } from "../../../src/validators/employeeValidator.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("given a data object should parse it with the employeeSchema, should validate and return true ", () => {
  const employeeData = createEmployeeData();

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given a data object is missing firstName, should validate and return false", () => {
  const employeeData = createEmployeeData({ personalData: { firstName: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing lastName, should validate and return false", () => {
  const employeeData = createEmployeeData({ personalData: { lastName: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing email, should validate and return false", () => {
  const employeeData = createEmployeeData({ personalData: { email: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing PESEL, should validate and return false", () => {
  const employeeData = createEmployeeData({ personalData: { pesel: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing clothSize, should validate and return false", () => {
  const employeeData = createEmployeeData({ personalData: { clothSize: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing nip, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: { nip: null as unknown as number },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given a data object is missing personal data history, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: {
      personalDataHistory: [{
        firstNameBefore: "",
        firstNameAfter: "",
        lastNameBefore: "",
        lastNameAfter: "",
        emailBefore: "",
        emailAfter: "",
        phoneBefore: "",
        phoneAfter: "",
        peselBefore: "",
        peselAfter: "",
        clothSizeBefore: "",
        clothSizeAfter: "",
        nipBefore: 0,
        nipAfter: 0,
        changeDate: "",
      }],
    },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given address is missing street1, should validate and return false", () => {
  const employeeData = createEmployeeData({
    personalData: { address1: { street1: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given address is missing house1, should validate and return false", () => {
  const employeeData = createEmployeeData({
    personalData: { address1: { house1: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given address is missing city1, should validate and return false", () => {
  const employeeData = createEmployeeData({
    personalData: { address1: { city1: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given address is missing state1, should validate and return false", () => {
  const employeeData = createEmployeeData({
    personalData: { address1: { state1: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given address is missing zip1, should validate and return false", () => {
  const employeeData = createEmployeeData({
    personalData: { address1: { zip1: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given address is missing voivodeship1, should validate and return false", () => {
  const employeeData = createEmployeeData({
    personalData: { address1: { voivodeship1: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given address is missing address1 history, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: {
      address1: {
        address1History: [{
          street1Before: "",
          street1After: "",
          house1Before: "",
          house1After: "",
          city1Before: "",
          city1After: "",
          state1Before: "",
          state1After: "",
          zip1Before: "",
          zip1After: "",
          voivodeship1Before: "",
          voivodeship1After: "",
          changeDate: "",
        }],
      },
    },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given address2 is missing street2, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: { address2: { street2: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given address2 is missing house2, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: { address2: { house2: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given address2 is missing city2, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: { address2: { city2: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given address2 is missing state2, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: { address2: { state2: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given address2 is missing zip2, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: { address2: { zip2: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given address2 is missing voivodeship2, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: { address2: { voivodeship2: "" } },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given address2 is missing address2 history, should validate and return true", () => {
  const employeeData = createEmployeeData({
    personalData: {
      address2: {
        address2History: [{
          street2Before: "",
          street2After: "",
          house2Before: "",
          house2After: "",
          city2Before: "",
          city2After: "",
          state2Before: "",
          state2After: "",
          zip2Before: "",
          zip2After: "",
          voivodeship2Before: "",
          voivodeship2After: "",
          changeDate: "",
        }],
      },
    },
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, true);
});

Deno.test("given a data object is missing status, should validate and return false", () => {
  const employeeData = createEmployeeData({ jobDetails: { status: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing jobTitle, should validate and return false", () => {
  const employeeData = createEmployeeData({ jobDetails: { jobTitle: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing department, should validate and return false", () => {
  const employeeData = createEmployeeData({ jobDetails: { department: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing startDate, should validate and return false", () => {
  const employeeData = createEmployeeData({ jobDetails: { startDate: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing contractType, should validate and return false", () => {
  const employeeData = createEmployeeData({ jobDetails: { contractType: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing workSchedule, should validate and return false", () => {
  const employeeData = createEmployeeData({ jobDetails: { workSchedule: "" } });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing insuranceType, should validate and return false", () => {
  const employeeData = createEmployeeData(
    { jobDetails: { insuranceType: "" } },
  );

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object with invalid annualLeaveDays amount, should validate and return false", () => {
  const employeeData = createEmployeeData(
    { jobDetails: { annualLeaveDays: -1 } },
  );

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing jobDetailsHistory, should validate and return false", () => {
  const employeeData = createEmployeeData(
    {
      jobDetails: {
        jobDetailsHistory: [
          {
            statusBefore: "",
            statusAfter: "",
            jobTitleBefore: "",
            jobTitleAfter: "",
            departmentBefore: "",
            departmentAfter: "",
            startDateBefore: "",
            startDateAfter: "",
            endDateBefore: "",
            endDateAfter: "",
            contractTypeBefore: "",
            contractTypeAfter: "",
            workScheduleBefore: "full-time",
            workScheduleAfter: "full-time",
            insuranceTypeBefore: "",
            insuranceTypeAfter: "",
            annualLeaveDaysBefore: null,
            annualLeaveDaysAfter: null,
            changeDate: "",
          },
        ],
      },
    },
  );

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing baseSalary, should validate and return false", () => {
  const employeeData = createEmployeeData({
    jobDetails: {
      salary: {
        baseSalary: null as unknown as number,
        salaryHistory: [{
          baseSalaryBefore: null,
          baseSalaryAfter: null,
          currencyBefore: null,
          currencyAfter: null,
          hourlyRateBefore: null,
          hourlyRateAfter: null,
          bankAccountBefore: null,
          bankAccountAfter: null,
          bankNameBefore: null,
          bankNameAfter: null,
          changeDate: null,
        }],
      }
    }
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing currency, should validate and return false", () => {
  const employeeData = createEmployeeData({
    jobDetails: {
      salary: {
        currency: null as unknown as string,
        salaryHistory: [{
          baseSalaryBefore: null,
          baseSalaryAfter: null,
          currencyBefore: null,
          currencyAfter: null,
          hourlyRateBefore: null,
          hourlyRateAfter: null,
          bankAccountBefore: null,
          bankAccountAfter: null,
          bankNameBefore: null,
          bankNameAfter: null,
          changeDate: null,
        }],
      }
    }
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing hourlyRate, should validate and return false", () => {
  const employeeData = createEmployeeData({
    jobDetails: {
      salary: {
        hourlyRate: null as unknown as number,
        salaryHistory: [{
          baseSalaryBefore: null,
          baseSalaryAfter: null,
          currencyBefore: null,
          currencyAfter: null,
          hourlyRateBefore: null,
          hourlyRateAfter: null,
          bankAccountBefore: null,
          bankAccountAfter: null,
          bankNameBefore: null,
          bankNameAfter: null,
          changeDate: null,
        }],
      }
    }
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is bankAccount currency, should validate and return false", () => {
  const employeeData = createEmployeeData({
    jobDetails: {
      salary: {
        bankAccount: null as unknown as string,
        salaryHistory: [{
          baseSalaryBefore: null,
          baseSalaryAfter: null,
          currencyBefore: null,
          currencyAfter: null,
          hourlyRateBefore: null,
          hourlyRateAfter: null,
          bankAccountBefore: null,
          bankAccountAfter: null,
          bankNameBefore: null,
          bankNameAfter: null,
          changeDate: null,
        }],
      }
    }
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing bankName, should validate and return false", () => {
  const employeeData = createEmployeeData({
    jobDetails: {
      salary: {
        bankName: null as unknown as string,
        salaryHistory: [{
          baseSalaryBefore: null,
          baseSalaryAfter: null,
          currencyBefore: null,
          currencyAfter: null,
          hourlyRateBefore: null,
          hourlyRateAfter: null,
          bankAccountBefore: null,
          bankAccountAfter: null,
          bankNameBefore: null,
          bankNameAfter: null,
          changeDate: null,
        }],
      }
    }
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});

Deno.test("given a data object is missing salaryHistory, should validate and return true", () => {
  const employeeData = createEmployeeData({
    jobDetails: {
      salary: {
        salaryHistory: [{
          baseSalaryBefore: null,
          baseSalaryAfter: null,
          currencyBefore: null,
          currencyAfter: null,
          hourlyRateBefore: null,
          hourlyRateAfter: null,
          bankAccountBefore: null,
          bankAccountAfter: null,
          bankNameBefore: null,
          bankNameAfter: null,
          changeDate: null,
        }],
      }
    }
  });

  const result = employeeValidator(employeeData);

  assertEquals(result, false);
});