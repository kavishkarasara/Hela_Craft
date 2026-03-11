"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type FavoriteItem = {
    id: string;
    title: string;
    priceLKR: number;
    priceUSD: number;
    img: string;
    artisan: string;
};

type FavoritesContextType = {
    favorites: FavoriteItem[];
    toggleFavorite: (product: FavoriteItem) => void;
    isFavorite: (id: string) => boolean;
    totalFavorites: number;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    // Initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("hela-favorites");
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("hela-favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = useCallback((product: FavoriteItem) => {
        setFavorites((prev) => {
            const existing = prev.find((fav) => fav.id === product.id);
            if (existing) {
                return prev.filter((fav) => fav.id !== product.id);
            }
            return [...prev, product];
        });
    }, []);

    const isFavorite = useCallback((id: string) => {
        return favorites.some((fav) => fav.id === id);
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, totalFavorites: favorites.length }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
    return ctx;
}
