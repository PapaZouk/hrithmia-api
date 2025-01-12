import { z } from "npm:zod";

const employeeSchema = z.object({
  personalData: z.object({
    firstName: z.string()
      .min(3, "First name must be at least 3 characters long"),
    lastName: z.string()
      .min(3, "Last name must be at least 3 characters long"),
    email: z.string().email(),
    phone: z.string()
      .regex(
        /^\d{3}-\d{3}-\d{3}$/,
        "Phone number must be in format 000-000-000",
      ),
    pesel: z.string()
      .min(11, "PESEL must be exactly 11 characters long")
      .max(11, "PESEL must be exactly 11 characters long")
      .regex(/^\d+$/, "PESEL must contain only digits"),
    clothSize: z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL"]),
    nip: z.number(),
    personalDataHistory: z.array(z.object({
      firstNameBefore: z.string(),
      firstNameAfter: z.string(),
      lastNameBefore: z.string(),
      lastNameAfter: z.string(),
      emailBefore: z.string(),
      emailAfter: z.string(),
      phoneBefore: z.string(),
      phoneAfter: z.string(),
      peselBefore: z.string(),
      peselAfter: z.string(),
      clothSizeBefore: z.string(),
      clothSizeAfter: z.string(),
      nipBefore: z.number(),
      nipAfter: z.number(),
      changeDate: z.string(),
    })).optional(),
    address1: z.object({
      street1: z.string().nonempty("Street name cannot be empty"),
      house1: z.string().nonempty("House number cannot be empty"),
      city1: z.string().nonempty("City name cannot be empty"),
      state1: z.string().nonempty("State name cannot be empty"),
      zip1: z.string().nonempty("ZIP code cannot be empty"),
      voivodeship1: z.string().nonempty("Voivodeship name cannot be empty"),
      address1History: z.array(z.object({
        street1Before: z.string(),
        street1After: z.string(),
        house1Before: z.string(),
        house1After: z.string(),
        city1Before: z.string(),
        city1After: z.string(),
        state1Before: z.string(),
        state1After: z.string(),
        zip1Before: z.string(),
        zip1After: z.string(),
        voivodeship1Before: z.string(),
        voivodeship1After: z.string(),
        changeDate: z.string(),
      })).optional(),
    }),
    address2: z.object({
      street2: z.string().optional(),
      house2: z.string().optional(),
      city2: z.string().optional(),
      state2: z.string().optional(),
      zip2: z.string().optional(),
      voivodeship2: z.string().optional(),
      address2History: z.array(z.object({
        street2Before: z.string(),
        street2After: z.string(),
        house2Before: z.string(),
        house2After: z.string(),
        city2Before: z.string(),
        city2After: z.string(),
        state2Before: z.string(),
        state2After: z.string(),
        zip2Before: z.string(),
        zip2After: z.string(),
        voivodeship2Before: z.string(),
        voivodeship2After: z.string(),
        changeDate: z.string().nonempty("Change date is required"),
      })).optional(),
    }),
  }),
  jobDetails: z.object({
    status: z.enum([
      "active",
      "inactive",
      "terminated",
      "suspended",
      "on-leave",
      "retired",
    ]),
    jobTitle: z.string().min(2, "Job title must be at least 2 characters long"),
    department: z.string().nonempty("Department name cannot be empty"),
    startDate: z
      .string()
      .nonempty("Start date is required"),
    endDate: z
      .string()
      .optional(),
    contractType: z.enum([
      "b2b",
      "uop",
      "mandate",
      "specific-task",
      "temporary",
      "internship",
      "part-time",
    ]),
    workSchedule: z.enum([
      "full-time",
      "part-time",
      "remote",
      "business-trips",
    ]),
    insuranceType: z.enum(["commercial", "a1"]),
    annualLeaveDays: z.number()
      .min(0, "Annual leave days must be a positive number"),
    jobDetailsHistory: z.array(z.object({
      statusBefore: z.string(),
      statusAfter: z.string(),
      jobTitleBefore: z.string(),
      jobTitleAfter: z.string(),
      departmentBefore: z.string(),
      departmentAfter: z.string(),
      startDateBefore: z.string(),
      startDateAfter: z.string(),
      endDateBefore: z.string(),
      endDateAfter: z.string(),
      contractTypeBefore: z.enum([
        "b2b",
        "uop",
        "mandate",
        "specific-task",
        "temporary",
        "internship",
        "part-time",
      ]),
      contractTypeAfter: z.enum([
        "b2b",
        "uop",
        "mandate",
        "specific-task",
        "temporary",
        "internship",
        "part-time",
      ]),
      workScheduleBefore: z.enum([
        "full-time",
        "part-time",
        "remote",
        "business-trips",
      ]),
      workScheduleAfter: z.enum([
        "full-time",
        "part-time",
        "remote",
        "business-trips",
      ]),
      insuranceTypeBefore: z.enum(["commercial", "a1"]),
      insuranceTypeAfter: z.enum(["commercial", "a1"]),
      annualLeaveDaysBefore: z.number()
        .min(0, "Annual leave days must be a positive number"),
      annualLeaveDaysAfter: z.number()
        .min(0, "Annual leave days must be a positive number"),
      changeDate: z.string().nonempty("Change date is required"),
    })).optional(),
    salary: z.object({
      baseSalary: z.number()
        .min(0, "Base salary must be a positive number"),
      currency: z.enum(["PLN", "EUR", "USD", "GBP"]),
      hourlyRate: z.number()
        .min(0, "Hourly rate must be a positive number"),
      bankAccount: z.string()
        .min(26, "Bank account number must be exactly 26 digits long")
        .max(26, "Bank account number must be exactly 26 digits long"),
      bankName: z.string().nonempty("Bank name cannot be empty"),
      salaryHistory: z.array(z.object({
        salaryBefore: z.number(),
        salaryAfter: z.number(),
        hourlyRateBefore: z.string(),
        hourlyRateAfter: z.string(),
        currencyBefore: z.enum([
          "PLN",
          "EUR",
          "USD",
          "GBP, CHF, SEK, NOK, CAD",
        ]),
        currencyAfter: z.enum(["PLN", "EUR", "USD", "GBP, CHF, SEK, NOK, CAD"]),
        bankAccountBefore: z.string(),
        bankAccountAfter: z.string(),
        bankNameBefore: z.string(),
        bankNameAfter: z.string(),
        changeDate: z.string().nonempty("Change date is required"),
      })).optional(),
    }),
  }),
});

export const employeeValidator = (data: object): boolean => {
  try {
    employeeSchema.parse(data);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed: ", (error as z.ZodError).errors);
    }
    return false;
  }
};
