import { Aggregate } from "mongoose";

export function createAggregateMock<T>(mockResponse: any): Aggregate<T[]> {
  return {
    exec: () => Promise.resolve(mockResponse),
    then: function (resolve: (arg0: T[]) => void) {
      resolve(mockResponse);
      return this;
    },
    catch: function () {
      return this;
    },
    [Symbol.toStringTag]: 'Aggregate'
  } as unknown as Aggregate<T[]>;
}