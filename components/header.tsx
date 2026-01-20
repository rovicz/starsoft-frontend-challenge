import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="h-[100px] w-full flex items-center px-[2.6875rem] border-b border-bottom-[1px] border-[#FFFFFF/21]">
      <div className="container">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Starsoft"
            width={101}
            height={38}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
