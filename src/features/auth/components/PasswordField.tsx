import { JSX } from 'react';

interface PasswordFieldProps {
  id: string;
  value: string;
  showPassword: boolean;
  onChange: (value: string) => void;
  onToggleShow: () => void;
}

export const PasswordField = ({
  id,
  value,
  showPassword,
  onChange,
  onToggleShow,
}: PasswordFieldProps): JSX.Element => (
  <>
    <div className="ml-[9.24%] mr-[9.24%] flex-1 max-h-5 relative mt-[67.7px]">
      <div className="absolute w-[14.50%] top-[calc(50.00%_-_7px)] left-0 [font-family:'Inter-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[normal]">
        <label htmlFor={id}>비밀번호</label>
      </div>
      <button
        type="button"
        className="absolute w-[21.19%] top-[calc(50.00%_-_7px)] left-[79.03%] [font-family:'Inter-Medium',Helvetica] font-medium text-[#828282] text-[13px] tracking-[0] leading-[normal] text-left"
      >
        비밀번호 찾기
      </button>
    </div>
    <div className="absolute w-[18.68%] top-[540px] left-[40.66%] h-[41px]">
      <div className="w-full top-0 left-0 absolute h-[41px] flex bg-white rounded-lg overflow-hidden border-[0.67px] border-solid border-[#dfdfdf] shadow-[0px_1px_2px_#0000000d]">
        <input
          id={id}
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          aria-label="비밀번호"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex items-center mt-[11.7px] w-[297.33px] h-[18px] ml-[16.7px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#757575] text-[15px] tracking-[0] leading-[normal] placeholder:text-[#757575]"
          placeholder="••••••••"
        />
      </div>
      <button
        type="button"
        aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
        aria-pressed={showPassword}
        onClick={onToggleShow}
        className="absolute top-3 left-[calc(50.00%_+_145px)] w-[18px] h-[18px] flex items-center justify-center text-[#9e9e9e]"
      >
        {showPassword ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="1"
              x2="23"
              y2="23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </button>
    </div>
  </>
);
