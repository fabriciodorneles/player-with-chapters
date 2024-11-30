import { useAppSelector } from "../store";

export const Header = () => {
  const currentLesson = useAppSelector(
    (state) => state.player.course.currentLesson
  );
  const currentModuleTitle = useAppSelector(
    (state) => state.player.course.modules[currentLesson.moduleIndex].title
  );
  return (
    <header>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Fundamentos do Redux</h1>
        <span className="text-sm text-zinc-400">
          {`Módulo "${currentModuleTitle}"`}
        </span>
      </div>
    </header>
  );
};
