import { JSX, useId, useState } from 'react';
import { LoginHeader } from '../components/LoginHeader';
import { EmailField } from '../components/EmailField';
import { PasswordField } from '../components/PasswordField';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { SignUpLink } from '../components/SignUpLink';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps): JSX.Element => {
  const emailId = useId();
  const passwordId = useId();
  const [email, setEmail] = useState('name@example.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onLoginSuccess?.();
  };

  return (
    <main className="bg-[#f7f7f7] w-full min-w-[1920px] min-h-[1080px] relative">
      <section
        aria-labelledby="login-title"
        className="absolute top-[calc(50.00%_-_296px)] left-[calc(50.00%_-_220px)] w-[440px] h-[591px] bg-white rounded-xl border-[0.67px] border-solid border-[#dfdfdf] shadow-[0px_1px_3px_#00000014] flex flex-col"
      >
        <LoginHeader />
        <form onSubmit={handleSubmit} className="contents" aria-label="로그인 폼">
          <EmailField id={emailId} value={email} onChange={setEmail} />
          <PasswordField
            id={passwordId}
            value={password}
            showPassword={showPassword}
            onChange={setPassword}
            onToggleShow={() => setShowPassword((prev) => !prev)}
          />
          <button
            type="submit"
            className="max-h-[47.33px] mt-[59.3px] flex bg-black shadow-[0px_1px_2px_#0000001a] ml-[9.24%] mr-[9.24%] flex-1 rounded-lg"
          >
            <span className="mt-[15.7px] w-[42px] h-[18px] ml-[44.23%] mr-[44.06%] flex-1 [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
              로그인
            </span>
          </button>
          <div
            className="ml-[9.24%] mr-[9.24%] flex-1 max-h-[19.33px] relative mt-[24.0px]"
            aria-hidden="true"
          >
            <div className="absolute w-[43.32%] top-[9px] left-0 h-px bg-[#e6e6e6]" />
            <div className="absolute w-[6.69%] top-[3px] left-[46.67%] [font-family:'Inter-Regular',Helvetica] font-normal text-[#bdbdbd] text-[13px] tracking-[0] leading-[normal]">
              또는
            </div>
            <div className="absolute w-[43.32%] top-[9px] left-[56.68%] h-px bg-[#e6e6e6]" />
          </div>
          <SocialLoginButton label="Google로 계속하기" />
          <SignUpLink />
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
