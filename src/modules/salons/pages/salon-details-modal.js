import React from 'react';
import { useParams } from 'react-router-dom';
import { Page, PageModal } from '../../../components/common';

import USERS from '../../../_mock/users.json';
const getUserById = (id) => USERS.find((user) => user.id === +id);

const SalonDetailsModal = (props) => {
  const { userId } = useParams();
  const user = getUserById(userId);

  return (
    <Page title={`${user.firstName} ${user.lastName}`}>
      <PageModal
        title={`${user.firstName} ${user.lastName}`}
        closeBtnTitle='Cancel'
        submitBtnTitle='Save'
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
        similique laborum, id ratione et, possimus, porro explicabo architecto
        doloribus voluptates impedit praesentium modi eum consequuntur ipsum
        asperiores? Praesentium, eligendi eum.
      </PageModal>
    </Page>
  );
};

export default SalonDetailsModal;
