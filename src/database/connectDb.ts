import mongoose, {ConnectOptions} from "mongoose";
import {getDbConfig} from "./config.ts";

let isConnected: boolean = false;

export function getIsConnected(): boolean {
    return isConnected;
}

export function setIsConnected(value: boolean): void {
    isConnected = value;
}

export async function connectDb(): Promise<void> {
    if (isConnected) {
        return;
    }

    const config = getDbConfig();

    try {
        mongoose.set('debug', true);
        await mongoose.connect(config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            allowPartialTrustChain: true,
        } as unknown as ConnectOptions);
        setIsConnected(true);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to DB: ", error);
        setIsConnected(false);
        throw error;
    }
}
