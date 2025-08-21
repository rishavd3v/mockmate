import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes/>
      <Toaster richColors position="top-right"/>
    </BrowserRouter>
  )
}

export default App
