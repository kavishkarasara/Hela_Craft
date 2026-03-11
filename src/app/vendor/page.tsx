"use client";

import { BarChart3, Package, ShoppingBag, MessageSquare, Plus, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VendorDashboard() {
    const stats = [
        { label: "Total Revenue (LKR)", value: "LKR 425,000", change: "+12.5%", icon: BarChart3 },
        { label: "Total Revenue (USD)", value: "$1,450", change: "+8.2%", icon: BarChart3 },
        { label: "Active Orders", value: "14", change: "+2", icon: ShoppingBag },
        { label: "Custom Requests", value: "5", change: "2 pending", icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA] py-8">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Artisan Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage your shop, products, and incoming orders.</p>
                    </div>
                    <Button className="gap-2 shadow-md">
                        <Plus className="w-4 h-4" /> Add New Product
                    </Button>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                                    <Icon className="w-4 h-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center text-emerald-600 font-medium">
                                        {stat.change} from last month
                                        <ArrowUpRight className="w-3 h-3 ml-1" />
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Recent Orders */}
                    <Card className="lg:col-span-2 shadow-sm border-border/50">
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>You have 3 orders requiring fulfillment.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[1, 2, 3].map((order) => (
                                    <div key={order} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                #{order}
                                            </div>
                                            <div>
                                                <p className="font-semibold">Royal Kandyan Batik Saree</p>
                                                <p className="text-sm text-muted-foreground">Order ID: ORD-2026-{order}4X</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">LKR 25,000</p>
                                            <Button variant="outline" size="sm" className="mt-1 h-7 text-xs">Fulfill Order</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Custom Requests */}
                    <Card className="shadow-sm border-border/50">
                        <CardHeader>
                            <CardTitle>Custom Requests</CardTitle>
                            <CardDescription>Messages from customers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { name: "John Doe", req: "Can you make this in blue?", time: "2h ago" },
                                    { name: "Alice Smith", req: "I need 5 wooden elephants.", time: "1d ago" }
                                ].map((req, i) => (
                                    <div key={i} className="p-3 rounded-lg border bg-muted/30">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="font-semibold text-sm">{req.name}</p>
                                            <span className="text-xs text-muted-foreground">{req.time}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3 leading-snug">&quot;{req.req}&quot;</p>
                                        <Button variant="secondary" size="sm" className="w-full text-xs">Reply & Quote</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
