import SignInForm from '@/src/components/signin';

export const metadata = {
  title: 'Sign In',
  robots: {
    index: false,
    follow: false,
  },
};

const SignIn = () => {
  return <SignInForm />;
};

export default SignIn;
