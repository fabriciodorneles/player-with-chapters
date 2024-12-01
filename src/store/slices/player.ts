import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

interface currentLesson {
  lessonIndex: number;
  moduleIndex: number;
}

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    course: {
      currentLesson: {
        lessonIndex: 0,
        moduleIndex: 0,
      },
      modules: [
        {
          id: "1",
          title: "Iniciando com React",
          lessons: [
            { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
            {
              id: "w-DW4DhDfcw",
              title: "Estilização do Post",
              duration: "10:05",
            },
            {
              id: "D83-55LUdKE",
              title: "Componente: Header",
              duration: "06:33",
            },
            {
              id: "W_ATsETujaY",
              title: "Componente: Sidebar",
              duration: "09:12",
            },
            { id: "Pj8dPeameYo", title: "CSS Global", duration: "03:23" },
            {
              id: "8KBq2vhwbac",
              title: "Form de comentários",
              duration: "11:34",
            },
          ],
        },
        {
          id: "2",
          title: "Estrutura da aplicação",
          lessons: [
            {
              id: "gE48FQXRZ_o",
              title: "Componente: Comment",
              duration: "13:45",
            },
            { id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
            {
              id: "h5JA3wfuW1k",
              title: "Interações no JSX",
              duration: "06:33",
            },
            {
              id: "1G0vSTqWELg",
              title: "Utilizando estado",
              duration: "09:12",
            },
          ],
        },
      ],
    },
  },
  reducers: {
    play: (state, action: PayloadAction<currentLesson>) => {
      state.course.currentLesson.lessonIndex = action.payload.lessonIndex;
      state.course.currentLesson.moduleIndex = action.payload.moduleIndex;
    },
    next: (state) => {
      const nextLessonIndex = state.course.currentLesson.lessonIndex + 1;
      const moduleIndex = state.course.currentLesson.moduleIndex;
      const nextLesson =
        state.course.modules[moduleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        state.course.currentLesson.lessonIndex = nextLessonIndex;
      } else {
        const nextModule = state.course.modules[moduleIndex + 1];
        if (nextModule) {
          state.course.currentLesson.moduleIndex = moduleIndex + 1;
          state.course.currentLesson.lessonIndex = 0;
        }
      }
    },
  },
});

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { lessonIndex, moduleIndex } = state.player.course.currentLesson;
    const currentModule = state.player.course.modules[moduleIndex];
    const currentLesson = currentModule.lessons[lessonIndex];

    return { currentLesson, currentModule };
  });
};
