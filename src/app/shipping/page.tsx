export default function ShippingPage() {
    return (
        <div className="container mx-auto px-4 py-20 min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
            <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                    We ship our authentic Sri Lankan crafts globally. Our artisans take great care
                    in packaging your items to ensure they arrive safely.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Delivery Times</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Local (Sri Lanka): 3-5 business days</li>
                    <li>International: 7-14 business days depending on location</li>
                </ul>
                <p className="mt-8 text-muted-foreground italic">
                    Note: Shipping costs are calculated at checkout based on the weight and destination.
                </p>
            </div>
        </div>
    );
}
