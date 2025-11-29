import Image from "next/image";
export function Loading() {
  return (
    <div className="h-full w-full flex flex-col justify-content items-center bg-red-500">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      ></Image>
    </div>
  );
}
