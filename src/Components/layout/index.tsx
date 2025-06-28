import type { ReactNode } from 'react';
import Header from './header';
import { ToastContainer } from 'react-toastify';

type Props = {
  children: ReactNode;
};

const Index = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <ToastContainer />
      {children}
    </div>
  );
};

export default Index;
