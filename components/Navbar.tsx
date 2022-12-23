import Link from "next/link";
import Image from "next/image";
import GeovLogo from "../public/cropped-vartha-research.png" 

export const Navbar = () => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <header className="flex items-center justify-between py-10">
        <Link href={"/"}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image src={GeovLogo} alt={"Geovartha Logo"} />
            </div>
          </div>
        </Link>
      </header>
    </div>
  )
}