import HeroSection from "./components/base/HeroSection";

export default function Home() {
  // style={{ backgroundColor: "violet", color: "red", fontSize: "64px" }}
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <HeroSection/>
      {/* <p className="subsubheading">Hello</p> */}
    </div>
  );
}
