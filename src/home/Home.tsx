import { FC } from 'react';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  return (
    <div>
      <Link
        to="/repos"
        className="bg-blue-500 hover:bg-blue-200 text-white py-4 px-8 rounded-lg"
      >
        Go to repos page
      </Link>
    </div>
  );
};

export default HomePage;
