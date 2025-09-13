"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/ChatBot/AuthoresizeTextArea"

type Message = {
    role: "user" | "assistant"
    content: string
}

export function ChatForm({ className, ...props }: React.ComponentProps<"div">) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")

    useEffect(() => {
        const savedMessages = localStorage.getItem("chatMessages")
        if (savedMessages) setMessages(JSON.parse(savedMessages))
    }, [])

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages))
    }, [messages])

    const header = (
        <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">Helstorm AI Chatbot</h1>

            <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Bientôt disponible
            </p>
        </header>
    )

    return (
        <TooltipProvider>
            <div className={cn("flex h-screen flex-col", className)} {...props}>
                <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
                    {header}
                </div>
                <div className="border-t bg-background p-4 opacity-50 pointer-events-none select-none">
                    <form className="border-input bg-background relative flex items-center rounded-[16px] border px-3 py-1.5 pr-8 text-sm">
                        <AutoResizeTextarea
                            disabled
                            value={input}
                            placeholder="Fonctionnalité bientôt disponible"
                            className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none"
                            onChange={() => {}}
                        />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" variant="ghost" size="sm" className="absolute bottom-1 right-1 size-6 rounded-full" disabled>
                                    <Lock size={16} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={12}>Bientôt disponible</TooltipContent>
                        </Tooltip>
                    </form>
                </div>
            </div>
        </TooltipProvider>
    )
}
