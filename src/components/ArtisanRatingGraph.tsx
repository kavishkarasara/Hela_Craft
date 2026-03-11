"use client";

import React from "react";
import { Star } from "lucide-react";

interface ArtisanRatingGraphProps {
    distribution: Record<string, number>;
}

export default function ArtisanRatingGraph({ distribution }: ArtisanRatingGraphProps) {
    const total = Object.values(distribution).reduce((acc, val) => acc + val, 0);

    return (
        <div className="space-y-3 w-full max-w-sm">
            {[5, 4, 3, 2, 1].map((stars) => {
                const count = distribution[stars] || 0;
                const percentage = total > 0 ? (count / total) * 100 : 0;

                return (
                    <div key={stars} className="flex items-center gap-4 group/row">
                        <div className="flex items-center gap-1.5 w-12 shrink-0">
                            <span className="text-sm font-black text-foreground">{stars}</span>
                            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        </div>

                        <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden relative border border-black/5">
                            <div
                                className="absolute inset-y-0 left-0 bg-primary h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>

                        <div className="w-10 text-right">
                            <span className="text-xs font-bold text-muted-foreground group-hover/row:text-primary transition-colors">
                                {count}
                            </span>
                        </div>
                    </div>
                );
            })}
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black pt-2 text-center lg:text-left opacity-60">
                Based on {total.toLocaleString()} customer reviews
            </p>
        </div>
    );
}
