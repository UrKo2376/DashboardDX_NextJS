import Image from "next/image";

export default function Home() {
  return (
        <div className="home-container">
          <div id="mainLeft" className="main-left">
            <h1 className="main-heading">Cloud Based Workforce Site Management</h1>
            <h2 className="main-company-name">D & S Signs Limited</h2>
          </div>
          <div id="mainRight" className="main-right">
            <Image 
              src="/Images/workman.png"
              width={500}
              height={400}
              priority={true}
              alt="Workman Image"
              className="w-full h-auto max-w-[500px]"
            />
          </div>
        </div>
      );
}
