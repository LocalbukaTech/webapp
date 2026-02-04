import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

interface CommentInputProps {
  onSend?: (text: string) => void
}

export default function CommentInput({ onSend }: CommentInputProps) {
  const [text, setText] = useState("")

  const handleSend = () => {
    if (!text.trim()) return
    onSend?.(text)
    setText("")
  }

  return (
    <div className="p-3 border-t border-[#3b3b3b] bg-[#2c2c2c] flex items-center justify-center">

      {/* Rounded input wrapper */}
      <div className="w-full flex items-center bg-[#1a1a1a] rounded-xl px-4 py-2">

        {/* Input field styled to match screenshot font */}
        <input
          type="text"
          placeholder="Lovely pla"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="
            flex-1 bg-transparent 
            text-white 
            text-[15px] 
            font-medium 
            tracking-[0.01em] 
            leading-none
            focus:outline-none 
            placeholder:text-[#cfcfcf]
          "
        />

        {/* Yellow send button — same as screenshot */}
        <Button
        size="icon"
        onClick={handleSend}
        className="
        rounded-full 
        bg-[#FFC727] 
        hover:bg-[#FFB800] 
        w-8 h-8 
        flex items-center justify-center 
        shadow-sm
        "
>
  <ArrowUp 
    size={16}        // ⬅️ Perfect size for the yellow circle
    strokeWidth={2.4} // ⬅️ Matches thin clean screenshot stroke
    className="text-black"
  />
</Button>



      </div>
    </div>
  )
}
