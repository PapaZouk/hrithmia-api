import mongoose from "mongoose";
import {stub} from "jsr:@std/testing/mock";

export const beforeAllSetup = () => {
  stub(mongoose, "connect", () => Promise.resolve(mongoose));
  stub(console, "log");
  stub(console, "error");
};