import Image from "next/image";

import markDark from "@/assets/logo_single_dark.svg";
import markLight from "@/assets/logo_light_single.svg";

type MarkProps = {
  className?: string;
  alt?: string;
  height?: number;
};

// The swirl mark alone, indigo on paper and white on the dark canvas.
export default function Mark({ className, alt = "", height = 40 }: MarkProps) {
  const width = Math.round(height * (markDark.width / markDark.height));
  return (
    <>
      <Image src={markDark} alt={alt} width={width} height={height} className={`only-light ${className ?? ""}`} />
      <Image src={markLight} alt={alt} width={width} height={height} className={`only-dark ${className ?? ""}`} />
    </>
  );
}
