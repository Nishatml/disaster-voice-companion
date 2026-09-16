export function createVoiceSocket(onMessageCallback, onErrorCallback) {
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws/transcribe';
  const socket = new WebSocket(WS_URL);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessageCallback(data);
  };

  socket.onerror = (error) => {
    if (onErrorCallback) onErrorCallback(error);
  };

  return socket;
}