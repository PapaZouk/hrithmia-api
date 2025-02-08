import {Query} from "mongoose";

export function createQueryMock<T>(mockResponse: any, entity: T): Query<T[], T> {
    return {
        exec: () => Promise.resolve(mockResponse),
        then: function (resolve: (arg0: object[]) => void) {
            resolve(mockResponse);
            return this;
        },
        catch: function () {
            return this;
        },
        where: function () {
            return this;
        },
        [Symbol.toStringTag]: 'Query'
    } as unknown as Query<typeof entity[], typeof entity>;
}