import Canvas from "./_components/canvas";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default function BoardPage({ params }: BoardIdPageProps) {
  return <Canvas boardId={params.boardId} />;
}
