import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

// This is a placeholder for the NextAuth configuration
// In a real application, you would connect this to your database
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // This is where you would verify the user credentials against your database
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For demonstration purposes only - replace with actual authentication
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          return {
            id: '1',
            name: 'Demo User',
            email: 'user@example.com',
          };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };