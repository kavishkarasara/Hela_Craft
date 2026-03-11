"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CartSheet({ children }: { children: React.ReactNode }) {
    const { items, updateQuantity, removeFromCart, totalItems, clearCart } = useCart();
    const { data: session } = useSession();

    const totalLKR = items.reduce((sum, item) => sum + item.priceLKR * item.quantity, 0);
    const totalUSD = items.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] h-full flex flex-col p-0 gap-0 rounded-none border-l right-0 left-auto translate-x-0 data-[state=open]:slide-in-from-right duration-300">
                <DialogHeader className="p-6 border-b shrink-0">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-primary" />
                            Your Cart
                            {totalItems > 0 && (
                                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                                </span>
                            )}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                                <ShoppingCart className="w-10 h-10" />
                            </div>
                            <div>
                                <p className="font-semibold text-lg">Your cart is empty</p>
                                <p className="text-sm">Start adding some authentic crafts to your cart!</p>
                            </div>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0 border border-border/50">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">By {item.artisan}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border rounded-full overflow-hidden">
                                            <button
                                                className="p-1 hover:bg-muted transition-colors"
                                                onClick={() => updateQuantity(item.id, -1)}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-xs font-semibold px-2 w-6 text-center">{item.quantity}</span>
                                            <button
                                                className="p-1 hover:bg-muted transition-colors"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm font-bold">LKR {(item.priceLKR * item.quantity).toLocaleString()}</div>
                                            <div className="text-[10px] text-muted-foreground">${(item.priceUSD * item.quantity).toFixed(2)} USD</div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="p-1 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t bg-muted/30 shrink-0 space-y-4">
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium text-muted-foreground">LKR {totalLKR.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                                <span className="font-bold text-lg">Total</span>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-primary">LKR {totalLKR.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground font-medium">${totalUSD.toFixed(2)} USD</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            {session ? (
                                <Button className="w-full rounded-full h-12 text-lg font-bold shadow-xl hover:-translate-y-0.5 transition-all gap-2" onClick={() => alert("Checkout flow coming soon!")}>
                                    Proceed to Checkout <ArrowRight className="w-5 h-5" />
                                </Button>
                            ) : (
                                <div className="space-y-3">
                                    <Button className="w-full rounded-full h-12 text-lg font-bold shadow-xl hover:-translate-y-0.5 transition-all gap-2" asChild>
                                        <Link href="/login">Login to Checkout <ArrowRight className="w-5 h-5" /></Link>
                                    </Button>
                                    <p className="text-[10px] text-center text-muted-foreground">
                                        You can still add items as a guest, but an account is required for secure processing.
                                    </p>
                                </div>
                            )}
                            <Button variant="ghost" className="w-full text-xs text-muted-foreground" onClick={clearCart}>
                                Clear entire cart
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
