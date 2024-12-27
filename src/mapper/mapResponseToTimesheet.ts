import Timesheet, {ITimesheet} from "../model/ITimesheet.ts";

export default function mapResponseToTimesheet(data: ITimesheet) {
    return new Timesheet({
        employeeId: data.employeeId,
        year: data.year,
        month: data.month,
        totalHours: data.totalHours,
        totalBalance: data.totalBalance,
        days: data.days.map(day => ({
            day: day.day,
            hours: day.hours,
            checkIn: day.checkIn,
            checkOut: day.checkOut,
            balance: day.balance,
            dayOff: {
                isDayOff: day.dayOff.isDayOff,
                isHoliday: day.dayOff.isHoliday,
                isPaid: day.dayOff.isPaid,
                type: day.dayOff.type,
            },
            sickLeave: {
                isSickLeave: day.sickLeave.isSickLeave,
            }
        }))
    });
}