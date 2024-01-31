import "@/styles/globals.css";

//internal import the navbar
import { NavBar, Footer } from "@/components/componentIndex";
import { NFTMarketplaceProvider } from "@/Context/NFTMarketplaceContext";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </NFTMarketplaceProvider>
  </div>
);

export default MyApp;
