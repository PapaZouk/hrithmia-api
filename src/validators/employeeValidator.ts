import {z} from "npm:zod";

const employeeSchema = z.object({
    personalData: z.object({
        firstName: z.string()
            .min(3, "First name must be at least 3 characters long"),
        lastName: z.string()
            .min(3, "Last name must be at least 3 characters long"),
        email: z.string().email(),
        phone: z.string()
            .regex(/^\d{3}-\d{3}-\d{3}$/, 'Phone number must be in format 000-000-000'),
        pesel: z.string()
            .min(11, "PESEL must be exactly 11 characters long")
            .max(11, "PESEL must be exactly 11 characters long")
            .regex(/^\d+$/, "PESEL must contain only digits"),
        clothSize: z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL"]),
        address1: z.object({
            street1: z.string().nonempty('Street name cannot be empty'),
            house1: z.string().nonempty('House number cannot be empty'),
            city1: z.string().nonempty('City name cannot be empty'),
            state1: z.string().nonempty('State name cannot be empty'),
            zip1: z.string().nonempty('ZIP code cannot be empty'),
            voivodeship1: z.string().nonempty('Voivodeship name cannot be empty'),
        }),
        address2: z.object({
            street2: z.string().optional(),
            house2: z.string().optional(),
            city2: z.string().optional(),
            state2: z.string().optional(),
            zip2: z.string().optional(),
            voivodeship2: z.string().optional(),
        }),
    }),
    jobDetails: z.object({
        status: z.enum(["active", "inactive", "terminated", "suspended", "on-leave", "retired"]),
        jobTitle: z.string().min(2, "Job title must be at least 2 characters long"),
        department: z.string().nonempty('Department name cannot be empty'),
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
        salary: z.object({
            baseSalary: z.number()
                .min(0, "Base salary must be a positive number"),
            currency: z.enum(["PLN", "EUR", "USD", "GBP"]),
            bankAccount: z.string()
                .min(26, "Bank account number must be exactly 26 digits long")
                .max(26, "Bank account number must be exactly 26 digits long"),
            bankName: z.string().nonempty('Bank name cannot be empty'),
        }),
    }),
})

export const employeeValidator = (data: object): boolean => {
    try {
        employeeSchema.parse(data);
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation failed: ', (error as z.ZodError).errors);
        }
        return false;
    }
}