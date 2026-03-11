"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, ShieldCheck, Leaf, PenTool, ShoppingCart, Check, ArrowLeft, Star, MapPin, Sparkles, Brush } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProductReviews from "@/components/ProductReviews";

export default function ProductDetailClient({ product, artisan }: { product: any, artisan: any }) {
    const { items, addToCart, updateQuantity } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [activeImg, setActiveImg] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [isZoomed, setIsZoomed] = useState(false);

    const cartItem = items.find(i => i.id === Number(product.id));
    const isFav = isFavorite(product.id);

    const images = product.gallery || [product.img];

    const handleAddToCart = () => {
        addToCart({
            id: Number(product.id),
            title: product.title,
            priceLKR: product.priceLKR,
            priceUSD: product.priceUSD,
            img: product.img,
            artisan: product.artisan,
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                        <ArrowLeft className="w-3 h-3" /> Back to Collection
                    </Link>
                    <span className="mx-3 opacity-30">|</span>
                    <span className="text-foreground font-medium truncate">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Gallery */}
                    <div className="space-y-6">
                        <div
                            className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-border/50 shadow-2xl cursor-zoom-in"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => {
                                setIsZoomed(false);
                                setZoomPos({ x: 50, y: 50 });
                            }}
                        >
                            <div
                                className="w-full h-full transition-transform duration-500 ease-out will-change-transform"
                                style={{
                                    transform: isZoomed ? `scale(2.5)` : `scale(1)`,
                                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                                }}
                            >
                                <Image src={images[activeImg]} alt={product.title} fill className="object-cover" priority />
                            </div>
                            <div className="absolute top-6 left-6 flex flex-col gap-3">
                                {product.isHandmade && (
                                    <Badge className="bg-white/95 text-black hover:bg-white text-xs border-none font-bold shadow-xl px-4 py-1.5 rounded-full uppercase tracking-wider backdrop-blur">
                                        Handmade
                                    </Badge>
                                )}
                                {product.isEco && (
                                    <Badge className="bg-[#4CAF50] text-white hover:bg-[#45a049] text-xs border-none font-bold shadow-xl px-4 py-1.5 rounded-full uppercase tracking-wider">
                                        Eco-Friendly
                                    </Badge>
                                )}
                            </div>
                            <button
                                onClick={() => toggleFavorite({
                                    id: product.id,
                                    title: product.title,
                                    priceLKR: product.priceLKR,
                                    priceUSD: product.priceUSD,
                                    img: product.img,
                                    artisan: product.artisan
                                })}
                                className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 backdrop-blur ${isFav ? "bg-red-500 text-white scale-110" : "bg-white/80 text-foreground hover:bg-white hover:scale-110"}`}
                            >
                                <Heart className={`w-6 h-6 ${isFav ? "fill-current" : ""}`} />
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImg(idx)}
                                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImg === idx ? "border-primary shadow-lg scale-95" : "border-transparent opacity-60 hover:opacity-100 hover:border-primary/30"}`}
                                >
                                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col">
                        <div className="mb-8 border-b pb-8">
                            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">
                                <Sparkles className="w-4 h-4" /> Authentic Heritage
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-foreground leading-[1.1]">{product.title}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl font-black text-primary">LKR {product.priceLKR.toLocaleString()}</span>
                                <div className="h-8 w-px bg-border/50"></div>
                                <span className="text-xl text-muted-foreground font-medium">${product.priceUSD} USD</span>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed font-light">{product.description}</p>
                        </div>

                        {/* Artisan Mini Card */}
                        <Link href={`/artisan/${artisan.id}`}>
                            <Card className="mb-10 hover:shadow-2xl transition-all duration-500 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden group cursor-pointer">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-background shadow-xl ring-2 ring-primary/5">
                                            <Image src={artisan.avatar} alt={artisan.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-1">Master Artisan</p>
                                            <p className="text-xl font-bold flex items-center gap-1.5">
                                                {artisan.name} <ShieldCheck className="w-5 h-5 text-primary" />
                                            </p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3" /> {artisan.location.split(',')[0]}</div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" /> {artisan.stats.rating}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Stats/Specs */}
                        <div className="grid grid-cols-3 gap-6 mb-10">
                            {[
                                { label: "Material", value: product.material, icon: PenTool },
                                { label: "Technique", value: product.technique, icon: Brush },
                                { label: "Region", value: product.region.split(',')[0], icon: MapPin },
                            ].map((spec, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                                        <spec.icon className="w-3 h-3" /> {spec.label}
                                    </div>
                                    <div className="font-bold text-sm truncate">{spec.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-auto space-y-4">
                            {cartItem ? (
                                <div className="flex items-center gap-4 p-1 bg-muted rounded-full w-full sm:w-fit animate-fade-in-up">
                                    <div className="flex items-center gap-2 px-6">
                                        <button
                                            onClick={() => updateQuantity(cartItem.id, -1)}
                                            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-destructive hover:text-white transition-all"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-xl font-black w-10 text-center">{cartItem.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(cartItem.id, 1)}
                                            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <Badge className="bg-primary text-white py-2 px-6 rounded-full font-bold text-sm shadow-lg whitespace-nowrap">
                                        In Cart
                                    </Badge>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        size="lg"
                                        className="flex-1 h-14 rounded-full text-lg font-black shadow-2xl hover:-translate-y-1 transition-all gap-3 overflow-hidden group relative"
                                        onClick={handleAddToCart}
                                    >
                                        <ShoppingCart className="w-6 h-6" /> Add to Cart
                                        {showSuccess && (
                                            <div className="absolute inset-0 bg-green-600 flex items-center justify-center gap-2 animate-slide-in-up">
                                                <Check className="w-6 h-6" /> Got it!
                                            </div>
                                        )}
                                    </Button>

                                    <CustomOrderModal product={product} artisan={artisan} />
                                </div>
                            )}


                            <p className="text-center sm:text-left text-xs text-muted-foreground flex items-center gap-1.5 px-4">
                                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                                Certified Authentic Artisan Product from Sri Lanka
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <ProductReviews reviews={product.reviews} />
            </div>
        </div>
    );
}

// Re-using common icons
function Plus({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>;
}

function Minus({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>;
}

function CustomOrderModal({ product, artisan }: { product: any, artisan: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setIsOpen(false);
            setSubmitted(false);
        }, 3000);
    };

    if (!isOpen) {
        return (
            <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-full px-8 font-bold border-border hover:bg-muted transition-all gap-2"
                onClick={() => setIsOpen(true)}
            >
                <PenTool className="w-4 h-4" /> Custom Order
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
                <div className="p-8">
                    {submitted ? (
                        <div className="py-12 text-center animate-in zoom-in-50 duration-500">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-black mb-2">Request Sent!</h3>
                            <p className="text-muted-foreground">
                                {artisan.name} has been notified of your custom request. They will contact you shortly!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-black mb-1">Request Customization</h3>
                                    <p className="text-sm text-muted-foreground font-medium">For: {product.title}</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-white transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Describe your request</label>
                                    <textarea
                                        required
                                        placeholder="Specific dimensions, colors, or engravings..."
                                        className="w-full h-32 p-4 rounded-2xl bg-muted/50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none font-medium"
                                    ></textarea>
                                </div>

                                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                        <Image src={artisan.avatar} alt={artisan.name} width={48} height={48} className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">Master Craftsman</p>
                                        <p className="text-sm font-bold">{artisan.name} will review this</p>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full h-14 rounded-full font-black uppercase tracking-widest shadow-xl">
                                    Send Request to Artisan
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function X({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
}

