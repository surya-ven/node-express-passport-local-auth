export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}

export const users: Array<User> = [
  {
    id: '1642920981969',
    name: 'John',
    email: 'john@google.com',
    password: '$2b$10$mGZ1NsMYFr76bFjSYCTUN.JwvbtaOBR9Jl045PpHPHO1Y0K/ryPL.'
  },
  {
    id: '1642920992390',
    name: 'Jane',
    email: 'jane@google.com',
    password: '$2b$10$D0gxzWJprq9qCEL3v.o9SeOS.ZmMHq2UWXccswGw.NL5DAkBlnJ2K'
  }
];