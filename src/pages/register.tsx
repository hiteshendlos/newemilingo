import Header from "../components/Layout/header/index";
import HomeHero from "../components/pagecomponent/home/hero";

import toast, { Toaster } from 'react-hot-toast';



export default function Home() {
  return (
    <>

<Toaster
  position="top-center"
  reverseOrder={false}
/>

    <Header isDarkTheme={false} />
<HomeHero/>
      
    </>
  );
}
