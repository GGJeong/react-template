import { JSX } from 'react';

export const LoginHeader = (): JSX.Element => (
  <header className="ml-[9.24%] mr-[9.24%] flex-1 max-h-[109.4px] mt-[40.7px] flex flex-col">
    <div className="flex-1 max-h-10 flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Brand mark">
        <rect width="32" height="32" rx="8" fill="#111" />
        <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="white" />
        <path d="M16 8L24 16L16 24" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    </div>
    <h1
      id="login-title"
      className="ml-[32.3%] mr-[32.3%] flex-1 max-h-[27px] mt-[15.3px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[22px] tracking-[0] leading-[26.4px] whitespace-nowrap"
    >
      다시 오셨군요
    </h1>
    <p className="ml-[33.29%] mr-[33.25%] flex-1 max-h-[21px] mt-[5.9px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#828282] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
      계정에 로그인하세요
    </p>
  </header>
);
