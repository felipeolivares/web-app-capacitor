import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';

const App: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    setPhoto(`data:image/jpeg;base64,${image.base64String}`);
  };

  const saveMessage = async () => {
    await Storage.set({
      key: 'user-message',
      value: message,
    });
    alert('Message saved!');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Web App with Capacitor Plugins</h1>
      <button onClick={takePicture}>Take Picture</button>
      {photo && <img src={photo} alt="" style={{ width: '100%', maxWidth: '300px' }} />}
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={saveMessage}>Save Message</button>
      </div>
    </div>
  );
};

export default App;
