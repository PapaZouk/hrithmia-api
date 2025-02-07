import { IEmployee } from "../../../src/model/IEmployee.ts";

        export function createEmployeeData(overrides?: Partial<IEmployee>) {
          return {
            personalData: {
              firstName: overrides?.personalData?.firstName ?? "John",
              lastName: overrides?.personalData?.lastName ?? "Doe",
              email: overrides?.personalData?.email ?? "john.doe@email.com",
              phone: overrides?.personalData?.phone ?? "123-456-789",
              pesel: overrides?.personalData?.pesel ?? "12345678901",
              clothSize: overrides?.personalData?.clothSize ?? "M",
              nip: overrides?.personalData?.nip ?? 123456789,
              personalDataHistory: overrides?.personalData?.personalDataHistory ?? [
                {
                  firstNameBefore: "John",
                  firstNameAfter: "John",
                  lastNameBefore: "Doe",
                  lastNameAfter: "Doe",
                  emailBefore: "john.doe@email.com",
                  emailAfter: "john.doe@email.com",
                  phoneBefore: "123-456-789",
                  phoneAfter: "123-456-789",
                  peselBefore: "12345678901",
                  peselAfter: "12345678901",
                  clothSizeBefore: "M",
                  clothSizeAfter: "M",
                  nipBefore: 123456789,
                  nipAfter: 123456789,
                  changeDate: new Date().toLocaleDateString(),
                },
              ],
              address1: {
                street1: overrides?.personalData?.address1?.street1 ?? "street",
                house1: overrides?.personalData?.address1?.house1 ?? "house",
                city1: overrides?.personalData?.address1?.city1 ?? "city",
                state1: overrides?.personalData?.address1?.state1 ?? "state",
                zip1: overrides?.personalData?.address1?.zip1 ?? "zip",
                voivodeship1: overrides?.personalData?.address1?.voivodeship1 ?? "voivodeship",
                address1History: overrides?.personalData?.address1?.address1History ?? [
                  {
                    street1Before: "street",
                    street1After: "street",
                    house1Before: "house",
                    house1After: "house",
                    city1Before: "city",
                    city1After: "city",
                    state1Before: "state",
                    state1After: "state",
                    zip1Before: "zip",
                    zip1After: "zip",
                    voivodeship1Before: "voivodeship",
                    voivodeship1After: "voivodeship",
                    changeDate: new Date().toLocaleDateString(),
                  },
                ],
              },
              address2: {
                street2: overrides?.personalData?.address2?.street2 ?? "street",
                house2: overrides?.personalData?.address2?.house2 ?? "house",
                city2: overrides?.personalData?.address2?.city2 ?? "city",
                state2: overrides?.personalData?.address2?.state2 ?? "state",
                zip2: overrides?.personalData?.address2?.zip2 ?? "zip",
                voivodeship2: overrides?.personalData?.address2?.voivodeship2 ?? "voivodeship",
                address2History: overrides?.personalData?.address2?.address2History ?? [
                  {
                    street2Before: "street",
                    street2After: "street",
                    house2Before: "house",
                    house2After: "house",
                    city2Before: "city",
                    city2After: "city",
                    state2Before: "state",
                    state2After: "state",
                    zip2Before: "zip",
                    zip2After: "zip",
                    voivodeship2Before: "voivodeship",
                    voivodeship2After: "voivodeship",
                    changeDate: new Date().toLocaleDateString(),
                  },
                ],
              },
            },
            jobDetails: {
              status: overrides?.jobDetails?.status ?? "active",
              jobTitle: overrides?.jobDetails?.jobTitle ?? "developer",
              department: overrides?.jobDetails?.department ?? "IT",
              startDate: overrides?.jobDetails?.startDate ?? new Date().toLocaleDateString(),
              endDate: overrides?.jobDetails?.endDate ?? null,
              contractType: overrides?.jobDetails?.contractType ?? "b2b",
              workSchedule: overrides?.jobDetails?.workSchedule ?? "full-time",
              insuranceType: overrides?.jobDetails?.insuranceType ?? "commercial",
              annualLeaveDays: overrides?.jobDetails?.annualLeaveDays ?? 26,
              jobDetailsHistory: overrides?.jobDetails?.jobDetailsHistory ?? [
                {
                  statusBefore: "active",
                  statusAfter: "active",
                  jobTitleBefore: "developer",
                  jobTitleAfter: "developer",
                  departmentBefore: "IT",
                  departmentAfter: "IT",
                  startDateBefore: new Date().toLocaleDateString(),
                  startDateAfter: new Date().toLocaleDateString(),
                  endDateBefore: null,
                  endDateAfter: null,
                  contractTypeBefore: "b2b",
                  contractTypeAfter: "b2b",
                  workScheduleBefore: "full-time",
                  workScheduleAfter: "full-time",
                  insuranceTypeBefore: "commercial",
                  insuranceTypeAfter: "commercial",
                  annualLeaveDaysBefore: 26,
                  annualLeaveDaysAfter: 26,
                  changeDate: new Date().toLocaleDateString(),
                },
              ],
              jobStayAddress: overrides?.jobDetails?.jobStayAddress ?? {
                street: overrides?.jobDetails?.jobStayAddress?.street ?? "street",
                house: overrides?.jobDetails?.jobStayAddress?.house ?? "house",
                city: overrides?.jobDetails?.jobStayAddress?.city ?? "city",
                state: overrides?.jobDetails?.jobStayAddress?.state ?? "state",
                zip: overrides?.jobDetails?.jobStayAddress?.zip ?? "zip",
                voivodeship: overrides?.jobDetails?.jobStayAddress?.voivodeship ?? "voivodeship",
                jobStayAddressHistory: overrides?.jobDetails?.jobStayAddress?.jobStayAddressHistory ?? [
                  {
                    streetBefore: "street",
                    streetAfter: "street",
                    houseBefore: "house",
                    houseAfter: "house",
                    cityBefore: "city",
                    cityAfter: "city",
                    stateBefore: "state",
                    stateAfter: "state",
                    zipBefore: "zip",
                    zipAfter: "zip",
                    voivodeshipBefore: "voivodeship",
                    voivodeshipAfter: "voivodeship",
                    changeDate: new Date().toLocaleDateString(),
                  },
                ],
              },
              salary: {
                baseSalary: overrides?.jobDetails?.salary?.baseSalary ?? 4000,
                currency: overrides?.jobDetails?.salary?.currency ?? "EUR",
                hourlyRate: overrides?.jobDetails?.salary?.hourlyRate ?? 40,
                bankAccount: overrides?.jobDetails?.salary?.bankAccount ?? "12345678901234567890123456",
                bankName: overrides?.jobDetails?.salary?.bankName ?? "bank",
                salaryHistory: overrides?.jobDetails?.salary?.salaryHistory ?? [
                  {
                    baseSalaryBefore: 4000,
                    baseSalaryAfter: 4000,
                    currencyBefore: "EUR",
                    currencyAfter: "EUR",
                    hourlyRateBefore: 40,
                    hourlyRateAfter: 40,
                    bankAccountBefore: "12345678901234567890123456",
                    bankAccountAfter: "12345678901234567890123456",
                    bankNameBefore: "bank",
                    bankNameAfter: "bank",
                    changeDate: new Date().toLocaleDateString(),
                  },
                ],
              },
            },
          };
        }