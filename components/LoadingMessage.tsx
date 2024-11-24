import { BotIcon } from "./icons";

export function LoadingMessage() {
  return (
    <div className="flex flex-row gap-2">
      <div className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-green-400">
        <BotIcon />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-zinc-500 flex items-center gap-2">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
}
