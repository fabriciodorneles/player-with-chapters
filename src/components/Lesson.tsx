import { Video } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCurrentLesson } from "../store/slices/player";

interface LessonProps {
  title: string;
  duration: string;
  moduleIndex: number;
  lessonIndex: number;
}

export const Lesson = ({
  title,
  duration,
  moduleIndex,
  lessonIndex,
}: LessonProps) => {
  const dispatch = useDispatch();
  const handleSelectLesson = () => {
    dispatch(setCurrentLesson({ moduleIndex, lessonIndex }));
  };

  return (
    <button
      className="flex items-center gap-3 text-sm text-zinc-400"
      onClick={handleSelectLesson}
    >
      <Video className="w-4 h-4 text-zinc-500" />
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  );
};
