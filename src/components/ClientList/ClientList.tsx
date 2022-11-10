import { mockClients } from '../../assets/mockData';
import { Container } from '@mui/material';

import ClientItem from './ClientItem/ClientItem';
import { useEffect, useState } from 'react';
import { IClient } from '../../constants/commonInterfaces';
import { getClients } from '../../utils/api';

const ClientList = () => {
  const [clients, setClients] = useState<IClient[]>([]);

  useEffect(() => {
    getClients().then((data) => {
      console.log(data.data);
      setClients(data.data);
    });
  }, []);
  const clientsArray = clients.map((client) => (
    <ClientItem
      //@ts-ignore
      key={client.client_id}
      //@ts-ignore
      clientId={client.client_id}
      firstname={client.firstname}
      lastname={client.lastname}
    />
  ));
  return <Container>{clientsArray}</Container>;
};

export default ClientList;
