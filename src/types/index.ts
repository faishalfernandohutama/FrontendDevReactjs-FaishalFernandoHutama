export interface Review {
    name: string;
    rating: number;
    text: string;
    image: string;
}

export interface Restaurant {
    id: string;
    name: string;
    rating: number;
    priceRange: string;
    isOpen: boolean;
    photos: string;    
    categories: string[];
    reviews: Review[];
}