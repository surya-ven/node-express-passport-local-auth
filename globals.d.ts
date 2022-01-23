namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        SESSION_SECRET: string;
    }
}

namespace Express {
    interface User {
        id: string;
        name: string;
    }
}