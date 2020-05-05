import React from 'react';

export default React.createContext({
  url:null,
  token:null,
  userId:null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {}
});