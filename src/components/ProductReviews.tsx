"use client";

import React, { useState } from "react";
import { Star, ThumbsUp, MessageSquare, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    helpfulVotes: number;
}

interface ProductReviewsProps {
    reviews: Review[];
}

export default function ProductReviews({ reviews: initialReviews }: ProductReviewsProps) {
    const [reviews, setReviews] = useState(initialReviews || []);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [submitted, setSubmitted] = useState(false);
    const [votedIds, setVotedIds] = useState<string[]>([]);

    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    const handleVote = (id: string) => {
        if (votedIds.includes(id)) return;
        setReviews(prev => prev.map(r => r.id === id ? { ...r, helpfulVotes: r.helpfulVotes + 1 } : r));
        setVotedIds(prev => [...prev, id]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const review: Review = {
            id: `r${Date.now()}`,
            userName: "You",
            rating: newReview.rating,
            comment: newReview.comment,
            date: "Just now",
            helpfulVotes: 0
        };
        setReviews(prev => [review, ...prev]);
        setNewReview({ rating: 5, comment: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section className="mt-20 border-t pt-16">
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Left: Stats & Form */}
                <div className="lg:w-1/3 space-y-10">
                    <div>
                        <h2 className="text-3xl font-black mb-1">Customer Reviews</h2>
                        <div className="flex items-center gap-4 mt-4">
                            <span className="text-6xl font-black text-primary">{avgRating}</span>
                            <div>
                                <div className="flex items-center gap-0.5 mb-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className={`w-4 h-4 ${i <= Number(avgRating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-muted-foreground"}`} />
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground font-medium">Based on {reviews.length} reviews</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-border/50 shadow-sm space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold italic">Share your experience</h3>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                                        className="transition-transform active:scale-90"
                                    >
                                        <Star className={`w-8 h-8 ${star <= newReview.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-muted-foreground hover:text-primary/50"}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Your Comment</label>
                            <textarea
                                required
                                value={newReview.comment}
                                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                placeholder="What did you love about this craft?"
                                className="w-full h-32 p-4 rounded-2xl bg-muted/50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none font-medium text-sm"
                            ></textarea>
                        </div>

                        <Button type="submit" className="w-full h-12 rounded-full font-black uppercase tracking-widest shadow-xl relative overflow-hidden group">
                            {submitted ? (
                                <span className="flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
                                    <Check className="w-4 h-4" /> Posted!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                    <Send className="w-4 h-4" /> Post Review
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Right: Review List */}
                <div className="flex-1 space-y-6">
                    {reviews.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center py-20 bg-muted/20 rounded-[2rem] border border-dashed text-center">
                            <MessageSquare className="w-12 h-12 text-muted-foreground opacity-20 mb-4" />
                            <h4 className="text-xl font-bold italic">No reviews yet</h4>
                            <p className="text-sm text-muted-foreground max-w-xs mt-2">Be the first to share your thoughts on this authentic piece!</p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <Card key={review.id} className="rounded-[2rem] border-border/50 overflow-hidden hover:shadow-lg transition-all duration-500">
                                <CardContent className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center border-2 border-primary/10">
                                                <span className="text-primary font-black uppercase text-xs">
                                                    {review.userName.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">{review.userName}</h4>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <Star key={i} className={`w-3 h-3 ${i <= review.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-muted-foreground"}`} />
                                                    ))}
                                                    <span className="text-[10px] text-muted-foreground font-bold ml-2 uppercase tracking-widest">{review.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleVote(review.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${votedIds.includes(review.id) ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
                                        >
                                            <ThumbsUp className={`w-3.5 h-3.5 ${votedIds.includes(review.id) ? "fill-current" : ""}`} />
                                            Helpful {review.helpfulVotes > 0 && <span>({review.helpfulVotes})</span>}
                                        </button>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed font-medium">
                                        "{review.comment}"
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
