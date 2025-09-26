import React from 'react';
 type StarRatingProps ={
    count?: number ;
 };

const StarRating: React.FC<StarRatingProps> = ({ count = 5 }) => (
    <div className='flex mt-4 text-amber-300' aria-label={`Rated ${count}`}>
        {[...Array(count)].map((_, i) => (
            <i key={i} className='fas fa-star' aria-hidden="true"></i>
        ))}
    </div>
);
export default StarRating;