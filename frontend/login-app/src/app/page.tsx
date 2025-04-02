import NavbarComponent from "./components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <NavbarComponent></NavbarComponent>
      </div>
      <div className="flex justify-between mt-20">
        <div className="text-white ms-10">
          <div className="rounded-xl bg-gray-800 w-sm h-96">
            <h1 className="text-4xl ms-2 pt-1">Create your notes!</h1>
            <hr className="my-2 border-t-2 border-gray-700" />
            <p className="ms-3">Use your space how you want</p>
          </div>
          <div className="bg-white w-sm rounded-sm">
            <p className="text-black mt-5 p-2">
              Soon you would be able to add images, checklists and more!
            </p>
          </div>
        </div>
        <div className="text-white w-md h-96 text-center me-50">
          <Link href="/register">
            <button className="bg-gray-800 rounded-xl p-2 outline-2 outline-black">
              Start now
            </button>
          </Link>
          <Image
            className="mt-5"
            src="/astronauta.png"
            alt="astronauta"
            width={600}
            height={600}
            priority
          />
        </div>
      </div>
    </>
  );
}
