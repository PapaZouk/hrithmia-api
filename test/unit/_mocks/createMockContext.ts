import { Context, TypedResponse } from "hono";

export function createMockContext(mockRequestBody: object, param: string) {
    return {
        req: {
            json: () => mockRequestBody,
            // deno-lint-ignore no-unused-vars
            param: (name: string) => param,
        },
        // deno-lint-ignore no-explicit-any
        json: (data: any, status: number) => {
            return {
                _data: data,
                _status: status,
                _format: "json",
            } as TypedResponse;
        },
    } as unknown as Context;
}