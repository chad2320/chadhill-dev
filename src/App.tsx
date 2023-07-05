import React from "react";
import { RndWrapper } from "./components/rndWrapper";
import { Footer } from "./components/footer";

//https://github.com/syxanash/awesome-web-desktops/tree/master

export default function App() {
  return (
    <div className=" flex h-screen w-screen flex-col ">
      <main className=" flex-1 bg-hero-pattern bg-cover">
        <RndWrapper />
      </main>
      <Footer />
    </div>
  );
}
