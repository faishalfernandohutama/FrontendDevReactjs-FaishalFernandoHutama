import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { Restaurant } from '../types';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await axios.get<Restaurant>(url);
        setRestaurant(response.data);
      } catch (err) {
        console.error("Gagal mengambil detail restoran:", err);
        setError("Restaurant not found or failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetail();
  }, [id]);

  const renderStars = (rating: number) => {
    const normalizedRating = rating > 5 ? Math.round((rating / 100) * 5) : Math.round(rating);
    
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <span 
            key={index} 
            className={`text-xl ${index < normalizedRating ? "text-[#002B56]" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#002B56] font-medium tracking-widest uppercase">Loading detail...</div>;
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 gap-4">
        <p>{error || "Restaurant not found."}</p>
        <Link to="/" className="text-[#002B56] underline font-medium">← Back to Home</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-16">
      <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-[#002B56] text-sm font-semibold tracking-wider uppercase hover:text-blue-800 transition-colors flex items-center gap-2">
            <span>←</span> Back
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="h-80 w-full bg-[#D9D9D9] relative">
          {restaurant.photos && restaurant.photos.length > 0 ? (
             <img src={restaurant.photos[0]} alt={restaurant.name} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
          )}
        </div>

        <div className="p-8 md:p-12">
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h1 className="text-4xl font-normal text-gray-900 mb-4">{restaurant.name}</h1>
            <div className="flex items-center gap-4">
              {renderStars(restaurant.rating)}
              <span className="text-sm text-gray-500 mt-1">
                {restaurant.categories && restaurant.categories.length > 0 ? restaurant.categories[0] : 'Various'} • {restaurant.priceRange}
              </span>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-widest">Location</h2>
            <div className="w-full h-64 bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-400">
                <span className="text-3xl mb-2">📍</span>
                <span className="text-sm uppercase tracking-widest">Map Placeholder</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-widest">Customer Reviews</h2>
            
            <div className="space-y-6">
              {restaurant.reviews && restaurant.reviews.length > 0 ? (
                restaurant.reviews.map((review, index) => (
                  <div key={index} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <img 
                        src={review.image || `https://ui-avatars.com/api/?name=${review.name}&background=002B56&color=fff`} 
                        alt={review.name} 
                        className="w-12 h-12 rounded-full object-cover bg-gray-200 shrink-0"
                      />
                      
                      <div>
                        <h4 className="font-medium text-gray-900">{review.name}</h4>
                        <div className="mb-2 mt-1">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < review.rating ? "text-[#002B56]" : "text-gray-300"}`}>★</span>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic text-sm">No reviews available for this restaurant yet.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}