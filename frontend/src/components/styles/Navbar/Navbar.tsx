import React from "react";

interface Props {
  className: any;
}

export const Navbar = ({ className }: Props): JSX.Element => {
  return (
    <div className={`relative w-px h-px ${className}`}>
      <div className="absolute w-[200px] h-[62px] -top-px left-[199px] bg-[#d9d9d9] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]">
        <div className="absolute w-[187px] h-[42px] top-[9px] left-1.5 bg-white border border-solid border-black shadow-[0px_4px_4px_#00000040]" />
        <div className="absolute w-[187px] top-2 left-1.5 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-[32px] text-center tracking-[0] leading-[normal]">
          NewRX
        </div>
      </div>
      <div className="absolute w-[200px] h-[63px] -top-px left-[399px] bg-[#d9d9d9] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]">
        <div className="absolute w-[187px] h-[42px] top-[9px] left-1 bg-white border border-solid border-black shadow-[0px_4px_4px_#00000040]" />
        <div className="absolute w-[187px] top-2 left-1.5 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-[32px] text-center tracking-[0] leading-[normal]">
          Patients
        </div>
      </div>
      <div className="absolute w-[200px] h-[63px] -top-px left-[599px] bg-[#d9d9d9] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]">
        <div className="absolute w-[187px] h-[42px] top-[9px] left-1 bg-white border border-solid border-black shadow-[0px_4px_4px_#00000040]" />
        <div className="absolute w-[187px] top-2 left-1.5 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-[32px] text-center tracking-[0] leading-[normal]">
          Doctors
        </div>
      </div>
      <div className="absolute w-[200px] h-[62px] -top-px -left-px bg-[#d9d9d9] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]">
        <div className="absolute w-[187px] h-[42px] top-[9px] left-1.5 bg-white border border-solid border-black shadow-[0px_4px_4px_#00000040]" />
        <div className="absolute w-[187px] top-2 left-2 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-[32px] text-center tracking-[0] leading-[normal]">
          Home
        </div>
      </div>
    </div>
  );
};
