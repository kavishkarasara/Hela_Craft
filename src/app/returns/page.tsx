export default function ReturnsPage() {
    return (
        <div className="container mx-auto px-4 py-20 min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-8">Returns & Refunds</h1>
            <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                    Your satisfaction is our priority. If you receive a damaged or incorrect item,
                    please contact us within 7 days of delivery for a full refund or exchange.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                    As most of our products are handmade and unique, please allow for slight
                    variations in color and design from the product images.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">How to Return</h2>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                    <li>Email support@helacrafts.com with your order number and photos of the item.</li>
                    <li>We will provide instructions for returning the item to the artisan.</li>
                    <li>Once received and inspected, we will process your refund within 5 business days.</li>
                </ol>
            </div>
        </div>
    );
}
