import { AppRouter } from './routes/AppRouter';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position="bottom-right" theme="system" richColors />
      <AppRouter />
    </>
  );
}

export default App;
