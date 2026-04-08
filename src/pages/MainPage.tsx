import { useState } from "react";
import

const MainPage = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredRestauants, setFilteredRestaurants] = useState<Restaurant[]>([]);

    // filter
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [priceFilter, setPriceFilter] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');

    const API_URL = ''
    return (
        <div>
            <h1>asdf</h1>
        </div>
    );
};

export default MainPage;