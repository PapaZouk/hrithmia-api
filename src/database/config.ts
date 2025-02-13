interface databaseConfig {
    username?: string;
    password?: string;
    cluster?: string;
    port?: number;
    appName?: string;
    settings?: string;
    url: string;
}

export const getDbConfig = () => {
    const env = Deno.env.get("ENV") || "";

    let username: string;
    let password: string;
    let cluster: string;
    let port: number;
    let appName: string;
    let settings: string;
    let url: string;

    if (env === "production") {
        username = Deno.env.get("DB_USERNAME") || '';
        password = Deno.env.get("DB_PASSWORD") || '';
        cluster = Deno.env.get("DB_CLUSTER") || '';
        port = parseInt(Deno.env.get("DB_PORT") || "") || 8000;
        appName = Deno.env.get("DB_APP_NAME") || '';
        settings = 'retryWrites=true&w=majority';
        url = `mongodb+srv://${username}:${password}@${cluster}/${appName}?${settings}&appName=${appName}`;
    } else {
        console.log("Using local db");
        url = 'mongodb://localhost:27017';
        return { url };
    }

    return {
        username,
        password,
        cluster,
        port,
        appName,
        settings,
        url,
    } as databaseConfig;
};
