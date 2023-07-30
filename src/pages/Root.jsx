import {Outlet} from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

const RootLayout = () => {
    return <>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </>
}

export default RootLayout;
