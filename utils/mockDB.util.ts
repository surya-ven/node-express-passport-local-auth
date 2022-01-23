export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}

export const users: Array<User> = [
    {
        id: "1",
        name: "John Doe",
        email: "john@google.com",
        password: "123456"
    },
    {
        id: "2",
        name: "Jane Doe",
        email: "jane@google.com",
        password: "123456"
    }
];