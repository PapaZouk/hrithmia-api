import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
    personalData: {
        firstName?: string|null;
        lastName?: string|null;
        email?: string|null;
        phone?: string|null;
        pesel?: string|null;
        clothSize?: string|null;
        nip?: number|null;
        personalDataHistory?: [
            {
                firstNameBefore: string|null;
                firstNameAfter: string|null;
                lastNameBefore: string|null;
                lastNameAfter: string|null;
                emailBefore: string|null;
                emailAfter: string|null;
                phoneBefore: string|null;
                phoneAfter: string|null;
                peselBefore: string|null;
                peselAfter: string|null;
                clothSizeBefore: string|null;
                clothSizeAfter: string|null;
                nipBefore: number|null;
                nipAfter: number|null;
                changeDate: string|null;
            }
        ],
        address1?: {
            street1?: string|null;
            house1?: string|null;
            city1?: string|null;
            state1?: string|null;
            zip1?: string|null;
            voivodeship1?: string|null;
            address1History?: [
                {
                    street1Before: string|null;
                    street1After: string|null;
                    house1Before: string|null;
                    house1After: string|null;
                    city1Before: string|null;
                    city1After: string|null;
                    state1Before: string|null;
                    state1After: string|null;
                    zip1Before: string|null;
                    zip1After: string|null;
                    voivodeship1Before: string|null;
                    voivodeship1After: string|null;
                    changeDate: string|null;
                }
            ],
        };
        address2?: {
            street2?: string|null;
            house2?: string|null;
            city2?: string|null;
            state2?: string|null;
            zip2?: string|null;
            voivodeship2?: string|null;
            address2History?: [
                {
                    street2Before: string|null;
                    street2After: string|null;
                    house2Before: string|null;
                    house2After: string|null;
                    city2Before: string|null;
                    city2After: string|null;
                    state2Before: string|null;
                    state2After: string|null;
                    zip2Before: string|null;
                    zip2After: string|null;
                    voivodeship2Before: string|null;
                    voivodeship2After: string|null;
                    changeDate: string|null;
                }
            ],
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
        jobDetailsHistory?: [
            {
                statusBefore: string|null;
                statusAfter: string|null;
                jobTitleBefore: string|null;
                jobTitleAfter: string|null;
                departmentBefore: string|null;
                departmentAfter: string|null;
                startDateBefore: string|null;
                startDateAfter: string|null;
                endDateBefore: string|null;
                endDateAfter: string|null;
                contractTypeBefore: string|null;
                contractTypeAfter: string|null;
                workScheduleBefore: string|null;
                workScheduleAfter: string|null;
                insuranceTypeBefore: string|null;
                insuranceTypeAfter: string|null;
                annualLeaveDaysBefore: number|null;
                annualLeaveDaysAfter: number|null;
                changeDate: string|null;
            }
        ],
        salary?: {
            baseSalary?: number|null;
            currency?: string|null;
            hourlyRate?: string|null;
            bankAccount?: string|null;
            bankName?: string|null;
            salaryHistory: [
                {
                    salaryBefore: number|null;
                    salaryAfter: number|null;
                    hourlyRateBefore: string|null;
                    hourlyRateAfter: string|null;
                    currencyBefore: string|null;
                    currencyAfter: string|null;
                    bankAccountBefore: string|null;
                    bankAccountAfter: string|null;
                    bankNameBefore: string|null;
                    bankNameAfter: string|null;
                    changeDate: string|null;
                }
            ]
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
        nip: { type: Number, required: false },
        personalDataHistory: [
            {
                firstNameBefore: { type: String, required: false },
                firstNameAfter: { type: String, required: false },
                lastNameBefore: { type: String, required: false },
                lastNameAfter: { type: String, required: false },
                emailBefore: { type: String, required: false },
                emailAfter: { type: String, required: false },
                phoneBefore: { type: String, required: false },
                phoneAfter: { type: String, required: false },
                peselBefore: { type: String, required: false },
                peselAfter: { type: String, required: false },
                clothSizeBefore: { type: String, required: false },
                clothSizeAfter: { type: String, required: false },
                nipBefore: { type: Number, required: false },
                nipAfter: { type: Number, required: false },
                changeDate: { type: String, required: false },
            }
        ],
        address1: {
            street1: { type: String, required: false },
            house1: { type: String, required: false },
            city1: { type: String, required: false },
            state1: { type: String, required: false },
            zip1: { type: String, required: false },
            voivodeship1: { type: String, required: false },
            address1History: [
                {
                    street1Before: { type: String, required: false },
                    street1After: { type: String, required: false },
                    house1Before: { type: String, required: false },
                    house1After: { type: String, required: false },
                    city1Before: { type: String, required: false },
                    city1After: { type: String, required: false },
                    state1Before: { type: String, required: false },
                    state1After: { type: String, required: false },
                    zip1Before: { type: String, required: false },
                    zip1After: { type: String, required: false },
                    voivodeship1Before: { type: String, required: false },
                    voivodeship1After: { type: String, required: false },
                    changeDate: { type: String, required: false },
                }
            ],
        },
        address2: {
            street2: { type: String, required: false },
            house2: { type: String, required: false },
            city2: { type: String, required: false },
            state2: { type: String, required: false },
            zip2: { type: String, required: false },
            voivodeship2: { type: String, required: false },
            address2History: [
                {
                    street2Before: { type: String, required: false },
                    street2After: { type: String, required: false },
                    house2Before: { type: String, required: false },
                    house2After: { type: String, required: false },
                    city2Before: { type: String, required: false },
                    city2After: { type: String, required: false },
                    state2Before: { type: String, required: false },
                    state2After: { type: String, required: false },
                    zip2Before: { type: String, required: false },
                    zip2After: { type: String, required: false },
                    voivodeship2Before: { type: String, required: false },
                    voivodeship2After: { type: String, required: false },
                    changeDate: { type: String, required: false },
                }
            ],
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
        jobDetailsHistory: [
            {
                statusBefore: { type: String, required: false },
                statusAfter: { type: String, required: false },
                jobTitleBefore: { type: String, required: false },
                jobTitleAfter: { type: String, required: false },
                departmentBefore: { type: String, required: false },
                departmentAfter: { type: String, required: false },
                startDateBefore: { type: String, required: false },
                startDateAfter: { type: String, required: false },
                endDateBefore: { type: String, required: false },
                endDateAfter: { type: String, required: false },
                contractTypeBefore: { type: String, required: false },
                contractTypeAfter: { type: String, required: false },
                workScheduleBefore: { type: String, required: false },
                workScheduleAfter: { type: String, required: false },
                insuranceTypeBefore: { type: String, required: false },
                insuranceTypeAfter: { type: String, required: false },
                annualLeaveDaysBefore: { type: Number, required: false },
                annualLeaveDaysAfter: { type: Number, required: false },
                changeDate: { type: String, required: false },
            }
        ],
        salary: {
            baseSalary: { type: Number, required: false },
            currency: { type: String, required: false },
            hourlyRate: { type: Number, required: false },
            bankAccount: { type: String, required: false },
            bankName: { type: String, required: false },
            salaryHistory: [
                {
                    salaryBefore: { type: Number, required: false },
                    salaryAfter: { type: Number, required: false },
                    hourlyRateBefore: { type: Number, required: false },
                    hourlyRateAfter: { type: Number, required: false },
                    currencyBefore: { type: String, required: false },
                    currencyAfter: { type: String, required: false },
                    bankAccountBefore: { type: String, required: false },
                    bankAccountAfter: { type: String, required: false },
                    bankNameBefore: { type: String, required: false },
                    bankNameAfter: { type: String, required: false },
                    changeDate: { type: String, required: false },
                }
            ]
        }
    },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);