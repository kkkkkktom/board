import { Loading } from "./_components/loading";
import Canvas from "./_components/canvas";
import { Room } from "@/components/room";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default async function BoardPage({ params }: BoardIdPageProps) {
  //   return <Loading></Loading>;
  const boardId = params.boardId;
  return (
    <Room roomId={boardId} fallback={<Loading />}>
      <Canvas boardId={boardId} />
    </Room>
  );
}
