"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import CommentItem from "./commentItem";
import CommentInput from "./commentInput";

export interface Comment {
  id: string;
  user: string;
  avatar?: string;
  time: string;
  text: string;
}

interface CommentsProps {
  comments: Comment[];
  onSend: (text: string) => void;
  open: boolean;
  onClose: () => void;
}

export default function Comments({ comments, onSend, open, onClose }: CommentsProps) {
  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
    >
      <DrawerContent
        className="w-[95vw] max-w-sm flex flex-col bg-[#1f1f1f] text-white"
      >
        <DrawerHeader className="border-b border-[#3a3a3a]">
          <DrawerTitle className="text-lg font-semibold">Comment</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-[#242424]">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </div>

        <CommentInput onSend={onSend} />
      </DrawerContent>
    </Drawer>
  );
}
