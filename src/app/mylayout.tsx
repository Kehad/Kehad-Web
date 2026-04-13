"use client";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { ThemeProvider } from "@/redux/themeProvider";

import SplashScreen from "@/components/others/SplashScreen";

import { useState } from "react";

function InnerLayout({ children }: { children: React.ReactNode }) {
  const inMenu = useSelector((state: any) => state.menu.menuState);
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />
      <main className={`w-full min-h-screen relative transition-opacity duration-1000 ${splashDone ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
        {children}
      </main>
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
