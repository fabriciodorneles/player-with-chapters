import { PlayCircle, Video } from "lucide-react";

interface LessonProps {
  title: string;
  duration: string;
  onPlay: () => void;
  isSelected?: boolean;
}

export const Lesson = ({
  title,
  duration,
  onPlay,
  isSelected = false,
}: LessonProps) => {
  return (
    <button
      onClick={onPlay}
      data-active={isSelected}
      disabled={isSelected}
      className="flex items-center gap-3 text-sm enabled:hover:text-zinc-100 text-zinc-400 data-[active=true]:text-emerald-400"
    >
      {isSelected ? (
        <PlayCircle className="w-4 h-4 text-emerald-400" />
      ) : (
        <Video className="w-4 h-4 text-zinc-500" />
      )}
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  );
};
