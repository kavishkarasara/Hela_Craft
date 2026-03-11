"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t bg-background pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
                                HC
                            </div>
                            <span className="text-xl font-semibold tracking-tight">Hela Crafts</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Empowering Sri Lankan artisans by connecting their authentic, handmade crafts with the world.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Shop Categories</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/?category=Batik" className="hover:text-primary transition-colors">Batik</Link></li>
                            <li><Link href="/?category=Carving" className="hover:text-primary transition-colors">Woodcarving</Link></li>
                            <li><Link href="/?category=Metalwork" className="hover:text-primary transition-colors">Brassware</Link></li>
                            <li><Link href="/?category=Weaving" className="hover:text-primary transition-colors">Hand-weaving</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/register?role=VENDOR" className="hover:text-primary transition-colors">Become a Vendor</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Newsletter</h4>
                        <p className="text-muted-foreground text-sm mb-4">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Hela Crafts Platform. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                        <Link href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                        <Link href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
