import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store"; 
import type { Restaurant } from "../types";
import { fetchRestaurants } from "../store/restaurantSlice";

const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: restaurants, loading, error } = useSelector((state: RootState) => state.restaurants);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

    const [isOpenNow, setIsOpenNow] = useState<boolean>(false);
    const [priceFilter, setPriceFilter] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');

    useEffect(() => {
        dispatch(fetchRestaurants(categoryFilter));
    }, [dispatch, categoryFilter])

    useEffect(() => {
        let result = Array.isArray(restaurants) ? restaurants : [];

        if (isOpenNow) {
            result = result.filter((resto) => resto.isOpen === true);
        }
        if (priceFilter) {
            result = result.filter((resto) => resto.priceRange === priceFilter);
        }

        setFilteredRestaurants(result);
    }, [restaurants, isOpenNow, priceFilter])

    const renderStars = (rating: number) => {
        const normalizedRating = rating > 5 ? Math.round((rating / 100) * 5) : Math.round(rating);
        
        return (
            <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, index) => (
                    <span 
                        key={index} 
                        className={`text-lg ${index < normalizedRating ? "text-[#002B56]" : "text-gray-300"}`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-white p-6 text-black font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-normal text-gray-800 mb-8">All Restaurants</h1>

                {/* Filter Navigation */}
                <div className="bg-white py-4 border-t border-b border-gray-200 mb-8 flex flex-wrap gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id="openNow" 
                            checked={isOpenNow}
                            onChange={(e) => setIsOpenNow(e.target.checked)}
                            className="w-4 h-4 rounded cursor-pointer accent-[#002B56]"
                        />
                        <label htmlFor="openNow" className="text-sm text-gray-700 cursor-pointer">Open Now</label>
                    </div>

                    <select 
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="border-b border-gray-300 text-sm py-1 outline-none focus:border-[#002B56] cursor-pointer bg-transparent"
                    >
                        <option value="">Price</option>
                        <option value="$">$ (Cheap)</option>
                        <option value="$$">$$ (Moderate)</option>
                        <option value="$$$">$$$ (Expensive)</option>
                        <option value="$$$$">$$$$ (Luxury)</option>
                    </select>

                    <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border-b border-gray-300 text-sm py-1 outline-none focus:border-[#002B56] cursor-pointer bg-transparent"
                    >
                        <option value="">Categories</option>
                        <option value="Seafood">Seafood</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Italian">Italian</option>
                        <option value="Indonesian">Indonesian</option>
                    </select>
                </div>

                {loading && <p className="text-center text-gray-500 py-10 font-medium">Loading restaurants...</p>}
                {error && <p className="text-center text-red-500 py-10 font-medium">Error: {error}</p>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {filteredRestaurants.length > 0 ? (
                            filteredRestaurants.map((resto) => (
                                <div key={resto.id} className="bg-white flex flex-col">
                                    <div className="h-48 w-full bg-[#D9D9D9] mb-3">
                                        {resto.photos ? (
                                            <img src={resto.photos} alt={resto.name} className="w-full h-full object-cover" />
                                        ) : null}
                                    </div>
                                    
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-base font-medium text-gray-900 line-clamp-2">{resto.name}</h3>
                                        
                         
                                        {renderStars(resto.rating)}
                                        
                              
                                        <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-wide mb-4">
                                            <span>
                                                {resto.categories && resto.categories.length > 0 ? resto.categories[0] : 'CATEGORY'} • {resto.priceRange}
                                            </span>
                                            
                                            <span className="flex items-center gap-1.5">
                                        
                                                <span className={`w-2 h-2 rounded-full ${resto.isOpen ? 'bg-emerald-500' : 'bg-red-600'}`}></span>
                                                {resto.isOpen ? 'OPEN NOW' : 'CLOSED'}
                                            </span>
                                        </div>

                                       
                                        <div className="mt-auto">
                                            <a 
                                                href={`/detail/${resto.id}`} 
                                                className="block w-full text-center bg-[#002B56] hover:bg-blue-900 text-white py-3 transition-colors text-[11px] tracking-[0.1em] font-semibold uppercase"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 py-10">No restaurants found matching your criteria.</p>
                        )}
                    </div>
                )}
                
             
                <div className="mt-16 flex justify-center">
                    <button className="border border-[#002B56] text-[#002B56] hover:bg-gray-50 px-12 py-3 text-xs tracking-widest uppercase font-semibold">
                        Load More
                    </button>
                </div>

            </div>
        </main>
    );
};

export default MainPage;