import { AppRouter } from './routes/AppRouter';
import { Toaster } from 'sonner';
import { IntelliChatWidget } from './components/intellichat/organisms/IntelliChatWidget';

function App() {
  return (
    <>
      <Toaster position="bottom-right" theme="system" richColors />
      <AppRouter />
      <IntelliChatWidget />
    </>
  );
}

export default App;
