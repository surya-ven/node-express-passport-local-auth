declare global {
    namespace NodeJS {
    interface ProcessEnv {
            NODE_ENV: string;
            SESSION_SECRET: string;
        }
    }
}

export {};