"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function N8nChatWidget() {
  useEffect(() => {
    // Import CSS
    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <Script
        id="n8n-chat-widget"
        type="module"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
            createChat({
              webhookUrl: 'http://localhost:5678/webhook/chat'
            });
          `,
        }}
      />
    </>
  );
}
