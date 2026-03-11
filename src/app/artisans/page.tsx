"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Award, Star, ChevronRight } from "lucide-react";
import { ALL_ARTISANS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ArtisansListingPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16">
                    <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Our Community</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Meet the Artisans of Sri Lanka</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Every piece in our collection tells a story of heritage, skill, and passion.
                        Meet the master craftsmen and women who preserve the ancient arts of our island.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ALL_ARTISANS.map((artisan) => (
                        <Link href={`/artisan/${artisan.id}`} key={artisan.id}>
                            <Card className="group overflow-hidden border-border/40 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 bg-background h-full">
                                <div className="relative h-48 w-full bg-muted overflow-hidden">
                                    <Image
                                        src={artisan.cover}
                                        alt={artisan.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-xs font-semibold">
                                        <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                                        <span>{artisan.stats.rating} Artisan Rating</span>
                                    </div>
                                </div>

                                <CardContent className="p-0 relative">
                                    <div className="px-6 pb-8">
                                        <div className="relative -mt-10 mb-5">
                                            <div className="relative w-20 h-20 rounded-full border-4 border-background overflow-hidden shadow-lg">

                                                <Image src={artisan.avatar} alt={artisan.name} fill className="object-cover" />
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{artisan.name}</h3>
                                                <Badge className="bg-primary/5 text-primary border-primary/10 hover:bg-primary/10">{artisan.role}</Badge>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                                <MapPin className="w-3 h-3" /> {artisan.location}
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                                            {artisan.bio}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-border/40">
                                            <div className="flex items-center gap-4">
                                                <div className="text-center">
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Sales</p>
                                                    <p className="font-bold text-sm">{artisan.stats.sales}</p>
                                                </div>
                                                <div className="h-6 w-px bg-border/50"></div>
                                                <div className="text-center">
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Joined</p>
                                                    <p className="font-bold text-sm">{artisan.stats.joined}</p>
                                                </div>
                                            </div>

                                            <Button variant="ghost" size="sm" className="rounded-full gap-1 group/btn hover:bg-primary hover:text-white transition-all">
                                                View Profile <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
