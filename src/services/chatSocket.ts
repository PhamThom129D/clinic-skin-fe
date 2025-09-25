import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function connectChatSocket(
  staffId: number,
  onUpdate: () => void
): () => void {
  const sock = new SockJS("http://localhost:1209/ws-chat");
  const client = new Client({
    webSocketFactory: () => sock,
    onConnect: () => {
      client.subscribe("/topic/inbox-updates", (msg) => {
        if (msg.body === `staff-${staffId}`) {
          onUpdate();
        }
      });
    },
  });

  client.activate();
  return () => client.deactivate();
}


export function connectMessageSocket(
  key: string,
  onMessage: (body: any) => void
): () => void {
  const sock = new SockJS("http://localhost:1209/ws-chat");
  const client = new Client({
    webSocketFactory: () => sock,
    onConnect: () => {
      client.subscribe(`/topic/message/${key}`, (msg) => {
        onMessage(JSON.parse(msg.body));
      });
    },
  });

  client.activate();
  return () => client.deactivate();
}