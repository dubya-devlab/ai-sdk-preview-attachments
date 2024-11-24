import { ChangeEvent, ClipboardEvent, FormEvent, useRef, useState } from "react";
import { AttachmentIcon, SendIcon } from "./icons";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import { FilePreview } from "./FilePreview";
import { ChatInputProps } from "../types/chat";

export function ChatInput({ input, handleInputChange, handleSubmit }: ChatInputProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const items = event.clipboardData?.items;

    if (items) {
      const files = Array.from(items)
        .map((item) => item.getAsFile())
        .filter((file): file is File => file !== null);

      if (files.length > 0) {
        const validFiles = files.filter(
          (file) =>
            file.type.startsWith("image/") || file.type.startsWith("text/")
        );

        if (validFiles.length === files.length) {
          const dataTransfer = new DataTransfer();
          validFiles.forEach((file) => dataTransfer.items.add(file));
          setFiles(dataTransfer.files);
        } else {
          toast.error("Only image and text files are allowed");
        }
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("text/")
      );

      if (validFiles.length === selectedFiles.length) {
        const dataTransfer = new DataTransfer();
        validFiles.forEach((file) => dataTransfer.items.add(file));
        setFiles(dataTransfer.files);
      } else {
        toast.error("Only image and text files are allowed");
      }
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = files ? { experimental_attachments: files } : {};
    handleSubmit(event, options);
    setFiles(null);
  };

  return (
    <form className="flex flex-col gap-2 relative" onSubmit={onSubmit}>
      <AnimatePresence>
        {files && files.length > 0 && <FilePreview files={files} />}
      </AnimatePresence>

      <input
        type="file"
        multiple
        accept="image/*,text/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center w-full bg-zinc-900 rounded-xl px-4 py-3 shadow-lg border border-zinc-800">
        <button
          type="button"
          onClick={handleUploadClick}
          className="text-zinc-400 hover:text-green-400 focus:outline-none mr-3 p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label="Upload Files"
        >
          <span className="w-5 h-5">
            <AttachmentIcon aria-hidden="true" />
          </span>
        </button>

        <input
          ref={inputRef}
          className="bg-transparent flex-grow outline-none text-zinc-300 placeholder-zinc-600 text-base"
          placeholder="Share your n8n workflow or describe what you want to achieve..."
          value={input}
          onChange={handleInputChange}
          onPaste={handlePaste}
        />

        <button
          type="submit"
          disabled={!input && !files}
          className={`p-2 rounded-lg transition-colors ${
            input || files
              ? "text-green-400 hover:bg-zinc-800 ring-1 ring-green-500"
              : "text-zinc-700"
          }`}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
}
