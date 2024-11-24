import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextFilePreviewProps {
  file: File;
}

function TextFilePreview({ file }: TextFilePreviewProps) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      setContent(typeof text === "string" ? text.slice(0, 100) : "");
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <div className="text-zinc-400">
      {content}
      {content.length >= 100 && "..."}
    </div>
  );
}

interface FilePreviewProps {
  files: FileList;
}

export function FilePreview({ files }: FilePreviewProps) {
  return (
    <div className="flex flex-row gap-2 absolute bottom-16">
      {Array.from(files).map((file) =>
        file.type.startsWith("image") ? (
          <div key={file.name}>
            <motion.img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="rounded-md w-16 border border-zinc-800"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                y: -10,
                scale: 1.1,
                opacity: 0,
                transition: { duration: 0.2 },
              }}
            />
          </div>
        ) : file.type.startsWith("text") ? (
          <motion.div
            key={file.name}
            className="text-[8px] leading-1 w-28 h-16 overflow-hidden text-zinc-400 border border-zinc-800 p-2 rounded-lg bg-zinc-900"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              y: -10,
              scale: 1.1,
              opacity: 0,
              transition: { duration: 0.2 },
            }}
          >
            <TextFilePreview file={file} />
          </motion.div>
        ) : null
      )}
    </div>
  );
}
