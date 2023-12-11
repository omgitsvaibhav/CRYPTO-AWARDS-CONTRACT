import NavBar from "./components/navbar/NavBar";
import Homepage from "./pages/homepage/Homepage";
import CreateProgram from "./pages/create-program/CreateProgram";
import Adminpage from "./pages/create-program/Adminpage";
import Explore from "./pages/explore/Explore";
import AdminPanel from "./pages/admin-panel/AdminPanel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.ropsten, chain.polygonMumbai],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <div className="bg-black">
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="create-program" element={<CreateProgram/>} />
              <Route path="admin" element={<Adminpage />} />
              <Route path="explore" element={<Explore />} />
              <Route path="admin-panel" element={<AdminPanel />} />
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;
