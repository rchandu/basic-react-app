import { FC } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const HomePage: FC = () => {
  return (
    <div className='home'>
      <Link to="/repos/godaddy">Go daddy repos</Link>
      <Link to="/repos/unacademy">Unacademy repos</Link>
      <Link to="/videos">Videos home</Link>
    </div>
  );
};

export default HomePage;
