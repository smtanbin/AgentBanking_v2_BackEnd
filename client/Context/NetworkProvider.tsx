









// import React, { createContext, useContext } from "react";
// import { NetworkRequest } from "./NetworkProvider/NetworkRequest";

// interface NetworkRequestOptions {
//   type: string | undefined;
//   path: string;
//   data?: any;
// }

// const NetworkContext = createContext<(options: NetworkRequestOptions) => Promise<any>>(() => {
//   throw new Error('NetworkContext not implemented');
// });


// export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


//   const api = async (options: NetworkRequestOptions): Promise<any> => {
//     return await NetworkRequest(options.type, options.path, options.data);
//   };

//   return (
//     <NetworkContext.Provider value={api}>
//       {children}
//     </NetworkContext.Provider>
//   );
// };

// export const useApi = () => {
//   return useContext(NetworkContext);
// };

