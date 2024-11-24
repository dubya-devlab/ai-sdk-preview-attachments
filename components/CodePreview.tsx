import { useState } from "react";
import { motion } from "framer-motion";
import { CopyIcon, SaveIcon, CloseIcon } from "./icons";
import { toast } from "sonner";

interface CodePreviewProps {
  code: string;
  onClose: () => void;
}

export function CodePreview({ code, onClose }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleSave = () => {
    try {
      const blob = new Blob([code], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "n8n-workflow.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Workflow saved");
    } catch (err) {
      toast.error("Failed to save workflow");
    }
  };

  return (
    <motion.div
      className="fixed right-4 top-4 bottom-4 w-[800px] bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl flex flex-col overflow-hidden"
      initial={{ x: 800, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 800, opacity: 0 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <h3 className="text-green-400 font-medium">Workflow JSON</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-zinc-400 hover:text-green-400 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            <CopyIcon />
          </button>
          <button
            onClick={handleSave}
            className="p-2 text-zinc-400 hover:text-green-400 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Save to file"
          >
            <SaveIcon />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-green-400 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Close"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-sm font-mono">
          <code className="text-zinc-300">
            {JSON.stringify(JSON.parse(code), null, 2)}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
