import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";

export const Module = () => {
  return (
    <div>
      <button className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-sm">
          1
        </div>
        <div className="flex flex-col gap-1 text-left ">
          <strong className="text-sm">Desvendando o Redux</strong>
          <span className="text-sm text-zinc-400">2 Aulas</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400" />
      </button>
      <nav className="relative flex flex-col gap-4 p-4">
        <Lesson title="Fundamentos do Redux" duration="2.30" />
        <Lesson title="Fundamentos do Redux" duration="2.30" />
        <Lesson title="Fundamentos do Redux" duration="2.30" />
      </nav>
    </div>
  );
};