export interface ChatMessage {
  senderId: number | null;
  guestId: string | null;
  receiverId: number | null;
  content: string;
  sentAt: number;
}

export interface Conversation {
  key: string;
  customerName: string;
  messages: ChatMessage[];
}

const API_BASE = "http://localhost:1209/api/chat";

export async function fetchInbox(staffId: number): Promise<Conversation[]> {
  const res = await fetch(`${API_BASE}/inbox/${staffId}`);
  if (!res.ok) throw new Error("Không thể tải inbox");

  const dataRaw: any[] = await res.json();

  const data: Conversation[] = dataRaw.map((conv, idx) => {
    const key = conv.customerId
      ? `user-${conv.customerId}`
      : `guest-${conv.guestId}`;

    let customerName: string;
    if (conv.customerId) {
      customerName = conv.customerName ?? `Người dùng ${conv.customerId}`;
    } else {
      customerName = `Khách ${idx + 1}`;
    }

    return { key, customerName, messages: conv.messages };
  });

  return data;
}


export async function fetchHistory(key: string) {
  const res = await fetch(`${API_BASE}/history/${key}`);
  if (!res.ok) throw new Error("Không thể tải lịch sử chat");
  return res.json();
}

export async function sendMessage(body: {
  senderId: number | null;
  guestId: string | null;
  receiverId: number;
  content: string;
}) {
  await fetch(`${API_BASE}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function sendReply(
  body: {
    senderId: number | null;
    guestId: string | null;
    receiverId: number | null;
    content: string;
  },
  role: string
) {
  await fetch(`${API_BASE}/reply?role=${role}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}