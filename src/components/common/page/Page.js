import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Page = (props) => {
  const { title, description } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{title || 'Page title'}</title>
        <meta name='description' content={description || 'Page description'} />
      </Helmet>
      {props.children}
    </Fragment>
  );
};

export default Page;
