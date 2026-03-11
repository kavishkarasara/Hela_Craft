import { NextResponse } from "next/server";

// In-memory store for demo registrations (no DB required for prototype)
const registeredUsers: Array<{ id: string; name: string; email: string; role: string }> = [];

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Try DB registration if available
        try {
            const { default: prisma } = await import("@/lib/prisma");
            const bcrypt = await import("bcryptjs");

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return NextResponse.json({ message: "User already exists" }, { status: 409 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: { name, email, password: hashedPassword, role: role as any },
            });

            if (role === "VENDOR") {
                await prisma.shop.create({
                    data: { name: `${user.name}'s Shop`, vendorId: user.id },
                });
            }

            return NextResponse.json(
                { message: "User registered successfully" },
                { status: 201 }
            );
        } catch (dbError) {
            // DB not available — use in-memory demo store
            const { findDemoUser, addDemoUser } = await import("@/lib/demoStore");

            const existing = findDemoUser(email);
            if (existing) {
                return NextResponse.json({ message: "User already exists" }, { status: 409 });
            }

            addDemoUser({ id: `demo-${Date.now()}`, name, email, password, role });

            return NextResponse.json(
                { message: "Database offline. Created a temporary demo account for this session." },
                { status: 201 }
            );
        }
    } catch {
        return NextResponse.json(
            { message: "An error occurred during registration" },
            { status: 500 }
        );
    }
}
