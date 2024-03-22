import { Outlet } from 'react-router-dom';
import HeaderMain from '../headers/header-main';
import FooterMain from '../footers/footer-main';

const LayoutDefault = () => {
  return (
    <>
      <HeaderMain />
      <Outlet />
      <FooterMain />
    </>
  );
};

export default LayoutDefault;
