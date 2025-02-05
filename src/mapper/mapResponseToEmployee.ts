import Employee, { IEmployee } from "../model/IEmployee.ts";

export default function mapResponseToEmployee(data: IEmployee) {
  return new Employee({
    personalData: {
      firstName: data.personalData.firstName,
      lastName: data.personalData.lastName,
      email: data.personalData.email,
      phone: data.personalData.phone,
      pesel: data.personalData.pesel,
      clothSize: data.personalData.clothSize,
      nip: data.personalData.nip,
      personalDataHistory: data.personalData?.personalDataHistory?.map((
        history,
      ) => ({
        firstNameBefore: history.firstNameBefore,
        firstNameAfter: history.firstNameAfter,
        lastNameBefore: history.lastNameBefore,
        lastNameAfter: history.lastNameAfter,
        emailBefore: history.emailBefore,
        emailAfter: history.emailAfter,
        phoneBefore: history.phoneBefore,
        phoneAfter: history.phoneAfter,
        peselBefore: history.peselBefore,
        peselAfter: history.peselAfter,
        clothSizeBefore: history.clothSizeBefore,
        clothSizeAfter: history.clothSizeAfter,
        nipBefore: history.nipBefore,
        nipAfter: history.nipAfter,
        changeDate: history.changeDate,
      })),
      address1: {
        street1: data.personalData?.address1?.street1,
        house1: data.personalData?.address1?.house1,
        city1: data.personalData?.address1?.city1,
        state1: data.personalData?.address1?.state1,
        zip1: data.personalData?.address1?.zip1,
        voivodeship1: data.personalData?.address1?.voivodeship1,
        address1History: data.personalData?.address1?.address1History?.map((
          history,
        ) => ({
          street1Before: history.street1Before,
          street1After: history.street1After,
          house1Before: history.house1Before,
          house1After: history.house1After,
          city1Before: history.city1Before,
          city1After: history.city1After,
          state1Before: history.state1Before,
          state1After: history.state1After,
          zip1Before: history.zip1Before,
          zip1After: history.zip1After,
          voivodeship1Before: history.voivodeship1Before,
          voivodeship1After: history.voivodeship1After,
          changeDate: history.changeDate,
        })),
      },
      address2: {
        street2: data.personalData?.address2?.street2,
        house2: data.personalData?.address2?.house2,
        city2: data.personalData?.address2?.city2,
        state2: data.personalData?.address2?.state2,
        zip2: data.personalData?.address2?.zip2,
        voivodeship2: data.personalData?.address2?.voivodeship2,
        address2History: data.personalData?.address2?.address2History?.map((
          history,
        ) => ({
          street2Before: history.street2Before,
          street2After: history.street2After,
          house2Before: history.house2Before,
          house2After: history.house2After,
          city2Before: history.city2Before,
          city2After: history.city2After,
          state2Before: history.state2Before,
          state2After: history.state2After,
          zip2Before: history.zip2Before,
          zip2After: history.zip2After,
          voivodeship2Before: history.voivodeship2Before,
          voivodeship2After: history.voivodeship2After,
          changeDate: history.changeDate,
        })),
      },
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
      jobDetailsHistory: data.jobDetails?.jobDetailsHistory?.map((history) => ({
        statusBefore: history
          .statusBefore,
        statusAfter: history
          .statusAfter,
        jobTitleBefore: history
          .jobTitleBefore,
        jobTitleAfter: history
          .jobTitleAfter,
        departmentBefore: history
          .departmentBefore,
        departmentAfter: history
          .departmentAfter,
        startDateBefore: history
          .startDateBefore,
        startDateAfter: history
          .startDateAfter,
        endDateBefore: history
          .endDateBefore,
        endDateAfter: history
          .endDateAfter,
        contractTypeBefore: history
          .contractTypeBefore,
        contractTypeAfter: history
          .contractTypeAfter,
        workScheduleBefore: history
          .workScheduleBefore,
        workScheduleAfter: history
          .workScheduleAfter,
        insuranceTypeBefore: history
          .insuranceTypeBefore,
        insuranceTypeAfter: history
          .insuranceTypeAfter,
        annualLeaveDaysBefore: history
          .annualLeaveDaysBefore,
        annualLeaveDaysAfter: history
          .annualLeaveDaysAfter,
        changeDate: history.changeDate,
      })),
      jobStayAddress: {
        street: data.jobDetails?.jobStayAddress?.street,
        house: data.jobDetails?.jobStayAddress?.house,
        city: data.jobDetails?.jobStayAddress?.city,
        state: data.jobDetails?.jobStayAddress?.state,
        zip: data.jobDetails?.jobStayAddress?.zip,
        voivodeship: data.jobDetails?.jobStayAddress?.voivodeship,
        jobStayAddressHistory: data.jobDetails?.jobStayAddress
          ?.jobStayAddressHistory?.map((history) => ({
            streetBefore: history.streetBefore,
            streetAfter: history.streetAfter,
            houseBefore: history.houseBefore,
            houseAfter: history.houseAfter,
            cityBefore: history.cityBefore,
            cityAfter: history.cityAfter,
            stateBefore: history.stateBefore,
            stateAfter: history.stateAfter,
            zipBefore: history.zipBefore,
            zipAfter: history.zipAfter,
            voivodeshipBefore: history.voivodeshipBefore,
            voivodeshipAfter: history.voivodeshipAfter,
            changeDate: history.changeDate,
          })),
      },
      salary: {
        baseSalary: data.jobDetails?.salary?.baseSalary,
        currency: data.jobDetails?.salary?.currency,
        hourlyRate: data.jobDetails?.salary?.hourlyRate,
        bankAccount: data.jobDetails?.salary?.bankAccount,
        bankName: data.jobDetails?.salary?.bankName,
        salaryHistory: data.jobDetails?.salary?.salaryHistory?.map((
          history,
        ) => ({
          baseSalaryBefore: history.baseSalaryBefore,
          baseSalaryAfter: history.baseSalaryAfter,
          hourlyRateBefore: history.hourlyRateBefore,
          hourlyRateAfter: history.hourlyRateAfter,
          currencyBefore: history.currencyBefore,
          currencyAfter: history.currencyAfter,
          bankAccountBefore: history.bankAccountBefore,
          bankAccountAfter: history.bankAccountAfter,
          bankNameBefore: history.bankNameBefore,
          bankNameAfter: history.bankNameAfter,
          changeDate: history.changeDate,
        })),
      },
    },
  });
}
