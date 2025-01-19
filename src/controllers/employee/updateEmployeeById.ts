import Employee, { IEmployee } from "../../model/IEmployee.ts";
import { connectDb } from "../../database/connectDb.ts";
import { Context, TypedResponse } from "hono";

export const updateEmployeeById = async (
  c: Context,
): Promise<TypedResponse> => {
  console.log("Requesting to update employee");
  try {
    await connectDb();

    const id = c.req.param("id");

    if (!id) {
      return c.json({ message: "ID is required" }, 400);
    }

    const data = await c.req.json();

    const employee: IEmployee | null = await Employee.findById(id);

    if (!employee) {
      return c.json({ message: "Employee not found" }, 404);
    }

    console.log("Updating employee data");
    updateEmployeeData(employee, data);

    await employee.save();

    return c.json({ message: "Employee updated" }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};

const updateEmployeeData = (employee: IEmployee, data: any) => {
  if (data.personalData) {
    employee.personalData = {
      ...employee.personalData,
      ...data.personalData,
      address1: {
        ...employee.personalData.address1,
        ...data.personalData.address1,
      },
      address2: {
        ...employee.personalData.address2,
        ...data.personalData.address2,
      },
    };
  }

  if (data.jobDetails) {
    employee.jobDetails = {
      ...employee.jobDetails,
      ...data.jobDetails,
    };
  } else {
    employee.jobDetails = data.jobDetails;
  }

  if (data.jobDetails?.salary) {
    const existingSalaryHistory = employee.jobDetails?.salary?.salaryHistory ||
      [];
    const newSalaryHistory = data.jobDetails.salary.salaryHistory || [];

    const mergedSalaryHistory = [
      ...existingSalaryHistory,
      ...newSalaryHistory,
    ];

    const uniqueSalaryHistory = Array.from(
      new Map(mergedSalaryHistory.map((item) => [item.changeDate, item]))
        .values(),
    );

    let uniqueJobStayAddressHistory = null;

    if (data.jobDetails?.jobStayAddress) {
      const existingJobStayAddressHistory = employee.jobDetails?.jobStayAddress?.jobStayAddressHistory || [];
      const newJobStayAddressHistory = data.jobDetails.jobStayAddressHistory || [];

      const mergedJobStayAddressHistory = [
        ...existingJobStayAddressHistory,
        ...newJobStayAddressHistory,
      ];

      uniqueJobStayAddressHistory = Array.from(
          new Map(mergedJobStayAddressHistory.map((item) => [item.changeDate, item]))
              .values(),
      );
    }

    employee.jobDetails = {
      ...employee.jobDetails,
      jobStayAddress: {
        ...employee.jobDetails?.jobStayAddress,
        ...data.jobDetails?.jobStayAddress,
        jobStayAddressHistory: uniqueJobStayAddressHistory,
      },
      salary: {
        ...employee.jobDetails?.salary,
        ...data.jobDetails.salary,
        salaryHistory: uniqueSalaryHistory,
      },
    };
  }
};
