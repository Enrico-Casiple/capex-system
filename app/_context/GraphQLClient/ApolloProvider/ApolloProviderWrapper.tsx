'use client';

import { ApolloProvider } from '@apollo/client/react';
import { client } from '../client';
type ApolloProviderWrapperProps = {
  children: React.ReactNode;
};

const ApolloProviderWrapper: React.FC<ApolloProviderWrapperProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
