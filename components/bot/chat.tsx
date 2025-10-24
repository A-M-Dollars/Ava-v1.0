'use client'

import React, { useEffect, useRef, useState } from 'react'
import { send } from "@/public/svgs/svgs"
import { IconFolderCode } from "@tabler/icons-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"


interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ava';
  timestamp: Date;
}

const ChatSide = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAvaInitialized, setIsAvaInitialized] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Initialize Ava if this is the first message
    if (!isAvaInitialized) {
      setIsAvaInitialized(true);
    }

    // Simulate Ava's response (replace with actual API call)
    try {
      // Replace this with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const avaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `This is Ava's response to: "${userMessage.text}"`,
        sender: 'ava',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, avaMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages container - takes remaining space and scrolls */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!isAvaInitialized && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <IconFolderCode />
                </EmptyMedia>
                <EmptyTitle>Start Chatting</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t made any inquries yet. Get started by sending
                  your first text today.
                </EmptyDescription>
              </EmptyHeader>

            </Empty>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${message.sender === 'user'
                    ? 'bg-[#2A0B32] text-white'
                    : 'bg-gray-200 text-gray-800'
                    }`}
                >
                  <p className="text-[14px]">{message.text}</p>
                  <span className="text-[10px] opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Textbox - sticks to bottom */}
      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Ava anything..."
            rows={1}
            className="flex-1 px-3 py-2 w-full bg-gray-300 
            resize-none overflow-hidden rounded-sm text-[14px]
            focus:outline-[#2A0B32]"
            style={{ minHeight: "100px", maxHeight: "200px" }}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-[#2A0B32] text-white rounded-sm 
            hover:bg-[#3a1542] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
            text-[14px] h-[40px]"
          >
            {send}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatSide