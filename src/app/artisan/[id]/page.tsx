import Image from "next/image";
import Link from "next/link";
import { MapPin, Award, PenTool, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getArtisanById, getProductsByArtisan } from "@/lib/data";
import ArtisanActions from "@/components/artisan-actions";
import ArtisanRatingGraph from "@/components/ArtisanRatingGraph";

export default async function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const artisan = getArtisanById(id);
    const products = getProductsByArtisan(artisan.id);


    return (
        <div className="min-h-screen bg-[#FAFAFA] pb-12">
            {/* Cover */}
            <div className="relative w-full h-64 md:h-80 bg-muted overflow-hidden">
                <Image src={artisan.cover} alt="Cover" fill className="object-cover opacity-80" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative -mt-24">
                {/* Profile Card */}
                <div className="border border-border/50 shadow-xl overflow-visible bg-background/95 backdrop-blur rounded-2xl p-6 lg:p-10">
                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-2xl shrink-0 -mt-20 lg:-mt-32 z-10 bg-muted">
                            <Image src={artisan.avatar} priority alt={artisan.name} fill className="object-cover rounded-full" />
                        </div>
                        <div className="flex-1 text-center lg:text-left space-y-4">
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{artisan.name}</h1>
                                <ShieldCheck className="w-6 h-6 text-primary" />
                            </div>
                            <p className="text-xl text-primary font-medium">{artisan.role}</p>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {artisan.location}</div>
                                <div className="flex items-center gap-1"><Award className="w-4 h-4" /> {artisan.stats.rating} Rating</div>
                                <div className="flex items-center gap-1"><PenTool className="w-4 h-4" /> {artisan.stats.sales} Sales</div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed max-w-2xl">{artisan.bio}</p>

                            <div className="pt-6 border-t border-border/50">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Customer Satisfaction</h3>
                                <ArtisanRatingGraph distribution={artisan.ratingDistribution} />
                            </div>

                            <ArtisanActions />
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b">
                        <h2 className="text-2xl font-bold tracking-tight">Collection by {artisan.name}</h2>
                        <Badge variant="outline" className="text-sm py-1 px-3 bg-muted/50">{products.length} Items</Badge>
                    </div>
                    {products.length === 0 ? (
                        <p className="text-muted-foreground text-center py-12">No products listed yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((prod) => (
                                <Link href={`/product/${prod.id}`} key={prod.id}>
                                    <Card className="group overflow-hidden border-border/40 hover:shadow-xl hover:border-primary/20 transition-all duration-300 bg-background h-full cursor-pointer">
                                        <div className="relative aspect-square overflow-hidden bg-muted">
                                            <Image src={prod.img} alt={prod.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                                        </div>
                                        <CardContent className="p-5">
                                            <h3 className="font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors">{prod.title}</h3>
                                            <span className="font-bold text-lg mt-2 block">LKR {prod.priceLKR.toLocaleString()}</span>
                                            <span className="text-sm text-muted-foreground">${prod.priceUSD} USD</span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
