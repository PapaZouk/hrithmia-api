import {assertEquals} from "jsr:@std/assert";
import {assertInstanceOf} from "https://deno.land/std/assert/assert_instance_of.ts";
import Employee, {IEmployee} from "../../../src/model/IEmployee.ts";
import mapResponseToEmployee from "../../../src/mapper/mapResponseToEmployee.ts";
import {createEmployee} from "../_mocks/createEmployee.ts";

Deno.test("given data should map to Employee instance", () => {
  // Arrange
  const data = createEmployee();

  // Act
  const employee = mapResponseToEmployee(data as unknown as IEmployee);

  // Assert
  if (employee) {
    assertPersonalData(employee);
    assertPersonalDataHistory(employee);
    assertAddress1(employee);
    assertAddress2(employee);
    assertJobDetailsData(employee);
  } else {
    throw new Error("employee data is not defined");
  }
});

function assertPersonalData(employee: IEmployee) {
  assertInstanceOf(employee, Employee);
  const personalData = employee.personalData;
  assertEquals(personalData.firstName, "John");
  assertEquals(personalData.lastName, "Doe");
  assertEquals(personalData.email, "john.doe@email.com");
  assertEquals(personalData.phone, "123-456-789");
  assertEquals(personalData.pesel, "12345678901");
  assertEquals(personalData.clothSize, "M");
  assertEquals(personalData.nip, 123456789);
  assertEquals(personalData.personalDataHistory?.length, 1);
}

function assertPersonalDataHistory(employee: IEmployee) {
  if (!employee.personalData.personalDataHistory) {
    throw new Error("personalDataHistory is not defined");
  }
  const history = employee.personalData.personalDataHistory[0];
  assertEquals(history.firstNameBefore, "John");
  assertEquals(history.firstNameAfter, "John");
  assertEquals(history.lastNameBefore, "Doe");
  assertEquals(history.lastNameAfter, "Doe");
  assertEquals(history.emailBefore, "john.doe@email.com");
  assertEquals(history.emailAfter, "john.doe@email.com");
  assertEquals(history.phoneBefore, "123-456-789");
  assertEquals(history.phoneAfter, "123-456-789");
  assertEquals(history.peselBefore, "12345678901");
  assertEquals(history.peselAfter, "12345678901");
  assertEquals(history.clothSizeBefore, "M");
  assertEquals(history.clothSizeAfter, "M");
  assertEquals(history.nipBefore, 123456789);
  assertEquals(history.nipAfter, 123456789);
  assertEquals(history.changeDate, new Date().toLocaleDateString());
}

function assertAddress1History(employee: IEmployee) {
  if (!employee.personalData.address1?.address1History) {
    throw new Error("address1History is not defined");
  }
  const history = employee.personalData.address1.address1History[0];
  assertEquals(history.street1Before, "street");
  assertEquals(history.street1After, "street");
  assertEquals(history.house1Before, "house");
  assertEquals(history.house1After, "house");
  assertEquals(history.city1Before, "city");
  assertEquals(history.city1After, "city");
  assertEquals(history.state1Before, "state");
  assertEquals(history.state1After, "state");
  assertEquals(history.zip1Before, "zip");
  assertEquals(history.zip1After, "zip");
  assertEquals(history.voivodeship1Before, "voivodeship");
  assertEquals(history.voivodeship1After, "voivodeship");
}

function assertAddress1(employee: IEmployee) {
  if (!employee.personalData.address1) {
    throw new Error("address1 is not defined");
  }
  const address1 = employee.personalData.address1;
  assertEquals(address1.street1, "street");
  assertEquals(address1.house1, "house");
  assertEquals(address1.city1, "city");
  assertEquals(address1.state1, "state");
  assertEquals(address1.zip1, "zip");
  assertEquals(address1.voivodeship1, "voivodeship");

  assertAddress1History(employee);
}

function assertAddress2(employee: IEmployee) {
  if (!employee.personalData.address2) {
    throw new Error("address2 is not defined");
  }
  const address2 = employee.personalData.address2;
  assertEquals(address2.street2, "street");
  assertEquals(address2.house2, "house");
  assertEquals(address2.city2, "city");
  assertEquals(address2.state2, "state");
  assertEquals(address2.zip2, "zip");
  assertEquals(address2.voivodeship2, "voivodeship");
  assertAddress2History(employee);
}

function assertAddress2History(employee: IEmployee) {
  if (!employee.personalData.address2?.address2History) {
    throw new Error("address2History is not defined");
  }
  const history = employee.personalData.address2.address2History[0];
  assertEquals(history.street2Before, "street");
  assertEquals(history.street2After, "street");
  assertEquals(history.house2Before, "house");
  assertEquals(history.house2After, "house");
  assertEquals(history.city2Before, "city");
  assertEquals(history.city2After, "city");
  assertEquals(history.state2Before, "state");
  assertEquals(history.state2After, "state");
  assertEquals(history.zip2Before, "zip");
  assertEquals(history.zip2After, "zip");
  assertEquals(history.voivodeship2Before, "voivodeship");
  assertEquals(history.voivodeship2After, "voivodeship");
  assertEquals(history.changeDate, new Date().toLocaleDateString());
}

function assertJobDetailsHistory(employee: IEmployee) {
  if (!employee.jobDetails?.jobDetailsHistory) {
    throw new Error("jobDetailsHistory is not defined");
  }
  const history = employee.jobDetails.jobDetailsHistory[0];
  assertEquals(history.statusBefore, "active");
  assertEquals(history.statusAfter, "active");
  assertEquals(history.jobTitleBefore, "developer");
  assertEquals(history.jobTitleAfter, "developer");
  assertEquals(history.departmentBefore, "IT");
  assertEquals(history.departmentAfter, "IT");
  assertEquals(history.startDateBefore, new Date().toLocaleDateString());
  assertEquals(history.startDateAfter, new Date().toLocaleDateString());
  assertEquals(history.endDateBefore, null);
  assertEquals(history.endDateAfter, null);
  assertEquals(history.contractTypeBefore, "b2b");
  assertEquals(history.contractTypeAfter, "b2b");
  assertEquals(history.workScheduleBefore, "full-time");
  assertEquals(history.workScheduleAfter, "full-time");
  assertEquals(history.insuranceTypeBefore, "commercial");
  assertEquals(history.insuranceTypeAfter, "commercial");
  assertEquals(history.annualLeaveDaysBefore, 26);
  assertEquals(history.annualLeaveDaysAfter, 26);
  assertEquals(history.changeDate, new Date().toLocaleDateString());
}

function assertJobStayAddressHistory(employee: IEmployee) {
  if (!employee.jobDetails?.jobStayAddress?.jobStayAddressHistory) {
    throw new Error("jobStayAddressHistory is not defined");
  }
  const history = employee.jobDetails.jobStayAddress.jobStayAddressHistory[0];
  assertEquals(history.streetBefore, "street");
  assertEquals(history.streetAfter, "street");
  assertEquals(history.houseBefore, "house");
  assertEquals(history.houseAfter, "house");
  assertEquals(history.cityBefore, "city");
  assertEquals(history.cityAfter, "city");
  assertEquals(history.stateBefore, "state");
  assertEquals(history.stateAfter, "state");
  assertEquals(history.zipBefore, "zip");
  assertEquals(history.zipAfter, "zip");
  assertEquals(history.voivodeshipBefore, "voivodeship");
  assertEquals(history.voivodeshipAfter, "voivodeship");
  assertEquals(history.changeDate, new Date().toLocaleDateString());
}

function assertJobStayAddress(employee: IEmployee) {
  if (!employee.jobDetails?.jobStayAddress) {
    throw new Error("jobStayAddress is not defined");
  }
  const jobStayAddress = employee.jobDetails.jobStayAddress;
  assertEquals(jobStayAddress.street, "street");
  assertEquals(jobStayAddress.house, "house");
  assertEquals(jobStayAddress.city, "city");
  assertEquals(jobStayAddress.state, "state");
  assertEquals(jobStayAddress.zip, "zip");
  assertEquals(jobStayAddress.voivodeship, "voivodeship");
  assertJobStayAddressHistory(employee);
}

function assertSalaryHistory(employee: IEmployee) {
  if (!employee.jobDetails?.salary?.salaryHistory) {
    throw new Error("salaryHistory is not defined");
  }
  const history = employee.jobDetails.salary.salaryHistory[0];
  assertEquals(history.baseSalaryBefore, 4000);
  assertEquals(history.baseSalaryAfter, 4000);
  assertEquals(history.currencyBefore, "EUR");
  assertEquals(history.currencyAfter, "EUR");
  assertEquals(history.hourlyRateBefore, 40);
  assertEquals(history.hourlyRateAfter, 40);
  assertEquals(history.bankAccountBefore, "12345678901234567890123456");
  assertEquals(history.bankAccountAfter, "12345678901234567890123456");
  assertEquals(history.bankNameBefore, "bank");
  assertEquals(history.bankNameAfter, "bank");
  assertEquals(history.changeDate, new Date().toLocaleDateString());
}

function assertSalary(employee: IEmployee) {
  if (!employee.jobDetails?.salary) {
    throw new Error("salary is not defined");
  }
  const salary = employee.jobDetails.salary;
  assertEquals(salary.baseSalary, 4000);
  assertEquals(salary.currency, "EUR");
  assertEquals(salary.hourlyRate, 40);
  assertEquals(salary.bankAccount, "12345678901234567890123456");
  assertEquals(salary.bankName, "bank");
  assertSalaryHistory(employee);
}

function assertJobDetailsData(employee: IEmployee) {
  if (!employee.jobDetails) {
    throw new Error("jobDetails is not defined");
  }
  const jobDetails = employee.jobDetails;
  assertEquals(jobDetails.status, "active");
  assertEquals(jobDetails.jobTitle, "developer");
  assertEquals(jobDetails.department, "IT");
  assertEquals(jobDetails.startDate, new Date().toLocaleDateString());
  assertEquals(jobDetails.endDate, null);
  assertEquals(jobDetails.contractType, "b2b");
  assertEquals(jobDetails.workSchedule, "full-time");
  assertEquals(jobDetails.insuranceType, "commercial");
  assertEquals(jobDetails.annualLeaveDays, 26);

  assertJobDetailsHistory(employee);
  assertJobStayAddress(employee);
  assertSalary(employee);
}
