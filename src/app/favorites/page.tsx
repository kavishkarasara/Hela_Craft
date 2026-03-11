"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Plus, Minus, ArrowRight, Star } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                    <Heart className="w-12 h-12 text-muted-foreground opacity-20" />
                </div>
                <h1 className="text-3xl font-bold mb-2">No favorites yet</h1>
                <p className="text-muted-foreground mb-8 text-center max-w-md">
                    Start exploring our collection of authentic Sri Lankan crafts and save the items you love!
                </p>
                <Button asChild rounded-full size="lg" className="px-8 h-12 font-bold shadow-xl">
                    <Link href="/">Explore Collection</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] py-16">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-4">My Favorites</h1>
                    <p className="text-muted-foreground">You have saved {favorites.length} {favorites.length === 1 ? 'item' : 'items'} to your wishlist.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {favorites.map((product) => (
                        <div key={product.id} className="group bg-white rounded-3xl border border-border/50 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                            <div className="relative aspect-square overflow-hidden bg-muted font-medium">
                                <Link href={`/product/${product.id}`} className="block w-full h-full">
                                    <Image
                                        src={product.img}
                                        alt={product.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <button
                                    onClick={() => toggleFavorite(product)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-red-500 hover:scale-110 transition-transform z-10"
                                >
                                    <Heart className="w-5 h-5 fill-current" />
                                </button>

                                {/* View Details Overlay */}
                                <div className="absolute bottom-6 left-6 right-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <Link href={`/product/${product.id}`}>
                                        <Button size="sm" variant="secondary" className="w-full rounded-full gap-2 shadow-2xl backdrop-blur bg-white/95 hover:bg-white font-black h-11 text-xs uppercase tracking-widest">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-2">
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1 italic">Handcrafted</p>
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="font-bold text-lg leading-tight hover:text-primary transition-colors line-clamp-1">{product.title}</h3>
                                    </Link>
                                    <p className="text-xs text-muted-foreground mt-1">By <span className="font-medium text-foreground">{product.artisan}</span></p>
                                </div>

                                <div className="mt-auto pt-4 flex items-center justify-between border-t">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-black text-primary">LKR {product.priceLKR.toLocaleString()}</span>
                                        <span className="text-[10px] text-muted-foreground">${product.priceUSD} USD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
