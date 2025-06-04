"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { InferenceClient } from "@huggingface/inference";
import { X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_WIDTH = 720;
const DEFAULT_HEIGHT = 600;

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      text: "Hello! I am an AI assistant. How can I help you today?",
      sender: "ai",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Center modal on mount
  useEffect(() => {
    setIsMounted(true);
    const initialX = (window.innerWidth - DEFAULT_WIDTH) / 2;
    const initialY = (window.innerHeight - DEFAULT_HEIGHT) / 2;
    setPosition({ x: initialX, y: initialY });
  }, []);


  // Auto-scroll within modal container
  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const huggingFaceToken = process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN || "";

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isAiTyping) return;
    const userText = inputValue;
    setInputValue("");
    setIsAiTyping(true);

    // Reset textarea height after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const hf = new InferenceClient(huggingFaceToken);
      const result = await hf.chatCompletion({
        provider: "cerebras",
        model: "Qwen/Qwen3-32B",
        messages: [
          {
            role: "user",
            content: `Give an intro to propmpt first add emoji/markdown.
             Every line should have no more than 75 chars.Line breaks/wraps are allowed.
             The query is  ${userText}`,
          },
        ],
      });
      console.log("AI response:", result);
      let aiText = result.choices[0]?.message.content ?? "Sorry, I couldn't generate a response.";
      const thinkIndex = aiText.indexOf("/think");
      if (thinkIndex !== -1) {
        aiText = aiText.substring(thinkIndex + "/think".length).trim();
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: aiText,
          sender: "ai",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Sorry, I encountered an error. Please try again.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const onResizeStop = (
    _: any,
    __: any,
    ref: HTMLElement,
    delta: { width: number; height: number }
  ) => {
    setSize((prev) => ({
      width: prev.width + delta.width,
      height: prev.height + delta.height,
    }));
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      const maxHeight = size.height * 0.35;
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  if (!isOpen || !isMounted) return null;

  return (
    <>
      <div
        className="modal-overlay"
        style={{
          position: "fixed",
          zIndex: 999,
          inset: 0,
          background: "transparent",
          pointerEvents: "none",
        }}
      />
      <Draggable nodeRef={nodeRef} handle=".modal-header" defaultPosition={{ x: position.x, y: position.y }}>
        <div
          ref={nodeRef}
          style={{
            position: "absolute",
            zIndex: 1000,
            left: 0,
            top: 0,
            width: size.width,
            height: size.height,
            borderRadius: 12,
            overflow: "hidden",
            background: "#18181b",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Resizable
            size={{ width: size.width, height: size.height }}
            minWidth={320}
            minHeight={400}
            maxWidth={window.innerWidth * 0.95}
            maxHeight={window.innerHeight * 0.95}
            onResizeStop={onResizeStop}
            enable={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="chat-modal-content"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="modal-header">
                <div className="flex items-center gap-2">
                  <Bot size={18} color="#42c498" />
                  <span>AI Chat</span>
                </div>
                <button
                  onClick={onClose}
                  className="close-button"
                  aria-label="Close"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#aaa",
                    cursor: "pointer",
                    borderRadius: 4,
                    padding: 4,
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div ref={messagesContainerRef} className="messages-container" style={{ flex: 1, overflowY: "auto" }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-row ${msg.sender}`}
                    style={{
                      display: "flex",
                      justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      className={`message-bubble ${msg.sender}`}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        gap: 8,
                        background: msg.sender === "user" ? "#2563eb" : "#27272a",
                        color: msg.sender === "user" ? "#fff" : "#e0e0e0",
                        padding: "10px 14px",
                        borderRadius: 16,
                        margin: "2px 0",
                        maxWidth: "95%",
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                      }}
                    >
                      {msg.sender === "ai" ? (
                        <Bot size={16} color="#42c498" style={{ marginTop: 2 }} />
                      ) : (
                        <User size={16} color="#fff" style={{ marginTop: 2 }} />
                      )}
                      <div style={{ width: "100%" }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="message-row ai">
                    <div className="message-bubble ai">
                      <Bot size={16} color="#42c498" style={{ marginTop: 2 }} />
                      <span>AI is typing...</span>
                    </div>
                  </div>
                )}
              </div>

              <form
                className="input-area"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  borderTop: "1px solid #27272a",
                  background: "#232326",
                  padding: "12px 10px",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleTextareaChange}
                  placeholder="Type your message..."
                  disabled={isAiTyping}
                  style={{
                    flex: 1,
                    borderRadius: 12,
                    border: "1px solid #333",
                    background: "#19191c",
                    color: "#e0e0e0",
                    fontSize: 15,
                    padding: "10px 12px",
                    resize: "none",
                    overflowY: "auto",
                    maxHeight: size.height * 0.35,
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={isAiTyping || !inputValue.trim()}
                  aria-label="Send"
                  style={{
                    background: "#42c498",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: isAiTyping || !inputValue.trim() ? "not-allowed" : "pointer",
                    opacity: isAiTyping || !inputValue.trim() ? 0.7 : 1,
                  }}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </Resizable>
        </div>
      </Draggable>

      <style jsx global>{`
        body.modal-open {
          /* No overflow hidden, background remains scrollable */
        }
        .messages-container {
          flex: 1 1 0%;
          overflow-y: auto;
          padding: 18px 10px 10px 10px;
          background: #18181b;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #222;
          padding: 10px 16px;
          border-bottom: 1px solid #27272a;
          font-weight: 500;
          cursor: grab;
          user-select: none;
        }
        .modal-header:active {
          cursor: grabbing;
        }
        .message-row.user {
          flex-direction: row-reverse;
        }
        .message-bubble.user {
          border-bottom-right-radius: 4px !important;
        }
        .message-bubble.ai {
          border-bottom-left-radius: 4px !important;
        }
      `}</style>
    </>
  );
};

export default ChatModal;
