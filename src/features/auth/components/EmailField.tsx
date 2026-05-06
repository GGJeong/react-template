import { JSX } from 'react';

interface EmailFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const EmailField = ({ id, value, onChange }: EmailFieldProps): JSX.Element => (
  <>
    <div className="ml-[9.24%] mr-[81.89%] flex-1 max-h-[17px] mt-[34.7px] [font-family:'Inter-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[normal]">
      <label htmlFor={id}>이메일</label>
    </div>
    <div className="w-[18.68%] top-[452px] left-[40.66%] absolute h-[41px] flex bg-white rounded-lg overflow-hidden border-[0.67px] border-solid border-[#dfdfdf] shadow-[0px_1px_2px_#0000000d]">
      <input
        id={id}
        name="email"
        type="email"
        autoComplete="email"
        aria-label="이메일"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex items-center mt-[11.7px] w-[325.33px] h-[18px] ml-[16.7px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#757575] text-[15px] tracking-[0] leading-[normal] placeholder:text-[#757575]"
        placeholder="name@example.com"
      />
    </div>
  </>
);
