import React from "react";

interface Props {
  className: any;
}

export const NewRxPage = ({ className }: Props): JSX.Element => {
  return (
    <div className={`w-px h-px ${className}`}>
      <div className="relative w-[1188px] h-[674px] top-[-104px] left-[-396px]">
        <img className="absolute w-px h-[388px] top-0 left-[792px] object-cover" alt="Line" />
        <img className="absolute w-[792px] h-px top-[388px] left-0 object-cover" alt="Line" />
        <div className="absolute w-[792px] h-[570px] top-[104px] left-[396px]">
          <div className="relative h-[570px]">
            <div className="absolute w-[792px] h-[570px] top-0 left-0">
              <div className="absolute w-[396px] h-[388px] top-[181px] left-0 bg-[#dddddd]" />
              <img className="absolute w-[396px] h-[181px] top-px left-[396px]" alt="Rectangle" />
              <div className="absolute w-[396px] h-[181px] top-0 left-0 bg-[#3a6a8b]" />
              <div className="absolute w-[141px] h-[35px] top-[498px] left-[121px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
              <div className="absolute w-[259px] h-[38px] top-[429px] left-[137px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
              <div className="absolute w-[259px] h-[38px] top-[391px] left-[137px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
              <img className="absolute w-[259px] h-[38px] top-[353px] left-[137px]" alt="Rectangle" />
              <div className="absolute w-[259px] h-[38px] top-[315px] left-[137px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
              <div className="absolute w-[259px] h-[38px] top-[244px] left-[137px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
              <div className="absolute w-[259px] h-[38px] top-52 left-[137px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
              <div className="absolute w-[259px] h-[38px] top-[207px] left-2 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                Patient:
              </div>
              <div className="absolute w-[254px] h-[38px] top-[246px] left-2.5 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                Doctor:
              </div>
              <div className="absolute w-[254px] h-[38px] top-[314px] left-2 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                Date of Rx:
              </div>
              <div className="absolute w-[254px] h-[38px] top-[352px] left-2.5 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                Medication:
              </div>
              <div className="absolute w-[254px] h-[38px] top-[390px] left-2.5 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                Sig-Code:
              </div>
              <div className="absolute w-[254px] h-[38px] top-[428px] left-2.5 [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                Tech Initials
              </div>
              <div className="absolute w-[141px] h-[35px] top-[497px] left-[121px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[normal]">
                Cont. to Lbl
              </div>
              <img className="absolute w-px h-[388px] top-[182px] left-0 object-cover" alt="Line" />
              <img className="absolute w-[792px] h-px top-[180px] left-0 object-cover" alt="Line" />
              <div className="absolute w-[315px] h-[91px] top-[88px] left-[34px] [font-family:'Inria_Serif-Bold',Helvetica] font-bold text-[#f0f0f0] text-[64px] text-center tracking-[0] leading-[normal]">
                NewRx
              </div>
              <img className="absolute w-[236px] h-[115px] top-[75px] left-[476px]" alt="Logo" />
            </div>
            <img className="absolute w-px h-[388px] top-[182px] left-[396px] object-cover" alt="Line" />
            <div className="absolute w-[281px] h-[254px] top-[247px] left-[447px] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-4xl text-center tracking-[0] leading-[normal]">
              Scan Label
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
