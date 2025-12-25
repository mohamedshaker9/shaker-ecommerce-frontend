import { fetchProducts } from '../../index.js';
import HomeBanner from './HomeBanner.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Grid } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import ProductCard from '../ProductCard.jsx';
import InputField from '../../shared/InputField.jsx';


function Home() {
  const dispatch = useDispatch();

  const {products, isProductLoading, isProductError}  = useSelector((state) => state.products);
  
  useEffect(() => {
          dispatch(fetchProducts());
      }, [dispatch] );
  


  return (
    <div>

      <HomeBanner />
      <div className='text-center'>
        <h2 className="text-2xl font-bold mt-8 mb-4 ml-5">Featured Products</h2>
        <p className="text-gray-600 mb-6 ml-5">Explore our handpicked selection of top-rated products just for you.</p>
      </div>
      <div className= "grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 text-center">
                    {isProductLoading ? (
                        <div className='col-span-4 flex justify-center items-center h-full'>
                            <Grid
                                visible={true}
                                height="80"
                                width="80"
                                color="#1976d2"
                                ariaLabel="grid-loading"
                                radius="12.5"
                                wrapperStyle={{}}
                                wrapperClass="grid-wrapper"
                            />
                        </div>
                    ) : isProductError ? ( toast.error("Error Fetching Products....") ) : (
                        products.map((product, i) => (
                        <ProductCard key={i} {...product} />
                        ))
                    )}
        </div>
    </div>
  )
}   

export default Home;