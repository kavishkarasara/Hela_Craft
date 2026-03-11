"use client";

import { Button } from "@/components/ui/button";
import { Mail, PenTool } from "lucide-react";

export default function ArtisanActions() {
    return (
        <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button
                className="rounded-full shadow-lg gap-2 px-6"
                onClick={() => alert("Messaging coming soon!")}
            >
                <Mail className="w-4 h-4" /> Message Artisan
            </Button>
            <Button
                variant="outline"
                className="rounded-full gap-2 px-6 text-primary border-primary/20 bg-primary/5 hover:bg-primary/10"
                onClick={() => alert("Custom order request coming soon!")}
            >
                <PenTool className="w-4 h-4" /> Request Custom Design
            </Button>
        </div>
    );
}
