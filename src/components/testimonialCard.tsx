import React from 'react';
import StarRating  from './starrating';

type TestimonialCardProps ={
    name: string;
    since: string;
    quote: string;
    imgSrc: string;
    stars?: number;

};
const TestimonialCard: React.FC<TestimonialCardProps> = ({
    name,
    since,
    quote,
    imgSrc,
    stars = 5,
})=> (
    <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition'>
        <div className='flex items-center mb-4'>
            <img src={imgSrc} alt={`testimonial ${name}`} className="w-12 h-12 rounded-full mr-4 object-cover"/>
            <div>
                <h4 className='font-bold text-gray-900'>{name}</h4>
                <p className='text-gray-500 text-sm'>Member since {since}</p>

            </div>
        </div>
        <p className='italic text-gray-700 mb-2'>"{quote}"</p>
        <StarRating count={stars}/>
    </div>
)
export default TestimonialCard;