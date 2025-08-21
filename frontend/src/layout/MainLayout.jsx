import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => (
  <>
    <Navbar/>
    <main className='px-10 lg:px-30 py-10'>
      <Outlet />
    </main>
  </>
);

export default MainLayout;
