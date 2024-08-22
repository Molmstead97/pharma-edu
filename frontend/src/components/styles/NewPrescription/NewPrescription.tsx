import React from "react";

interface Props {
  className: any;
}

export const NewPrescription = ({ className }: Props): JSX.Element => {
  return (
    <div className={`relative w-px h-px ${className}`}>
      <div className="absolute w-[594px] h-[672px] top-[-104px] left-[-198px]">
        <div className="absolute w-[396px] h-[388px] top-[284px] left-[198px] bg-[#dddddd]" />
        <div className="absolute w-[396px] h-[181px] top-[104px] left-[198px] bg-[#3a6a8b]" />
        <div className="absolute w-[185px] h-[38px] top-[460px] left-[409px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
        <img className="absolute w-[185px] h-[38px] top-[136px] left-[211px]" alt="Rectangle" />
        <div className="absolute w-[259px] h-[38px] top-[498px] left-[335px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
        <div className="absolute w-[254px] h-[38px] top-[420px] left-[209px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
          Quantity Written:
        </div>
        <div className="absolute w-[254px] h-[38px] top-[496px] left-[209px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
          Refills:
        </div>
        <div className="absolute w-[254px] h-[38px] top-[458px] left-[209px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
          Quantity Dispensed:
        </div>
        <img className="absolute w-px h-[388px] top-0 left-0 object-cover" alt="Line" />
        <img className="absolute w-px h-[388px] top-0 left-[396px] object-cover" alt="Line" />
        <div className="absolute w-[396px] top-[104px] left-[198px] [font-family:'Inria_Serif-Bold',Helvetica] font-bold text-[#f0f0f0] text-[64px] text-center tracking-[0] leading-[normal]">
          New Prescription
        </div>
        <img className="absolute w-[396px] h-px top-[388px] left-0 object-cover" alt="Line" />
        <img className="absolute w-px h-[388px] top-px left-0 object-cover" alt="Line" />
      </div>
      <img className="absolute w-[396px] h-px top-[-105px] left-[-198px] object-cover" alt="Line" />
    </div>
  );
};
