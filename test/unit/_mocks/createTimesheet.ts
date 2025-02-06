import {ITimesheet} from "../../../src/model/ITimesheet.ts";

export function createTimesheet(overrides?: Partial<ITimesheet>) {
    return {
        employeeId: overrides?.employeeId ?? "employeeId",
        year: overrides?.year ?? 2021,
        month: overrides?.month ?? 1,
        totalHours: overrides?.totalHours ?? 8,
        totalBalance: overrides?.totalBalance ?? 0,
        days: overrides?.days ?? [
            {
                day: 1,
                hours: 8,
                checkIn: "08:00",
                checkOut: "16:00",
                balance: 0,
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
    };
}