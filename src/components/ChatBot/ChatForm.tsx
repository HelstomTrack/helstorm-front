"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpIcon } from 'lucide-react'
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
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages))
    }, [messages])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage: Message = { role: "user", content: input }
        setMessages((prevMessages) => [...prevMessages, userMessage])
        setInput("")

        try {
            const response = await fetch("http://localhost:10302/chat/prog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            })

            if (!response.ok) {
                throw new Error("Failed to fetch response")
            }

            const data = await response.json()
            setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: data.response }])
        } catch (error) {
            console.error("Error:", error)
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
            ])
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
        }
    }

    const header = (
        <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">Basic AI Chatbot Template</h1>
            <p className="text-muted-foreground text-sm">
                This is an AI chatbot app template built with <span className="text-foreground">Next.js</span> and Symfony
                backend.
            </p>
            <p className="text-muted-foreground text-sm">Send a message to get started.</p>
        </header>
    )

    const messageList = (
        <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
                <div
                    key={index}
                    data-role={message.role}
                    className="max-w-[80%] rounded-xl px-3 py-2 text-sm data-[role=assistant]:self-start data-[role=user]:self-end data-[role=assistant]:bg-gray-100 data-[role=user]:bg-blue-500 data-[role=assistant]:text-black data-[role=user]:text-white"
                >
                    {message.content}
                </div>
            ))}
        </div>
    )

    return (
        <TooltipProvider>
            <div
                className={cn(
                    "flex h-screen flex-col",
                    className
                )}
                {...props}
            >
                <div className="flex-1 overflow-y-auto p-6">
                    {messages.length ? messageList : header}
                </div>
                <div className="border-t bg-background p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="border-input bg-background focus-within:ring-ring/10 relative flex items-center rounded-[16px] border px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0"
                    >
                        <AutoResizeTextarea
                            onKeyDown={handleKeyDown}
                            onChange={setInput}
                            value={input}
                            placeholder="Enter a message"
                            className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none"
                        />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="submit" variant="ghost" size="sm" className="absolute bottom-1 right-1 size-6 rounded-full">
                                    <ArrowUpIcon size={16} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={12}>Submit</TooltipContent>
                        </Tooltip>
                    </form>
                </div>
            </div>
        </TooltipProvider>
    )
}