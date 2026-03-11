import { getProductById, getArtisanById } from "@/lib/data";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = getProductById(id);
    const artisan = getArtisanById(product.artisanId);

    return <ProductDetailClient product={product} artisan={artisan} />;
}

