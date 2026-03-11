// Shared data source for products and artisans — used by homepage, product pages, and artisan pages

export const ALL_ARTISANS = [
    {
        id: "1",
        name: "Kumari",
        role: "Master Weaver",
        location: "Batticaloa, Eastern Province",
        bio: "Kumari is a celebrated weaving artist from Batticaloa with over 25 years of experience in traditional Sri Lankan textile crafts. She specializes in Dumbara mat weaving and palm-leaf basket making. Her work has been exhibited in Paris and Tokyo.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
        cover: "https://images.unsplash.com/photo-1566004100701-32948e9d0f0f?w=1600&h=400&fit=crop",
        stats: { joined: "2018", sales: 210, rating: 4.8 },
        ratingDistribution: {
            5: 158,
            4: 32,
            3: 12,
            2: 5,
            1: 3
        },
        productIds: ["4", "6"],
    },
    {
        id: "2",
        name: "Sunil",
        role: "Master Wood Carver",
        location: "Ambalangoda, Southern Province",
        bio: "Sunil is a 4th-generation woodcarver from Ambalangoda, known for his extraordinary masks and animal figurines. His workshop produces some of the most sought-after collector pieces in Sri Lanka.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        cover: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1600&h=400&fit=crop",
        stats: { joined: "2019", sales: 178, rating: 4.9 },
        ratingDistribution: {
            5: 145,
            4: 25,
            3: 5,
            2: 2,
            1: 1
        },
        productIds: ["1", "5"],
    },
    {
        id: "3",
        name: "Champa",
        role: "Master Batik Artist",
        location: "Handessa, Kandy",
        bio: "With over 20 years of experience, Champa is a distinguished artisan specializing in ancient Sri Lankan Batik techniques. Her work features intricate floral patterns and traditional Kandyan motifs using eco-friendly natural dyes.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        cover: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&h=400&fit=crop",
        stats: { joined: "2019", sales: 142, rating: 4.9 },
        ratingDistribution: {
            5: 120,
            4: 15,
            3: 4,
            2: 2,
            1: 1
        },
        productIds: ["2"],
    },
    {
        id: "4",
        name: "Nimal",
        role: "Master Brass Smith",
        location: "Pilimathalawa, Kandy",
        bio: "Nimal carries forward a centuries-old tradition of brass craft. His traditional oil lamps and religious artifacts are highly sought after by temples and collectors alike. Each piece is hand-polished and engraved with traditional Sinhalese motifs.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        cover: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&h=400&fit=crop",
        stats: { joined: "2020", sales: 96, rating: 4.7 },
        ratingDistribution: {
            5: 68,
            4: 18,
            3: 6,
            2: 3,
            1: 1
        },
        productIds: ["3"],
    },
];

export const ALL_PRODUCTS = [
    {
        id: "1", title: "Intricate Wooden Elephant", artisanId: "2", artisan: "Sunil", priceLKR: 8500, priceUSD: 28,
        img: "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=800&q=80",
            "https://images.unsplash.com/photo-1610116303244-629555cb6249?w=800&q=80",
            "https://images.unsplash.com/photo-1582103287241-2762adba6c36?w=800&q=80",
            "https://images.unsplash.com/photo-1588611919736-46487e997698?w=800&q=80"
        ],
        technique: "Carving", isHandmade: true, isEco: false,
        description: "A masterpiece of Sri Lankan woodcarving tradition. This life-like elephant is hand-carved from sustainably sourced local wood by master craftsman Sunil, using techniques passed down through 5 generations. Each piece takes 3 weeks to complete.",
        material: "Ebony Wood", region: "Ambalangoda, Southern Province",
        reviews: [
            { id: "r1", userName: "Alice M.", rating: 5, comment: "Absolutely stunning craftsmanship. The details on the trunk are incredible!", date: "2 days ago", helpfulVotes: 12 },
            { id: "r2", userName: "Mark T.", rating: 4, comment: "Beautiful piece, though slightly smaller than I expected. Still a great addition to my home.", date: "1 week ago", helpfulVotes: 5 }
        ]
    },
    {
        id: "2", title: "Royal Kandyan Batik Saree", artisanId: "3", artisan: "Champa", priceLKR: 25000, priceUSD: 85,
        img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
            "https://images.unsplash.com/photo-1590739297634-1936c5890c95?w=800&q=80",
            "https://images.unsplash.com/photo-1617146059250-48239055c76b?w=800&q=80",
            "https://images.unsplash.com/photo-1621370617325-132d75f28a7e?w=800&q=80"
        ],
        technique: "Batik", isHandmade: true, isEco: true,
        description: "A breathtaking traditional Sri Lankan Batik saree, handcrafted in the central highlands of Kandy. Intricate patterns dyed using eco-friendly natural colors over 14 days by master artisans.",
        material: "100% Pure Cotton", region: "Kandy, Central Province",
        reviews: [
            { id: "r3", userName: "Sarah K.", rating: 5, comment: "The colors are even more vibrant in person. A true work of art!", date: "3 days ago", helpfulVotes: 8 },
            { id: "r4", userName: "John D.", rating: 5, comment: "Gifted this to my wife and she loved it. The quality of the fabric is superb.", date: "2 weeks ago", helpfulVotes: 3 }
        ]
    },
    {
        id: "3", title: "Traditional Brass Oil Lamp", artisanId: "4", artisan: "Nimal", priceLKR: 12000, priceUSD: 40,
        img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
            "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=800&q=80",
            "https://images.unsplash.com/photo-1620311545452-f4705051b471?w=800&q=80",
            "https://images.unsplash.com/photo-1621503374828-66236b2857f1?w=800&q=80"
        ],
        technique: "Metalwork", isHandmade: true, isEco: false,
        description: "A traditional Sri Lankan brass oil lamp (Pahana), intricately crafted by master brass smith Nimal. Used in religious ceremonies for centuries. Each lamp is hand-polished to a brilliant shine.",
        material: "Pure Brass", region: "Pilimathalawa, Kandy",
        reviews: [
            { id: "r5", userName: "David L.", rating: 5, comment: "A solid, well-made piece. It adds such a traditional feel to my library.", date: "1 day ago", helpfulVotes: 15 }
        ]
    },
    {
        id: "4", title: "Woven Palmyrah Basket", artisanId: "1", artisan: "Kumari", priceLKR: 3500, priceUSD: 12,
        img: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=80",
            "https://images.unsplash.com/photo-1591147138334-03dbba86d267?w=800&q=80",
            "https://images.unsplash.com/photo-1579783901586-d88db74b4fe5?w=800&q=80",
            "https://images.unsplash.com/photo-1616489182806-03f4dc962261?w=800&q=80"
        ],
        technique: "Weaving", isHandmade: true, isEco: true,
        description: "A beautifully crafted palmyrah basket from Batticaloa's long tradition of palm-leaf weaving. Durable, eco-friendly, and uniquely Sri Lankan.",
        material: "Palmyrah Leaves", region: "Batticaloa, Eastern Province"
    },
    {
        id: "5", title: "Raksha Ceremonial Mask", artisanId: "2", artisan: "Sunil", priceLKR: 18000, priceUSD: 60,
        img: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80",
            "https://images.unsplash.com/photo-1635345997237-7d8b58f8040d?w=800&q=80",
            "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=800&q=80",
            "https://images.unsplash.com/photo-1533512371990-25e4c6020556?w=800&q=80"
        ],
        technique: "Carving", isHandmade: true, isEco: false,
        description: "A striking traditional Raksha mask, hand-carved and painted in Ambalangoda. Used in traditional Kolam and Sanni rituals. A collector's heritage item.",
        material: "Kaduru Wood", region: "Ambalangoda, Southern Province"
    },
    {
        id: "6", title: "Dumbara Woven Wall Hanging", artisanId: "1", artisan: "Kumari", priceLKR: 6500, priceUSD: 22,
        img: "https://images.unsplash.com/photo-1558171813-2f843b4eb3e4?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1558171813-2f843b4eb3e4?w=800&q=80",
            "https://images.unsplash.com/photo-1582103287241-2762adba6c36?w=800&q=80",
            "https://images.unsplash.com/photo-1579783922514-0235272a272c?w=800&q=80",
            "https://images.unsplash.com/photo-1543333995-a78ee3e144a1?w=800&q=80"
        ],
        technique: "Weaving", isHandmade: true, isEco: true,
        description: "A stunning Dumbara woven wall hanging from the Kandy highlands. Each pattern tells a story of Sri Lankan folklore. Handwoven using age-old methods.",
        material: "Cotton & Reed", region: "Dumbara, Kandy"
    },
    {
        id: "7", title: "Hand-Painted Pottery Vase", artisanId: "3", artisan: "Champa", priceLKR: 4500, priceUSD: 15,
        img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
            "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=80",
            "https://images.unsplash.com/photo-1610915600003-87bb08a681c4?w=800&q=80",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
        ],
        technique: "Pottery", isHandmade: true, isEco: true,
        description: "A hand-thrown and hand-painted clay vase, featuring traditional Sri Lankan floral motifs. Fired in a traditional kiln using eco-friendly methods.",
        material: "Local Clay", region: "Kandy"
    },
    {
        id: "8", title: "Silver Filigree Earrings", artisanId: "4", artisan: "Nimal", priceLKR: 7500, priceUSD: 25,
        img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
            "https://images.unsplash.com/photo-1535633302700-1f256bc26ac3?w=800&q=80",
            "https://images.unsplash.com/photo-1588611919736-46487e997698?w=800&q=80",
            "https://images.unsplash.com/photo-1620311545452-f4705051b471?w=800&q=80"
        ],
        technique: "Metalwork", isHandmade: true, isEco: false,
        description: "Delicate silver filigree earrings crafted using traditional Kandyan jewelry-making techniques. Each pair is entirely handmade and unique.",
        material: "Sterling Silver", region: "Pilimathalawa, Kandy"
    },
];


export const PAGE_SIZE = 6;

export function getArtisanById(id: string) {
    return ALL_ARTISANS.find((a) => a.id === id) ?? ALL_ARTISANS[0];
}

export function getProductById(id: string) {
    return ALL_PRODUCTS.find((p) => p.id === id) ?? ALL_PRODUCTS[0];
}

export function getProductsByArtisan(artisanId: string) {
    return ALL_PRODUCTS.filter((p) => p.artisanId === artisanId);
}
