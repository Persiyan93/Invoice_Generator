import React from 'react';

const ClientContext=React.createContext();


export const ClientProvider=ClientContext.Provider;
export const ClientConsumer=ClientContext.Consumer;



export default ClientContext