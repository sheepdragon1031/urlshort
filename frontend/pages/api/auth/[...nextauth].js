import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import axios from "axios";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Providers.Credentials({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: "Email", type: "text", placeholder: "test@test.com" },
    //     password: {  label: "Password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //       try {
    //         // const data = { id: 1, name: 'J Smith', email: 'test@example.com', password: 'test'}
            
    //         const  user  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
    //           identifier: credentials.email,
    //           // password: credentials.password
    //         },{
    //           headers: {
    //             accept: '*/*',
    //             'Content-Type': 'application/json'
    //           }
    //         });
            
    //         // console.log(user);
    //         if (user) {
    //           return Promise.resolve(user);
    //         }
    //         else {
    //           return null;
    //         }
    //       } catch (e) {
    //         // console.log('caught error');
    //         // const errorMessage = e.response.data.message
    //         // Redirecting to the login page with error message          in the URL
    //         // throw new Error(errorMessage + '&email=' + credentials.email)
    //         return null;
    //       }
    //     }
    // })
  ],
  // database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
    
  },
  theme: 'light',
  callbacks: {
    session: async ( session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false;
      // account.provider ? account.provider : account.provider = 'Credentials'
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        );
        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
        if(account.provider == "google"){
          
        }
        else{
          
        }
      }
      return Promise.resolve(token);
    },
  },
};

const Auth = (req, res) =>
  NextAuth(req, res, options);

export default Auth;