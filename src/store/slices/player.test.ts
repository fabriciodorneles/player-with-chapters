import { describe, expect, it } from "vitest";
import { player as reducer, play, next } from "./player";

const initialStateMock = {
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
        ],
      },
    ],
  },
};

describe("playerSlice", () => {
  it("should be able to play", () => {
    const state = reducer(
      initialStateMock,
      play({ moduleIndex: 1, lessonIndex: 2 })
    );
    expect(state.course.currentLesson).toEqual({
      moduleIndex: 1,
      lessonIndex: 2,
    });
  });

  it("should be able to play next video automaticaly ", () => {
    const state = reducer(initialStateMock, next());
    expect(state.course.currentLesson).toEqual({
      moduleIndex: 0,
      lessonIndex: 1,
    });
  });

  it("should be able to play next video in next module automaticaly ", () => {
    const state = reducer(
      {
        course: {
          ...initialStateMock.course,
          currentLesson: {
            moduleIndex: 0,
            lessonIndex: 1,
          },
        },
      },
      next()
    );

    expect(state.course.currentLesson).toEqual({
      moduleIndex: 1,
      lessonIndex: 0,
    });
  });

  it("should play nothing if there is no lesson available", () => {
    const state = reducer(
      {
        course: {
          ...initialStateMock.course,
          currentLesson: {
            moduleIndex: 1,
            lessonIndex: 1,
          },
        },
      },
      next()
    );

    expect(state.course.currentLesson).toEqual({
      moduleIndex: 1,
      lessonIndex: 1,
    });
  });
});
