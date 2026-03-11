export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20 min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <div className="max-w-xl">
                <p className="text-lg text-muted-foreground mb-8">
                    Have questions about our products or want to learn more about our artisans?
                    Get in touch with us!
                </p>
                <div className="space-y-4 font-medium">
                    <p>Email: support@helacrafts.com</p>
                    <p>Phone: +94 11 234 5678</p>
                    <p>Address: 123 Heritage Lane, Colombo 07, Sri Lanka</p>
                </div>
            </div>
        </div>
    );
}
