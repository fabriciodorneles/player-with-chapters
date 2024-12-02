import { useCurrentLesson, useIsLoading } from "../store/slices/player";

export const Header = () => {
  const { currentLesson, currentModule } = useCurrentLesson();
  const isCourseLoading = useIsLoading();

  if (isCourseLoading) {
    return <h1 className="text-2x font-bold">Carregando...</h1>;
  }

  return (
    <header>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
        <span className="text-sm text-zinc-400">
          {`Módulo "${currentModule?.title}"`}
        </span>
      </div>
    </header>
  );
};
