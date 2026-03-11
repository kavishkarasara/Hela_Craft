import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, Sparkles, Brush, Hammer, Wind } from "lucide-react";
import { ALL_ARTISANS } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">

      {/* Hero */}
      <section className="relative w-full h-[calc(100vh-64px)] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[#F5F5DC]/10 z-0"></div>
        <div className="absolute top-[10%] right-[5%] w-[40%] h-[60%] rounded-full bg-[#D4AF37]/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[35%] h-[50%] rounded-full bg-primary/10 blur-[100px] animate-pulse"></div>

        {/* Decorative Floating Items */}
        <div className="absolute top-[15%] left-[10%] opacity-20 animate-float-slow animation-delay-200">
          <Brush className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute top-[20%] right-[15%] opacity-20 animate-float-medium decoration">
          <Hammer className="w-10 h-10 text-accent" />
        </div>
        <div className="absolute bottom-[25%] left-[15%] opacity-15 animate-float-slow">
          <Wind className="w-8 h-8 text-primary/80" />
        </div>
        <div className="absolute bottom-[30%] right-[10%] opacity-25 animate-float-medium animation-delay-400">
          <Sparkles className="w-14 h-14 text-accent/60" />
        </div>

        {/* Abstract Shapes */}
        <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-primary/20 animate-pulse animation-delay-600"></div>
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full border-2 border-accent/20 animate-bounce transition-all duration-1000"></div>

        {/* Dynamic Float Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #8B4513 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>


        <div className="container relative z-10 px-4 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
          <div className="animate-fade-in-up will-change-transform">
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5 px-4 py-1.5 text-sm rounded-full font-medium tracking-wide">
              100% Authentic Sri Lankan Heritage
            </Badge>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up animation-delay-200 will-change-transform">
            Masterpieces from our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-primary to-[#8B4513]">Isle of Gems</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-light leading-relaxed animate-fade-in-up animation-delay-400 will-change-transform">
            Discover exquisite, handcrafted art directly from skilled Sri Lankan artisans.
            Ancient woodwork, royal batiks, and temple brassware preserved for the modern world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-6 animate-fade-in-up animation-delay-600 will-change-transform">
            <Button size="lg" className="h-14 rounded-full px-10 text-lg font-bold shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
              Shop Collections
            </Button>
            <Link href={`/artisans`}>
              <Button size="lg" variant="outline" className="h-14 rounded-full px-10 text-lg font-bold border-border bg-white/50 backdrop-blur hover:bg-muted transition-all duration-300">
                Meet the Artisans
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-scroll"></div>
        </div>
      </section>

      {/* Product Grid with Search, Filters, Load More */}
      <ProductGrid />

      {/* Featured Artisans */}
      <section className="py-20 bg-background border-y border-border/50">
        <div className="container px-4 mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Artisans</h2>
              <p className="text-muted-foreground">The hands behind the heritage.</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {ALL_ARTISANS.map((artisan) => (
              <Link href={`/artisan/${artisan.id}`} key={artisan.id}>
                <div className="group flex flex-col items-center text-center space-y-4 cursor-pointer">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background shadow-lg group-hover:shadow-xl group-hover:border-primary/30 transition-all group-hover:-translate-y-1 duration-300">
                    <Image src={artisan.avatar} alt={artisan.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{artisan.name}</h3>
                    <p className="text-primary text-sm font-medium">{artisan.role}</p>
                    <p className="text-muted-foreground text-xs mt-1">{artisan.location.split(",")[0]}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
