"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart, SlidersHorizontal, Search, ShoppingCart, Check, Info, Star, Plus, Minus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ALL_PRODUCTS, PAGE_SIZE } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

const TECHNIQUES = ["Batik", "Carving", "Metalwork", "Weaving", "Pottery"];
const REGIONS = ["Kandy", "Ambalangoda", "Batticaloa", "Galle", "Pilimathalawa"];

export default function ProductGrid() {
    const { items, addToCart, updateQuantity } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get("search") || "";
    const [search, setSearch] = useState(initialSearch);
    const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [addedIds, setAddedIds] = useState<string[]>([]);

    useEffect(() => {
        const query = searchParams.get("search");
        if (query !== null) {
            setSearch(query);
            setPage(1);
        }

        const cat = searchParams.get("category");
        if (cat) {
            setSelectedTechniques([cat]);
            setPage(1);
        } else {
            setSelectedTechniques([]);
        }
    }, [searchParams]);

    const toggleTechnique = (t: string) =>
        setSelectedTechniques((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

    const toggleRegion = (r: string) =>
        setSelectedRegions((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]);

    const filtered = useMemo(() => {
        return ALL_PRODUCTS.filter((p) => {
            const matchSearch = search.trim() === "" ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.artisan.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase());

            const matchTech = selectedTechniques.length === 0 || selectedTechniques.includes(p.technique);
            const matchRegion = selectedRegions.length === 0 || selectedRegions.some((r) => p.region.includes(r));
            return matchSearch && matchTech && matchRegion;
        });
    }, [search, selectedTechniques, selectedRegions]);

    const visible = filtered.slice(0, page * PAGE_SIZE);
    const hasMore = visible.length < filtered.length;

    const handleAddToCart = (prod: typeof ALL_PRODUCTS[0]) => {
        addToCart({
            id: Number(prod.id),
            title: prod.title,
            priceLKR: prod.priceLKR,
            priceUSD: prod.priceUSD,
            img: prod.img,
            artisan: prod.artisan
        });
        setAddedIds((prev) => [...prev, prod.id]);
        setTimeout(() => setAddedIds((prev) => prev.filter((x) => x !== prod.id)), 1500);
    };

    return (
        <section className="py-20 bg-[#FAFAFA]" id="products-section">
            <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-10">

                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 hidden md:block">
                    <div className="flex items-center gap-2 font-black text-xl border-b pb-6 uppercase tracking-wider">
                        <SlidersHorizontal className="h-5 w-5 text-primary" /> Filters
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-[0.2em]">Technique</h4>
                        <div className="flex flex-wrap lg:flex-col gap-2">
                            {TECHNIQUES.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => { toggleTechnique(item); setPage(1); }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all ${selectedTechniques.includes(item) ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105" : "bg-white border-border/50 hover:border-primary/50"}`}
                                >
                                    {selectedTechniques.includes(item) && <Check className="w-3 h-3" />}
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border/50">
                        <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-[0.2em]">Region</h4>
                        <div className="flex flex-wrap lg:flex-col gap-2">
                            {REGIONS.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => { toggleRegion(item); setPage(1); }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all ${selectedRegions.includes(item) ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105" : "bg-white border-border/50 hover:border-primary/50"}`}
                                >
                                    {selectedRegions.includes(item) && <Check className="w-3 h-3" />}
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {(selectedTechniques.length > 0 || selectedRegions.length > 0) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-muted-foreground hover:text-destructive gap-2 font-bold text-xs uppercase"
                            onClick={() => { setSelectedTechniques([]); setSelectedRegions([]); setPage(1); }}
                        >
                            <X className="w-3 h-3" /> Clear All Filters
                        </Button>
                    )}
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight mb-1">Our Collection</h2>
                            <p className="text-sm text-muted-foreground font-medium">Showing {filtered.length} authentic handcrafted items</p>
                        </div>
                        <div className="relative w-full sm:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                type="search"
                                placeholder="Search products, artisans..."
                                className="pl-11 h-12 rounded-full bg-white border-border/50 shadow-sm focus-visible:ring-primary focus-visible:border-primary/50 transition-all font-medium"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            />
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(selectedTechniques.length > 0 || selectedRegions.length > 0 || search) && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {search && (
                                <Badge variant="secondary" className="px-3 py-1.5 rounded-full gap-1.5 bg-primary/5 border-primary/20 text-primary font-bold">
                                    Search: {search} <X className="w-3 h-3 cursor-pointer" onClick={() => setSearch("")} />
                                </Badge>
                            )}
                            {selectedTechniques.map(t => (
                                <Badge key={t} variant="secondary" className="px-3 py-1.5 rounded-full gap-1.5 bg-primary/5 border-primary/20 text-primary font-bold">
                                    {t} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleTechnique(t)} />
                                </Badge>
                            ))}
                            {selectedRegions.map(r => (
                                <Badge key={r} variant="secondary" className="px-3 py-1.5 rounded-full gap-1.5 bg-primary/5 border-primary/20 text-primary font-bold">
                                    {r} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleRegion(r)} />
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Product Grid */}
                    {visible.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {visible.map((prod) => {
                                const cartItem = items.find(i => i.id === Number(prod.id));
                                const isAdded = addedIds.includes(prod.id);
                                const isFav = isFavorite(prod.id);

                                return (
                                    <div key={prod.id} className="group bg-white rounded-[2rem] border border-border/50 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                                        {/* Image Area */}
                                        <div className="relative aspect-square overflow-hidden bg-[#F8F8F8]">
                                            <Link href={`/product/${prod.id}`} className="block w-full h-full">
                                                <Image
                                                    src={prod.img}
                                                    alt={prod.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>

                                            {/* Badges */}
                                            <div className="absolute top-5 left-5 flex flex-col gap-2">
                                                {prod.isHandmade && (
                                                    <Badge className="bg-white/95 text-black hover:bg-white text-[10px] font-black border-none shadow-xl backdrop-blur px-3 py-1 rounded-full uppercase tracking-tighter">
                                                        Handmade
                                                    </Badge>
                                                )}
                                                {prod.isEco && (
                                                    <Badge className="bg-[#4CAF50]/90 text-white text-[10px] font-bold border-none shadow-xl backdrop-blur px-3 py-1 rounded-full uppercase tracking-tighter">
                                                        Eco-Ethical
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Favorite Toggle */}
                                            <button
                                                onClick={() => toggleFavorite({
                                                    id: prod.id,
                                                    title: prod.title,
                                                    priceLKR: prod.priceLKR,
                                                    priceUSD: prod.priceUSD,
                                                    img: prod.img,
                                                    artisan: prod.artisan
                                                })}
                                                className={`absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 backdrop-blur z-10 ${isFav ? "bg-red-500 text-white scale-110" : "bg-white/80 text-foreground hover:bg-white hover:scale-110"}`}
                                            >
                                                <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
                                            </button>

                                            {/* Quick View Button */}
                                            <div className="absolute bottom-6 left-6 right-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <Link href={`/product/${prod.id}`}>
                                                    <Button size="sm" variant="secondary" className="w-full rounded-full gap-2 shadow-2xl backdrop-blur bg-white/95 hover:bg-white font-black h-11 text-xs uppercase tracking-widest">
                                                        <Info className="w-4 h-4" /> View Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <CardContent className="p-7 flex-1 flex flex-col">
                                            <div className="mb-6 flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] italic">{prod.technique}</span>
                                                    <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                                                        <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" /> 4.9
                                                    </div>
                                                </div>
                                                <Link href={`/product/${prod.id}`}>
                                                    <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-1 mb-2">
                                                        {prod.title}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-muted-foreground font-medium">
                                                    By <Link href={`/artisan/${prod.artisanId}`} className="text-foreground font-bold hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4">{prod.artisan}</Link>
                                                </p>
                                            </div>

                                            {/* Price & Actions */}
                                            <div className="mt-auto space-y-5">
                                                <div className="flex flex-col leading-none">
                                                    <span className="text-2xl font-black text-primary">LKR {prod.priceLKR.toLocaleString()}</span>
                                                    <span className="text-xs text-muted-foreground mt-1.5 font-bold opacity-60">${prod.priceUSD} USD</span>
                                                </div>

                                                {cartItem ? (
                                                    <div className="flex items-center justify-between bg-primary/5 rounded-full p-1 border border-primary/20 animate-fade-in-up">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateQuantity(cartItem.id, -1)}
                                                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-destructive hover:text-white transition-all transform active:scale-90"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="text-lg font-black w-8 text-center">{cartItem.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(cartItem.id, 1)}
                                                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-all transform active:scale-90"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <Badge className="bg-primary text-white py-1.5 px-4 rounded-full font-black text-[10px] shadow-lg tracking-widest uppercase ml-auto mr-1">
                                                            In Cart
                                                        </Badge>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        className="w-full rounded-full h-14 font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all gap-3 overflow-hidden group/btn relative"
                                                        onClick={() => handleAddToCart(prod)}
                                                    >
                                                        <ShoppingCart className="w-5 h-5" />
                                                        {isAdded ? "Added to Cart!" : "Add to Cart"}
                                                        {isAdded && (
                                                            <div className="absolute inset-0 bg-green-600 flex items-center justify-center gap-2 animate-slide-in-up">
                                                                <Check className="w-5 h-5" /> Got it!
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-border flex flex-col items-center">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                                <Search className="w-10 h-10 text-muted-foreground opacity-20" />
                            </div>
                            <h3 className="text-2xl font-black mb-2 italic">Nothing found...</h3>
                            <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                                We couldn't find any items matching your current filters.
                            </p>
                            <Button variant="outline" className="rounded-full px-8 font-bold" onClick={() => { setSearch(""); setSelectedTechniques([]); setSelectedRegions([]); }}>
                                Reset All Filters
                            </Button>
                        </div>
                    )}

                    {/* Pagination / Load More */}
                    {hasMore && (
                        <div className="mt-16 flex justify-center">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full gap-3 h-14 px-10 font-black uppercase tracking-widest border-2 hover:border-primary hover:text-primary transition-all group"
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Load More Crafts
                                <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
