"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = searchParams.get("role") || "CUSTOMER";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: initialRole,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Registration failed.");
            }

            router.push("/login?registered=true");
        } catch (error) {
            const err = error as Error;
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#FAFAFA] px-4 py-12">
            <Card className="w-full max-w-md shadow-xl border-border/50">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
                    <CardDescription>
                        Join Hela Crafts to discover or sell authentic Sri Lankan artistry.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="name">Full Name</label>
                            <Input
                                id="name"
                                placeholder="Nimal Perera"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">I want to...</label>
                            <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val || "CUSTOMER" })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CUSTOMER">Buy Authentic Crafts</SelectItem>
                                    <SelectItem value="VENDOR">Sell My Handicrafts (Artisan)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? "Creating account..." : "Sign up"}
                        </Button>
                        <div className="text-sm text-center text-muted-foreground w-full">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
