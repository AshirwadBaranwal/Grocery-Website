'use client'
import HomeCrousel from '@/components/HomeCrousel.jsx'
import CategoryList from '@/components/CategoryList.jsx'
import SearchBar from '@/components/SearchBar.jsx'
import PopularProducts from '@/components/PopularProducts.jsx'
import Footer from '@/components/Footer.jsx'
import Navbar from "@/components/Navbar";
import SuccessModal from '@/components/SuccessModal'


export default function Home() {

  return (
    <>
     <Navbar/>
      <SearchBar className='px-3 py-2 mt-[70px] md:hidden'/>
      <div className="p-3 md:px-16  md:pt-16">
     <HomeCrousel/>
     <CategoryList/>
     <h2 className="my-3 text-2xl font-concertOne text-primary  md:font-bold">
        Popular Products
      </h2>
     <PopularProducts/>
    </div>
    <Footer/>
    </>
  );
}
