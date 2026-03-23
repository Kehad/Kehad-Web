"use client";
import Header from "../components/header/header";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Backdrop from "@/components/others/backDrop";
import { useEffect, useState } from "react";
import Nav from "../components/sidebar/nav";
import { ThemeProvider } from "@/redux/themeProvider";


export default function MyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Temporary variable until Redux is set up
    const inMenu = false;

    // const [dimensions, setDimensions] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // });

    // useEffect(() => {
    //     const handleResize = () => {
    //         setDimensions({
    //             width: window.innerWidth,
    //             height: window.innerHeight,
    //         });
    //     };

    //     window.addEventListener('resize', handleResize);

    //     // Clean up the event listener on component unmount
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (
        <ThemeProvider>
            <Provider store={store}>
                {inMenu && <Backdrop />}
                <div className="bg-[#FAF9F6] min-h-screen w-screen text-black py-16 lg:px-28 font-judson dark:bg-black dark:text-white px-7 sm:px-12 md:px-16 transition-all duration-[1000ms]">
                    <Header />
                    {/* <div className="flex"> */}
                    <div className="grid lg:grid-cols-column md:grid-cols-columnMd gap-15 mt-16">
                        <div className="">
                            <Nav />
                        </div>
                        <div className="flex-1 mt-24 ">
                            {children}
                        </div>
                    </div>
                </div>
            </Provider>
        </ThemeProvider>
    );
}
