import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const SecondaryLayout = () => {
  return (
    <Fragment>
      {/* <header>
        <Link as={ReactLink} to='/'>
          BrandLogo
        </Link>
      </header> */}
      <main>
        <Outlet />
      </main>
      {/* <footer></footer> */}
    </Fragment>
  );
};

export default SecondaryLayout;
