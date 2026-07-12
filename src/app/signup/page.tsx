import SignUpForm from '@/src/components/signup';

export const metadata = {
  title: 'Sign Up',
  robots: {
    index: false,
    follow: false,
  },
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
