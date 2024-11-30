import ReactPlayer from "react-player";
import { useAppSelector } from "../store";

export const VideoPlayer = () => {
  const currentLesson = useAppSelector(
    (state) => state.player.course.currentLesson
  );
  const currentModuleIndex = useAppSelector(
    (state) =>
      state.player.course.modules[currentLesson.moduleIndex].lessons[
        currentLesson.lessonIndex
      ].id
  );
  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        url={`https://www.youtube.com/watch?v=${currentModuleIndex}`}
      />
    </div>
  );
};
