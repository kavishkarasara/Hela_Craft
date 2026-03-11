// Shared in-memory store for demo registrations (no DB required for prototype)
// Note: This resets when the server restarts.

export interface DemoUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
}

// Using a global variable to persist across hot-reloads in development
const globalForDemo = global as unknown as { demoUsers: DemoUser[] };

export const demoUsers = globalForDemo.demoUsers || [
    { id: "admin-1", name: "Super Admin", email: "admin@helacrafts.com", password: "admin123", role: "SUPERADMIN" },
    { id: "vendor-1", name: "Champa Silva", email: "champa@helacrafts.com", password: "vendor123", role: "VENDOR" },
    { id: "customer-1", name: "John Perera", email: "john@example.com", password: "customer123", role: "CUSTOMER" },
];

if (process.env.NODE_ENV !== "production") globalForDemo.demoUsers = demoUsers;

export const addDemoUser = (user: DemoUser) => {
    if (!demoUsers.find(u => u.email === user.email)) {
        demoUsers.push(user);
    }
};

export const findDemoUser = (email: string) => {
    return demoUsers.find(u => u.email === email);
};
