import { Context, TypedResponse } from "hono";
import Timesheet from "../../model/ITimesheet.ts";
import { connectDb } from "../../database/connectDb.ts";

export const getAnnualLeavesByYear = async (
  c: Context,
): Promise<TypedResponse> => {
  try {
    await connectDb();

    const year = c.req.param("year");

    if (!year) {
      return c.json({ error: "Year is required" }, 400);
    }

    const result = await Timesheet.aggregate([
      { $match: { year: parseInt(year) } },
      { $unwind: "$days" },
      { $match: { "days.dayOff.isDayOff": true } },
      {
        $group: {
          _id: "$_id",
          employeeId: { $first: "$employeeId" },
          month: { $first: "$month" },
          days: { $push: { day: "$days.day", dayOff: "$days.dayOff"} },
        },
      },
      {
        $match: {
          days: { $not: { $elemMatch: { "dayOff.isDayOff": false } } },
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          employeeId: { $first: "$employeeId" },
          month: { $first: "$month" },
          days: { $push: "$days" },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    if (!result || result.length === 0) {
      return c.json({ error: "No annual leaves found" }, 404);
    }

    return c.json({ result }, 200);
  } catch (error) {
    console.error("Error fetching annual leaves:", (error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};
