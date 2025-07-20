import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Toaster } from 'sonner';

const MainLayout = () => (
  <>
    <Navbar/>
    <main className='px-30 py-10'>
      <Outlet />
    </main>
    <Toaster/>
  </>
);

export default MainLayout;
