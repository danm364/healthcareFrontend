import { useAuth0 } from '@auth0/auth0-react';
import { Alert, Button, Table, UncontrolledAlert } from 'reactstrap';
import { useFetch } from '../hooks/useFetch';
import Loading from './Loading';
import { linkContext } from '../utils/context';
import { getConfig } from '../config';
import { useState } from 'react';

function isPrimary(primaryUserId, identity) {
  return (
    identity.provider !== primaryUserId.split('|')[0] ||
    identity.user_id !== primaryUserId.split('|')[1]
  );
}

export default function LinkedAccounts() {

};
