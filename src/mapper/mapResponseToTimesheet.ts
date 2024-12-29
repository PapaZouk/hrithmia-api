import Timesheet, { ITimesheet } from "../model/ITimesheet.ts";
import mongoose from "mongoose";
import {ObjectId} from "mongodb";

export default function mapResponseToTimesheet(data: ITimesheet) {
    if (!mongoose.Types.ObjectId.isValid(data.employeeId)) {
        throw new Error("Invalid employeeId");
    }

    return new Timesheet({
        employeeId: new ObjectId(data.employeeId),
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