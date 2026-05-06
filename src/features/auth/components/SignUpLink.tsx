import { JSX } from 'react';

export const SignUpLink = (): JSX.Element => (
  <div className="ml-[9.24%] mr-[9.24%] flex-1 max-h-5 relative mt-[24.0px]">
    <p className="absolute w-[32.06%] top-[3px] left-[26.36%] [font-family:'Inter-Regular',Helvetica] font-normal text-[#828282] text-sm tracking-[0] leading-[normal]">
      계정이 없으신가요?
    </p>
    <button
      type="button"
      className="absolute top-[3px] left-[calc(50.00%_+_33px)] [font-family:'Inter-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[normal]"
    >
      회원가입
    </button>
  </div>
);
