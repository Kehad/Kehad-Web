"use client";
import Header from "../components/header/header";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import Backdrop from "@/components/others/backDrop";
import { useEffect, useState } from "react";
import Nav from "../components/sidebar/nav";
import { ThemeProvider } from "@/redux/themeProvider";


function InnerLayout({ children }: { children: React.ReactNode }) {
  const inMenu = useSelector((state: any) => state.menu.menuState);

  return (
    <>
      {inMenu && <Backdrop />}
      <div className="bg-[#FAF9F6] min-h-screen w-screen text-black py-16 lg:px-28 font-judson dark:bg-[#1a1a1a] dark:text-white px-7 sm:px-12 md:px-16 transition-all duration-[1000ms]">
        <Header />
        <div className="grid lg:grid-cols-column md:grid-cols-columnMd gap-15 md:mt-15">
          <div className="">
            <Nav />
          </div>
          <div className="flex-1 md:mt-24 ">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default function MyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <InnerLayout>{children}</InnerLayout>
            </Provider>
        </ThemeProvider>
    );
}
