import Link from "next/link";
import Image from "next/image";

export default function NavbarComponent() {
    return (
        <>
            <nav>
                <ul className="flex justify-between bg-gradient-to-br from-slate-900 to-purple-800 shadow-xl text-white">
                    <li className="ms-5 pt-2">
                        <Link href="/">
                            <Image src="/rocket-logo.png" alt="logo" width={50} height={20}/>
                        </Link>
                    </li>
                    <li>
                        <ul className="flex justify-between space-x-10 px-10 pt-5 pb-5">
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/register">Register</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    )
}