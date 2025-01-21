"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 1,
    comment: "",
  });
  const [allReviews, setAllReviews] = useState(reviews);

  const handleAddReview = () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) return;

    const newReviewEntry = {
      ...newReview,
      date: new Date().toISOString().split("T")[0],
    };

    setAllReviews([newReviewEntry, ...allReviews]);
    setNewReview({ name: "", rating: 0, comment: "" });
  };

  return (
    <div className='bg-white shadow-md rounded-xl p-6 mt-6'>
      <h2 className='text-lg font-bold text-emerald-600'>School Reviews</h2>

      {/* Display Reviews */}
      <div className='mt-6'>
        {allReviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='p-4 mb-4 bg-gray-50 rounded-lg shadow-sm'>
            <div className='flex justify-between items-center'>
              <h4 className='font-bold text-gray-800'>{review.name}</h4>
              <div className='flex items-center'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? "#059669" : "none"}
                    stroke='#059669'
                    className='mr-1'
                  />
                ))}
              </div>
            </div>
            <p className='text-sm text-gray-500'>{review.date}</p>
            <p className='mt-2 text-gray-800'>{review.comment}</p>
          </motion.div>
        ))}
      </div>

      {/* Add Review Form */}
      <div className='mt-4'>
        <h3 className='font-semibold text-gray-800'>Add Your Review</h3>
        <div className='mt-3 grid gap-4 md:grid-cols-2'>
          <h4 className='font-semibold text-gray-800'>John Doe</h4>
          <div className='flex items-center space-x-1 gap-2'>
            <h4 className='font-semibold text-gray-800'>{newReview.rating}</h4>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                fill={star <= newReview.rating ? "#059669" : "none"}
                stroke='#059669'
                className='cursor-pointer'
                onClick={() => setNewReview({ ...newReview, rating: star })}
              />
            ))}
          </div>
        </div>
        <textarea
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          placeholder='Your Comments'
          className='w-full p-2 mt-4 border rounded-lg focus:outline-emerald-500'
        />
        <button
          onClick={handleAddReview}
          className='mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700'>
          Submit Review
        </button>
      </div>
    </div>
  );
};
