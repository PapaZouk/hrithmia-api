import Employee, {IEmployee} from "../model/IEmployee.ts";

export default function mapResponseToEmployee(data: IEmployee) {
    return new Employee({
        personalData: {
            firstName: data.personalData.firstName,
            lastName: data.personalData.lastName,
            email: data.personalData.email,
            phone: data.personalData.phone,
            pesel: data.personalData.pesel,
            clothSize: data.personalData.clothSize,
            address1: {
                street1: data.personalData?.address1?.street1,
                house1: data.personalData?.address1?.house1,
                city1: data.personalData?.address1?.city1,
                state1: data.personalData?.address1?.state1,
                zip1: data.personalData?.address1?.zip1,
                voivodeship1: data.personalData?.address1?.voivodeship1,
            },
            address2: {
                street2: data.personalData?.address2?.street2,
                house2: data.personalData?.address2?.house2,
                city2: data.personalData?.address2?.city2,
                state2: data.personalData?.address2?.state2,
                zip2: data.personalData?.address2?.zip2,
                voivodeship2: data.personalData?.address2?.voivodeship2,
            }
        },
        jobDetails: {
            status: data.jobDetails?.status,
            jobTitle: data.jobDetails?.jobTitle,
            department: data.jobDetails?.department,
            startDate: data.jobDetails?.startDate,
            endDate: data.jobDetails?.endDate,
            contractType: data.jobDetails?.contractType,
            workSchedule: data.jobDetails?.workSchedule,
            insuranceType: data.jobDetails?.insuranceType,
            annualLeaveDays: data.jobDetails?.annualLeaveDays,
            salary: {
                baseSalary: data.jobDetails?.salary?.baseSalary,
                currency: data.jobDetails?.salary?.currency,
                bankAccount: data.jobDetails?.salary?.bankAccount,
                bankName: data.jobDetails?.salary?.bankName,
            }
        },
    });
}