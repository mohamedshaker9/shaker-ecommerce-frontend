import React from 'react';
import { useState } from 'react';
import ProductViewModal from './ProductViewModal';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cart-slice';
import toast from 'react-hot-toast';

function ProductCard({ id, name, image, description, price, specialPrice, quantity, category }){

    const [isProductViewOpen, setIsProductViewOpen] = useState(false);
    const [selectedViewProuct, setselectedViewProuct] = useState("{}");
    const isProductAvailable = quantity && quantity > 0;

    

    const dispatch = useDispatch();

    function handleAddToCart(product){
        
      try {
        dispatch(addToCart({id, name, image, description, price, specialPrice, quantity, category }));
        toast.success('Added to cart successfully!');
     } catch (error) {
        toast.error('Failed to add to cart');
     }
    }
    

    function handleOpenProductViewModal() {
        setselectedViewProuct({ id, name, image, description, price, specialPrice, quantity, category });
        setIsProductViewOpen(true);
    }
    
    return  <>
              <div  key={id} className="border m-4 p-4 rounded-lg shadow-xl overflow-hidden
                                       transition-transform hover:scale-105" >

                <div>
                    < img src={image} alt={name} className="mb-4 w-full  rounded hover:scale-130 cursor-pointer" 
                     onClick={() => handleOpenProductViewModal(
                    id, name, image, description, price, specialPrice, quantity, category
                   )} />
                </div>
                       <div className="text-xl font-bold mb-2 cursor-pointer" 
                            
                            onClick={() => handleOpenProductViewModal(
                          id, name, image, description, price, specialPrice, quantity, category
                        )} >
                          <h2 >{name}</h2>
                          </div> 
                              <div className="text-gray-700 min-h-20 max-h-20  mb-2 cursor-pointer"
                                  onClick={() => handleOpenProductViewModal(
                                  id, name, image, description, price, specialPrice, quantity, category
                                )}><p >{description}</p>
                              </div>
                        <div className="flex flex-row justify-between items-center"> 
                          <div>
                              {specialPrice ? (
                                <div className="flex flex-col">
                                <span className="line-through mr-2 text-sm text-gray">${Number(price).toFixed(2)}</span>
                                <span className="mr-2 font-bold text-lg text-green-500">${Number(specialPrice).toFixed(2)}</span>
                                </div>
                              ) :

                                (<p className="text-green-600 font-semibold mb-2">${Number(price).toFixed(2)}</p>)
                              }
                          </div>
                          <div>
                            <button className={`mt-2 px-4 py-2 rounded text-xs ${isProductAvailable ? 
                              'bg-blue-500 text-white hover:bg-blue-600' :
                              'bg-gray-400 text-gray-700 cursor-not-allowed'}`} disabled={!isProductAvailable}
                              onClick={() => handleAddToCart(id, name, image, description, price, specialPrice, quantity, category)} >
                              {isProductAvailable ? 'Add to Cart' : 'Out of Stock'}
                              
                          </button>
                          </div>
                        </div>
                        
                        <p className="text-xs  text-gray-500">{category}</p>

                        <ProductViewModal 
                                isProductViewOpen={isProductViewOpen}
                                setIsProductViewOpen={setIsProductViewOpen}
                                product = {selectedViewProuct}
                                isProductAvailable={isProductAvailable} />
                    </div>
                    </>
}

export default ProductCard;