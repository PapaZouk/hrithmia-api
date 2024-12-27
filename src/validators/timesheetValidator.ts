import { z } from 'npm:zod';

const timesheetSchema = z.object({
    employeeId: z.string().nonempty('Employee ID is required'),
    year: z.number().int().min(2000, 'Year must be at least 2025'),
    month: z.number().int().min(1, 'Month must be between 1 and 12'),
    totalHours: z.number().int().min(0, 'Total hours must be a positive number'),
    totalBalance: z.number().int().min(0, 'Total balance must be a positive number'),
    days: z.array(z.object({
        day: z.number().int().min(1, 'Day must be between 1 and 31'),
        hours: z.number().int().min(0, 'hours must be a positive number'),
        checkIn: z.string().nonempty('Check-in time is required'),
        checkOut: z.string().nonempty('Check-out time is required'),
        balance: z.number().int().min(0, 'Balance must be a positive number'),
        dayOff: z.object({
            isDayOff: z.boolean().optional(),
            isHoliday: z.boolean().optional(),
            isPaid: z.boolean().optional(),
            type: z.string().optional(),
        }),
        sickLeave: z.object({
            isSickLeave: z.boolean().optional(),
        }),
    })),
});

export const timesheetValidator = (data: object): boolean => {
    try {
        timesheetSchema.parse(data);
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation failed: ', (error as z.ZodError).errors);
        }
        return false;
    }
}