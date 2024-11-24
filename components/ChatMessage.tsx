import { BotIcon, UserIcon } from "./icons";
import { Markdown } from "./markdown";
import { motion } from "framer-motion";
import { Message } from "../types/chat";

const getTextFromDataUrl = (dataUrl: string) => {
  const base64 = dataUrl.split(",")[1];
  return window.atob(base64);
};

export function ChatMessage({ message }: { message: Message }) {
  return (
    <motion.div
      className="flex flex-row gap-2"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-green-400">
        {message.role === "assistant" ? <BotIcon /> : <UserIcon />}
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-zinc-300 flex flex-col gap-4">
          <Markdown>{message.content}</Markdown>
        </div>
        <div className="flex flex-row gap-2">
          {message.experimental_attachments?.map((attachment) =>
            attachment.contentType?.startsWith("image") ? (
              <img
                className="rounded-md w-40 mb-3 border border-zinc-800"
                key={attachment.name}
                src={attachment.url}
                alt={attachment.name}
              />
            ) : attachment.contentType?.startsWith("text") ? (
              <div className="text-xs w-40 h-24 overflow-hidden text-zinc-400 border border-zinc-800 p-2 rounded-md bg-zinc-900 mb-3">
                {getTextFromDataUrl(attachment.url)}
              </div>
            ) : null
          )}
        </div>
      </div>
    </motion.div>
  );
}
