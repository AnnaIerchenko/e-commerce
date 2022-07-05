import React from 'react'
import Banners from '../components/Banners'
import CategoryMain from '../components/CategoryMain'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import ProductsHome from '../components/ProductsHome'
import Slider from '../components/Slider'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Banners />
      <CategoryMain />
      <ProductsHome />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default Home