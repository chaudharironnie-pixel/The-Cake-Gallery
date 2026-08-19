import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Trending from './components/Trending'
import CustomOrderForm from './components/CustomOrderForm'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloatButton from './components/WhatsAppFloatButton'
import OrderDrawer from './components/OrderDrawer'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerCake, setDrawerCake] = useState({ name: '', price: '' })

  const handleOrderCake = useCallback((name, price) => {
    setDrawerCake({ name, price })
    setDrawerOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    document.body.style.overflow = ''
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Menu onOrderCake={handleOrderCake} />
      <Trending onOrderCake={handleOrderCake} />
      <CustomOrderForm />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppFloatButton drawerOpen={drawerOpen} />
      <OrderDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        cakeName={drawerCake.name}
        cakePrice={drawerCake.price}
      />
    </>
  )
}
