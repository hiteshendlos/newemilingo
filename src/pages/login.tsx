import Register from "@/components/core/forms/Register";
import Header from "@/components/layout/header";
import HomeHero from "@/components/pagecomponent/home/hero";
import LoginHero from "@/components/pagecomponent/login/hero";


export default function Home() {
  return (
    <>

    <Header isDarkTheme={false} />
    <LoginHero/>
      
    </>
  );
}
