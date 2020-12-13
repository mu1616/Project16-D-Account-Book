import React, { useEffect } from 'react';
import useStore from '../../hook/use-store/useStore';
import { observer } from 'mobx-react';
import { Accountbook } from '../../types/accountbook';
import styled from 'styled-components';

import AccountbookCard from '../../components/accountbook-selection-page/accountbook-card/AccountbookCard';
import AddAccountbookCard from '../../components/accountbook-selection-page/add-accountbook-card/AddAccountbookCard';

import AccountbookDeleteByUserModal from '../../components/common/modals/accountbook-delete-by-user/AccountbookDeleteByUserModal';
import GiveAdminModal from '../../components/common/modals/give-admin-modal/GiveAdminModal';
import AccountbookDeleteByAdminModal from '../../components/common/modals/accountbook-delete-by-admin/AccountbookDeleteByAdminModal';

const ViewWrapper = styled.div`
  font-family: 'Spoqa Han Sans';
  width: 40%;
  padding-top: 5%;
  margin: 0 auto;
`;

const AccountbookSelectionPage: React.FC = () => {
  const { rootStore } = useStore();
  const { accountbookStore } = rootStore;
  const {
    deleteAccountbookByAdminStore,
    deleteAccountbookByUserStore,
    giveAdminStore,
  } = useStore().rootStore.modalStore;

  const updateAccountbooks = () => {
    accountbookStore.updateAccountbooks();
  };

  useEffect(() => {
    updateAccountbooks();
  }, []);

  return (
    <>
      {giveAdminStore.show && <GiveAdminModal />}
      {deleteAccountbookByUserStore.show && <AccountbookDeleteByUserModal />}
      {deleteAccountbookByAdminStore.show && <AccountbookDeleteByAdminModal />}
      <ViewWrapper>
        {accountbookStore.accountbooks.map((accountbook) => {
          return (
            <div key={accountbook.id}>
              <AccountbookCard
                id={accountbook.id}
                title={accountbook.title}
                color={accountbook.color}
                description={accountbook.description}
                accountbookId={accountbook.accountbookId}
              />
            </div>
          );
        })}
        <AddAccountbookCard />
      </ViewWrapper>
    </>
  );
};

export default observer(AccountbookSelectionPage);
