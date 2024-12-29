import mongoose, { Schema, Document } from "mongoose";

export interface ITimesheet extends Document {
    _id: string;
    employeeId: string;
    year: number;
    month: number;
    totalHours: mongoose.Schema.Types.Decimal128;
    totalBalance: mongoose.Schema.Types.Decimal128;
    days: {
        day: number;
        hours: mongoose.Schema.Types.Decimal128;
        checkIn: string;
        checkOut: string;
        balance: mongoose.Schema.Types.Decimal128;
        dayOff: {
            isDayOff: boolean;
            isHoliday: boolean;
            isPaid: boolean;
            type: string;
        }
        sickLeave: {
            isSickLeave: boolean;
        }
    }[];
}

const TimesheetSchema: Schema = new Schema({
    employeeId: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    totalHours: { type: mongoose.Schema.Types.Decimal128, required: true },
    totalBalance: { type: mongoose.Schema.Types.Decimal128, required: true },
    days: [{
        day: { type: Number, required: true },
        hours: { type: mongoose.Schema.Types.Decimal128, required: true },
        checkIn: { type: String, required: true },
        checkOut: { type: String, required: true },
        balance: { type: mongoose.Schema.Types.Decimal128, required: true },
        dayOff: {
            isDayOff: { type: Boolean, required: false },
            isHoliday: { type: Boolean, required: false },
            isPaid: { type: Boolean, required: false },
            type: { type: String, required: false },
        },
        sickLeave: {
            isSickLeave: { type: Boolean, required: false },
        }
    }]
});

export default mongoose.model<ITimesheet>('Timesheet', TimesheetSchema);