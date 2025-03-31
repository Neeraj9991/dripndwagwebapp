import Slider from "@/components/Slider";
import ListPage from "./list/page";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import CategorySection from "@/components/Categories";
import Testimonials from "@/components/Testimonials";

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <Hero />
      <CategorySection />
      <ProductList />
      <Testimonials />
    </div>
  );
};

export default HomePage;
