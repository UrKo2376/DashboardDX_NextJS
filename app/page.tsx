import Image from "next/image";

export default function Home() {
  return (
        <div className="w-385 bg-[var(--mainBGLighter)] columns-2">
          <div id="mainLeft">
            <h1 className="text-xl text-black">TESTING</h1>
          </div>
          <div id="mainRight" className="flex justify-center pt-10">
            <Image 
              src="/Images/workman.png"
              width={500}
              height={400}
              priority={true}
              alt="Workman Image"
            />
          </div>
        </div>
      );
}
