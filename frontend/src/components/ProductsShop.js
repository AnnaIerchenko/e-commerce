import { faChevronRight , faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { products } from '../data.js'
import '../styles/productsShop.css'
import ProductShop from './ProductShop'
import ReactPaginate from 'react-paginate'


const ProductsShop = () => {
  //for filter all products
  const [data, setData] = useState(products);

  //for category
  const [category, setCategory] = useState([]);

//for paginate
const [pageNumber, setPageNumber] = useState(0);

const productPerPage = 3;
const pagesVisited = pageNumber * productPerPage;

const displayProducts = data.slice(pagesVisited, pagesVisited + productPerPage).map((item) => (
  <ProductShop item={item} key={item._id} />
))

const pageCount = Math.ceil(data.length / productPerPage);
const changePage = ({selected}) => (
  setPageNumber(selected)
)

  const filterResult = (catItem) => {
    const result = products.filter((curDate) => {
      return curDate.category === catItem;
    })
    setData(result)
  }

 useEffect(() => {
   const fetchData = async () => {
     const result = await axios.get('/api/category')
     setCategory(result.data)
   }
   fetchData()
 }, [])

  return (
    <div className='shop-container'>
      <div className="shop-row">
        <div className="shop-col">
          <h2>Category</h2>
          <button className='shop-btn' onClick={() => setData(products)}>
            All
          <FontAwesomeIcon icon={faChevronRight}/>
          </button>
          {/* show all category if exist*/}
          { category.map((item) => (
            <button className='shop-btn' onClick={() => filterResult(item.title)}>{item.title}
            <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
          ))}
        </div>
        <div className="shop-col">
          <div className="shop-products">
            {/* show product card */}
             { displayProducts }
          </div>
          <div className="shop-pagination">
            <ReactPaginate 
              previousLabel={'<<'}
              nextLabel={">>"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsShop