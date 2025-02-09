import {DeleteResult, Query} from "mongoose";

export function createDeleteQueryResultMock(mockResponse: DeleteResult): Query<DeleteResult, any> {
    return {
        exec: () => Promise.resolve(mockResponse),
        then: function (resolve: (arg0: DeleteResult) => void) {
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
    } as unknown as Query<DeleteResult, any>;
}