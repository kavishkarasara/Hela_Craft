"use client";

import Link from "next/link";
import { Search, ShoppingCart, User as UserIcon, LogOut, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartSheet from "./CartSheet";

export default function Navbar() {
    const { data: session } = useSession();
    const { totalItems } = useCart();
    const { totalFavorites } = useFavorites();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                            HC
                        </div>
                        <span className="text-xl font-semibold tracking-tight">Hela Crafts</span>
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search for authentic crafts..."
                        className="w-full pl-9 bg-muted/50 border-transparent focus-visible:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-4 text-sm font-medium mr-4">
                        <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                        <Link href="/artisans" className="hover:text-primary transition-colors">Artisans</Link>
                    </div>

                    <Link href="/favorites">
                        <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-muted">
                            <Heart className="h-5 w-5" />
                            {totalFavorites > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                                    {totalFavorites}
                                </span>
                            )}
                        </Button>
                    </Link>

                    <CartSheet>
                        <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-muted">
                            <ShoppingCart className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                                    {totalItems > 9 ? "9+" : totalItems}
                                </span>
                            )}
                        </Button>
                    </CartSheet>


                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                                    <UserIcon className="h-4 w-4" />
                                    {session.user?.name?.split(' ')[0] || "Account"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {session.user.role === "SUPERADMIN" && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin">Admin Dashboard</Link>
                                    </DropdownMenuItem>
                                )}

                                {session.user.role === "VENDOR" && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/vendor">Artisan Dashboard</Link>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuItem asChild>
                                    <Link href="/profile">Profile Info</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/orders">My Orders</Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={() => signOut()}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden sm:flex items-center gap-2">
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href="/register">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}
