import Link from "next/link";
import Image from "next/image";

export const repository = "https://github.com/smeltery/glimpse";

export function Brand() {
  return (
    <Link prefetch={false} className="brand" href="/" aria-label="Glimpse home">
      <Image src="/logo.svg" alt="" width={32} height={32} />
      <span>
        smeltery <span className="brand-sub">/ glimpse</span>
      </span>
    </Link>
  );
}
