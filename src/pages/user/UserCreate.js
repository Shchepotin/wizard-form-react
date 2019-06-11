import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AccountForm from '../../components/user/AccountForm';
import ProfileForm from '../../components/user/ProfileForm';
import ContactForm from '../../components/user/ContactForm';
import CapabilityForm from '../../components/user/CapabilityForm';

import styles from '../../styles';

// Router
import router from '../../history';

// Actions
import { receiveUserDraft, storeUserDraft, syncUserDraft } from '../../actions/userDraft';

const UserCreate = ({ userDraft, receiveUserDraft, storeUserDraft, syncUserDraft }) => {
  const [tab, setTab] = useState('account');

  const [onInput] = useDebouncedCallback((values) => {
    syncUserDraft({
      ...userDraft,
      ...values,
    });
  }, 300);

  const onSave = (values) => {
    storeUserDraft({
      ...userDraft,
      ...values,
    });

    // Reset
    receiveUserDraft(null);

    router.push('/');
  };

  const onNext = (tab, values) => {
    receiveUserDraft({
      ...userDraft,
      ...values,
    });

    setTab(tab);
  };

  const onBack = (tab, values) => {
    receiveUserDraft({
      ...userDraft,
      ...values,
    });

    setTab(tab);
  };

  return (
    <Container maxWidth="md">
      Adding new user.

      <div>
        { tab === 'account' && (
          <AccountForm
            initialValues={userDraft}
            onSubmit={onNext.bind(null, 'profile')}
            onInput={onInput}
          />
        )}

        { tab === 'profile' && (
          <ProfileForm
            initialValues={userDraft}
            onSubmit={onNext.bind(null, 'contact')}
            back="back"
            onBack={onBack.bind(null, 'account')}
            onInput={onInput}
          />
        )}

        { tab === 'contact' && (
          <ContactForm
            initialValues={userDraft}
            onSubmit={onNext.bind(null, 'capability')}
            back="back"
            onBack={onBack.bind(null, 'profile')}
            onInput={onInput}
          />
        )}

        { tab === 'capability' && (
          <CapabilityForm
            initialValues={userDraft}
            onSubmit={onSave}
            back="back"
            onBack={onBack.bind(null, 'contact')}
            onInput={onInput}
          />
        )}
      </div>
    </Container>
  );
};

UserCreate.propTypes = {
  userDraft: PropTypes.object.isRequired,
  receiveUserDraft: PropTypes.func.isRequired,
  storeUserDraft: PropTypes.func.isRequired,
};

export default connect(({ userDraft }) => ({
  userDraft: userDraft.item,
}), {
  receiveUserDraft,
  storeUserDraft,
  syncUserDraft,
})(withStyles(styles)(UserCreate));
