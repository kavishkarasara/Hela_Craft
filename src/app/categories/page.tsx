"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Palette, Hammer, Brush, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
    {
        name: "Batik",
        description: "Intricate wax-resist dyeing on fine cotton and silk, featuring traditional Sri Lankan motifs.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop",
        icon: Palette,
        count: 12,
        color: "bg-blue-500"
    },
    {
        name: "Carving",
        description: "Masterpieces of woodcarving, from ceremonial Raksha masks to detailed animal figurines.",
        image: "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=800&h=600&fit=crop",
        icon: Hammer,
        count: 18,
        color: "bg-amber-700"
    },
    {
        name: "Metalwork",
        description: "Traditional brassware and silver filigree crafted using centuries-old techniques.",
        image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=600&fit=crop",
        icon: Sparkles,
        count: 9,
        color: "bg-yellow-600"
    },
    {
        name: "Weaving",
        description: "Handwoven Dumbara mats and palmyrah baskets reflecting the island's natural heritage.",
        image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&h=600&fit=crop",
        icon: Brush,
        count: 15,
        color: "bg-emerald-600"
    },
    {
        name: "Pottery",
        description: "Earth-born vessels and decorative ceramics fired in traditional Sri Lankan kilns.",
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop",
        icon: Layers,
        count: 7,
        color: "bg-orange-600"
    }
];

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16">
                    <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/5 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">Discovery</Badge>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Explore by Craft</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium opacity-80">
                        Journey through the diverse artisanal traditions of Sri Lanka.
                        Each category represents a unique heritage preserved across generations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {CATEGORIES.map((cat, i) => (
                        <Link href={`/?category=${cat.name}`} key={i} className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-border/40 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute top-6 left-6">
                                    <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center text-white shadow-2xl`}>
                                        <cat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-3xl font-black text-white mb-1">{cat.name}</h3>
                                    <p className="text-white/70 text-sm font-bold uppercase tracking-widest">{cat.count} Original Items</p>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col justify-between">
                                <p className="text-muted-foreground leading-relaxed mb-8 font-medium italic">
                                    &quot;{cat.description}&quot;
                                </p>
                                <div className="flex items-center text-primary font-black uppercase tracking-widest text-xs gap-2 group/link">
                                    View Collection
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-300">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
