'use client';

//Component to show the prodcts as cards
export default function Products({ product, key }) {
    return <div className="shadow-xl rounded-lg overflow-hidden border border-gray-100 relative h-96" key={key}>
        <div className="w-full h-3/5">
            <img src={product.imageUrl} alt={`Product ${key}`} className="w-full h-full object-cover" />
        </div>
        <hr />
        <div className="p-2 text-sm flex flex-col gap-2">
            <span>{product.title.length > 40 ? `${product.title.substring(0, 40)}...` : product.title}</span>

            <span>Rating: {product.rating}</span>

            <span>Reviews: {product.reviews}</span>

            <span>Price: {product.price}</span>
        </div>
    </div>
};
