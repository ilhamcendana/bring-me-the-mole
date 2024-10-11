// Assets
import mole from "@/assets/images/mole.png";

// Global Component
import Image from "next/image";
import Banner from "../components/display/Banner";

// Local Component
import IdleComponent from "../local-components/home/IdleComponent";

export default function Home() {
  return (
    <div className="container mx-auto px-4 h-[100svh] w-full">
      <div className="flex flex-col justify-center items-center h-full gap-11">
        <div className="flex flex-col items-center">
          <Banner title="Bring Me The" />
          <Image alt="" src={mole} width={100} />
        </div>

        <IdleComponent />
      </div>
    </div>
  );
}
