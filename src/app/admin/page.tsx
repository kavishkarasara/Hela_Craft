"use client";

import { Users, Store, Banknote, ShieldAlert, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Artisans", value: "84", icon: Store },
        { label: "Total Customers", value: "1,240", icon: Users },
        { label: "Platform Commision", value: "LKR 845,000", icon: Banknote },
        { label: "Pending Approvals", value: "12", icon: ShieldAlert },
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA] py-8">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Super Admin Portal</h1>
                    <p className="text-muted-foreground mt-1">Platform overview and vendor management.</p>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={i} className="border-border/50 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                                    <Icon className="w-4 h-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Vendor Approvals */}
                    <Card className="shadow-sm border-border/50">
                        <CardHeader>
                            <CardTitle>Pending Artisan Approvals</CardTitle>
                            <CardDescription>Review and approve new vendors joining the platform.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { name: "Saman Crafts", type: "Woodcarving", location: "Ambalangoda" },
                                    { name: "Cinnamon Weavers", type: "Weaving", location: "Galle" },
                                    { name: "Heritage Brass", type: "Brassware", location: "Kandy" },
                                ].map((vendor, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                                        <div>
                                            <h4 className="font-semibold flex items-center gap-2">
                                                {vendor.name} <Badge variant="secondary" className="text-[10px]">{vendor.type}</Badge>
                                            </h4>
                                            <p className="text-sm text-muted-foreground">{vendor.location}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"><CheckCircle className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10"><XCircle className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Platform Transactions */}
                    <Card className="shadow-sm border-border/50">
                        <CardHeader>
                            <CardTitle>Recent Platform Commissions</CardTitle>
                            <CardDescription>Latest successfully delivered orders.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((tx) => (
                                    <div key={tx} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-semibold text-sm">Order #ORD-2026-{tx}9{tx}X</p>
                                            <p className="text-xs text-muted-foreground">Artisan: Kumari Weavers</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm text-primary">+LKR {(tx * 450).toLocaleString()}</p>
                                            <p className="text-[10px] text-muted-foreground">5% Cut</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-6">View Full Ledger</Button>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
