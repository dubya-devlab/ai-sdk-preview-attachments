import { motion } from "framer-motion";

interface DragOverlayProps {
  isDragging: boolean;
}

export function DragOverlay({ isDragging }: DragOverlayProps) {
  if (!isDragging) return null;

  return (
    <motion.div
      className="fixed pointer-events-none bg-black/90 h-dvh w-dvw z-10 flex flex-row justify-center items-center flex flex-col gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-green-400 font-medium">Drop your n8n workflow files here</div>
      <div className="text-sm text-zinc-500">
        {"(JSON workflows or screenshots)"}
      </div>
    </motion.div>
  );
}
