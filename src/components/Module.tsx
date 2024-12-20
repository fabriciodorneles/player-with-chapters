import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";

interface ModuleProps {
  moduleIndex: number;
  title: string;
  lessonsAmount: number;
}

export const Module = ({ moduleIndex, title, lessonsAmount }: ModuleProps) => {
  const dispatch = useAppDispatch();
  const currentLesson = useAppSelector((state) => state.player.currentLesson);
  const lessons = useAppSelector(
    (state) => state.player.course?.modules[moduleIndex].lessons
  );

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full ">
        <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
          <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-sm">
            {moduleIndex + 1}
          </div>
          <div className="flex flex-col gap-1 text-left ">
            <strong className="text-sm">{title}</strong>
            <span className="text-sm text-zinc-400">{`${lessonsAmount} Aulas`}</span>
          </div>
          <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-4">
          {lessons &&
            lessons.map((lesson, lessonIndex) => (
              <Lesson
                key={lessonIndex}
                title={lesson.title}
                duration={lesson.duration}
                onPlay={() => dispatch(play({ moduleIndex, lessonIndex }))}
                isSelected={
                  currentLesson.moduleIndex === moduleIndex &&
                  currentLesson.lessonIndex === lessonIndex
                }
              />
            ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
