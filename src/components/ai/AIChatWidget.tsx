// AI Chat Widget — Floating chat with real-time thinking + response streaming

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Loader2, Sparkles, Minimize2, Brain, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { createChatSession, sendChatMessage } from '../../services/ai/recipeChat';
import type { ChatSession } from '../../services/ai/recipeChat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  thinking?: string;
  isStreaming?: boolean;
  isThinking?: boolean;
}

interface AIChatWidgetProps {
  recipeContext?: string;
}

export function AIChatWidget({ recipeContext }: AIChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm **INIXA**, your AI cooking assistant. Ask me anything about recipes, cooking tips, or ingredient substitutions!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [session] = useState<ChatSession>(() => createChatSession(recipeContext));
  const [showThinking, setShowThinking] = useState<Record<number, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    // Add streaming placeholder with thinking state
    const assistantIdx = messages.length + 1; // +1 for user msg just added
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: '', thinking: '', isStreaming: true, isThinking: true },
    ]);

    let streamedThinking = '';
    let streamedContent = '';

    await sendChatMessage(
      session,
      userMsg,
      // onThinkChunk
      (chunk) => {
        streamedThinking += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = { ...last, thinking: streamedThinking, isThinking: true };
          return updated;
        });
      },
      // onContentChunk
      (chunk) => {
        streamedContent += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            content: streamedContent,
            isThinking: false,
            isStreaming: true,
          };
          return updated;
        });
      }
    );

    // Finalize
    setMessages((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      updated[updated.length - 1] = {
        ...last,
        content: streamedContent,
        thinking: streamedThinking,
        isStreaming: false,
        isThinking: false,
      };
      return updated;
    });
    setLoading(false);
  };

  const quickPrompts = [
    'What can I make with eggs?',
    'Substitute for yogurt?',
    'Tips for perfect rice',
    'Quick 15-min recipe',
  ];

  const toggleThinking = (idx: number) => {
    setShowThinking((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--color-impossible-red)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(225,6,0,0.4)',
              zIndex: 1000,
            }}
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 400,
              height: 560,
              borderRadius: 20,
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1001,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '14px 20px',
                background: 'var(--color-impossible-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Sparkles size={18} color="#fff" />
                <div>
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#fff',
                      textTransform: 'uppercase',
                    }}
                  >
                    INIXA AI
                  </h3>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>
                    Powered by Inixa • Streaming
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Minimize2 size={14} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                scrollbarWidth: 'thin',
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    flexDirection: 'column',
                    alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    gap: 4,
                  }}
                >
                  {/* Thinking block */}
                  {msg.role === 'assistant' && (msg.thinking || msg.isThinking) && (
                    <div style={{ width: '90%' }}>
                      {/* Thinking header / toggle */}
                      <button
                        onClick={() => toggleThinking(i)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '4px 8px',
                          borderRadius: 6,
                          background: 'rgba(139,92,246,0.1)',
                          border: '1px solid rgba(139,92,246,0.2)',
                          color: '#a78bfa',
                          fontSize: 10,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: "'Outfit', sans-serif",
                          letterSpacing: '0.04em',
                          marginBottom: 4,
                        }}
                      >
                        <Brain size={10} />
                        {msg.isThinking ? (
                          <motion.span
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                          >
                            Thinking...
                          </motion.span>
                        ) : (
                          <>
                            Thought Process
                            <ChevronDown
                              size={10}
                              style={{
                                transform: showThinking[i] ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 200ms',
                              }}
                            />
                          </>
                        )}
                      </button>

                      {/* Thinking content */}
                      <AnimatePresence>
                        {(msg.isThinking || showThinking[i]) && msg.thinking && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{
                              overflow: 'hidden',
                              maxHeight: 150,
                              overflowY: 'auto',
                              padding: '8px 10px',
                              borderRadius: 10,
                              background: 'rgba(139,92,246,0.06)',
                              border: '1px solid rgba(139,92,246,0.12)',
                              fontSize: 11,
                              lineHeight: 1.5,
                              color: '#a78bfa',
                              fontFamily: "'JetBrains Mono', monospace",
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                              scrollbarWidth: 'thin',
                            }}
                          >
                            {msg.thinking}
                            {msg.isThinking && (
                              <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                style={{ color: '#a78bfa' }}
                              >
                                ▊
                              </motion.span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Main content bubble */}
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius:
                        msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      background:
                        msg.role === 'user'
                          ? 'var(--color-impossible-red)'
                          : 'var(--bg-secondary)',
                      color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                      fontSize: 13,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p style={{ margin: '0 0 8px 0', padding: 0 }} {...props} />,
                          ul: ({ node, ...props }) => <ul style={{ margin: '0 0 8px 0', paddingLeft: 20 }} {...props} />,
                          ol: ({ node, ...props }) => <ol style={{ margin: '0 0 8px 0', paddingLeft: 20 }} {...props} />,
                          li: ({ node, ...props }) => <li style={{ marginBottom: 4 }} {...props} />,
                          strong: ({ node, ...props }) => <strong style={{ fontWeight: 700 }} {...props} />,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                    
                    {msg.isStreaming && !msg.content && msg.isThinking && (
                      <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>
                        waiting for response...
                      </span>
                    )}
                    {msg.isStreaming && msg.content && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        ▊
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 16px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => setInput(p)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 500,
                      background: 'rgba(225,6,0,0.08)',
                      color: '#e10600',
                      border: '1px solid rgba(225,6,0,0.15)',
                      cursor: 'pointer',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                gap: 8,
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about cooking..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={loading || !input.trim()}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: loading ? 'var(--bg-secondary)' : 'var(--color-impossible-red)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <Loader2 size={16} />
                  </motion.div>
                ) : (
                  <Send size={16} />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
