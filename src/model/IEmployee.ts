import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
    personalData: {
        firstName?: string|null;
        lastName?: string|null;
        email?: string|null;
        phone?: string|null;
        pesel?: string|null;
        clothSize?: string|null;
        address1?: {
            street1?: string|null;
            house1?: string|null;
            city1?: string|null;
            state1?: string|null;
            zip1?: string|null;
            voivodeship1?: string|null;
        };
        address2?: {
            street2?: string|null;
            house2?: string|null;
            city2?: string|null;
            state2?: string|null;
            zip2?: string|null;
            voivodeship2?: string|null;
        };
    };
    jobDetails?: {
        status?: string|null;
        jobTitle?: string|null;
        department?: string|null;
        startDate?: string|null;
        endDate?: string|null;
        contractType?: string|null;
        workSchedule?: string|null;
        insuranceType?: string|null;
        annualLeaveDays?: number|null;
        salary?: {
            baseSalary?: number|null;
            currency?: string|null;
            bankAccount?: string|null;
            bankName?: string|null;
        }
    };
}

const EmployeeSchema: Schema = new Schema({
    personalData: {
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        pesel: { type: String, required: false },
        clothSize: { type: String, required: false },
        address1: {
            street1: { type: String, required: false },
            house1: { type: String, required: false },
            city1: { type: String, required: false },
            state1: { type: String, required: false },
            zip1: { type: String, required: false },
            voivodeship1: { type: String, required: false },
        },
        address2: {
            street2: { type: String, required: false },
            house2: { type: String, required: false },
            city2: { type: String, required: false },
            state2: { type: String, required: false },
            zip2: { type: String, required: false },
            voivodeship2: { type: String, required: false },
        },
    },
    jobDetails: {
        status: { type: String, required: false },
        jobTitle: { type: String, required: false },
        department: { type: String, required: false },
        startDate: { type: String, required: false },
        endDate: { type: String, required: false },
        contractType: { type: String, required: false },
        workSchedule: { type: String, required: false },
        insuranceType: { type: String, required: false },
        annualLeaveDays: { type: Number, required: false },
        salary: {
            baseSalary: { type: Number, required: false },
            currency: { type: String, required: false },
            bankAccount: { type: String, required: false },
            bankName: { type: String, required: false },
        }
    },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);