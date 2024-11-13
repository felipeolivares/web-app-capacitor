import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [response, setResponse] = useState<string>('');

  // Função para abrir a câmera
  const openCamera = () => {
    sendMessageToNativeApp("openCamera");
  };

  // Função para obter a localização
  const getLocation = () => {
    sendMessageToNativeApp("getLocation");
  };

  // Função para mostrar um toast
  const showToast = () => {
    sendMessageToNativeApp("showToast");
  };

  // Função para enviar uma mensagem ao aplicativo React Native
  const sendMessageToNativeApp = (message: string) => {
    window.ReactNativeWebView?.postMessage(message);
  };

  useEffect(() => {
    // Listener para receber mensagens do app React Native
    const handleMessage = (event: MessageEvent) => {
      setResponse(`Response from app: ${JSON.stringify(event.data)}`);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>React Native WebView Example</h1>
      
      <button onClick={openCamera}>Open Camera</button>
      <button onClick={getLocation}>Get Location</button>
      <button onClick={showToast}>Show Toast</button>

      <p>{response}</p>
    </div>
  );
};

export default App;
