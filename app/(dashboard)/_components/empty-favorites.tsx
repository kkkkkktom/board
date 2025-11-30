import Image from "next/image";

export const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-favoraties.svg" height={140} width={140} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">没有收藏模版</h2>
      <p className="text-muted-foregrounf text-sm mt-2">快去收藏一个模版吧</p>
    </div>
  );
};
