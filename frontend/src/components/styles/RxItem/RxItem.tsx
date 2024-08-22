import React from "react";

interface Props {
  className: any;
}

export const RxItem = ({ className }: Props): JSX.Element => {
  return (
    <div className={`relative w-px h-px ${className}`}>
      <div className="absolute w-[597px] h-[672px] top-[-102px] left-[-199px]">
        <img className="absolute w-px h-[388px] top-0 left-0 object-cover" alt="Line" />
        <div className="absolute w-[396px] h-[388px] top-[284px] left-[200px] bg-[#dddddd]" />
        <div className="absolute w-[396px] h-[181px] top-[102px] left-[199px] bg-[#3a6a8b]" />
        <img className="absolute w-px h-[388px] top-0 left-0 object-cover" alt="Line" />
        <div className="absolute w-[396px] top-[102px] left-[199px] [font-family:'Inria_Serif-Bold',Helvetica] font-bold text-[#f0f0f0] text-[64px] text-center tracking-[0] leading-[normal]">
          RxItem Profile
        </div>
        <img className="absolute w-[396px] h-px top-[388px] left-0 object-cover" alt="Line" />
        <div className="absolute w-[259px] h-[38px] top-[534px] left-[338px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
        <div className="absolute w-[259px] h-[38px] top-[422px] left-[338px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
        <div className="absolute w-[259px] h-[38px] top-[386px] left-[338px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
        <div className="absolute w-[259px] h-[38px] top-[460px] left-[338px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
        <div className="absolute w-[259px] h-[38px] top-[496px] left-[338px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
        <div className="absolute w-[254px] h-[34px] top-[386px] left-[211px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
          Name:
        </div>
        <div className="absolute w-[254px] h-[34px] top-[422px] left-[211px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
          Strength:
        </div>
        <div className="absolute w-[254px] h-[34px] top-[460px] left-[211px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
          NDC:
        </div>
        <div className="absolute w-[254px] h-[34px] top-[496px] left-[211px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
          Expiration:
        </div>
        <div className="absolute w-[254px] h-[34px] top-[534px] left-[211px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
          Lot Number:
        </div>
        <img className="absolute w-px h-[388px] top-0 left-[397px] object-cover" alt="Line" />
      </div>
      <img className="absolute w-[396px] h-px top-[-104px] left-[-198px] object-cover" alt="Line" />
    </div>
  );
};
