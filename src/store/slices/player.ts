import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";
interface CurrentLesson {
  lessonIndex: number;
  moduleIndex: number;
}

interface Course {
  id: number;
  modules: Array<{
    id: string;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

interface PlayerState {
  currentLesson: CurrentLesson;
  course: Course | null;
  isLoading: boolean;
}
const initialState: PlayerState = {
  currentLesson: {
    lessonIndex: 0,
    moduleIndex: 0,
  },
  course: null,
  isLoading: true,
};

export const loadCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get("/courses/1");

  return response.data;
});

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<CurrentLesson>) => {
      state.currentLesson.lessonIndex = action.payload.lessonIndex;
      state.currentLesson.moduleIndex = action.payload.moduleIndex;
    },
    next: (state) => {
      const nextLessonIndex = state.currentLesson.lessonIndex + 1;
      const moduleIndex = state.currentLesson.moduleIndex;
      const nextLesson =
        state.course?.modules[moduleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        state.currentLesson.lessonIndex = nextLessonIndex;
      } else {
        const nextModule = state.course?.modules[moduleIndex + 1];
        if (nextModule) {
          state.currentLesson.moduleIndex = moduleIndex + 1;
          state.currentLesson.lessonIndex = 0;
        }
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(loadCourse.fulfilled, (state, action) => {
  //     state.course = action.payload;
  //   });
  // }
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions;

export const useIsLoading = () => {
  return useAppSelector((state) => state.player.isLoading);
};

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { lessonIndex, moduleIndex } = state.player.currentLesson;
    const currentModule = state.player.course?.modules[moduleIndex];
    const currentLesson = currentModule?.lessons[lessonIndex];

    return { currentLesson, currentModule };
  });
};
