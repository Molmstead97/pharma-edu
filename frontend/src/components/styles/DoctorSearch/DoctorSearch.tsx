import React from "react";

interface Props {
  className: any;
}

export const DoctorSearch = ({ className }: Props): JSX.Element => {
  return (
    <div className={`w-px h-px ${className}`}>
      <div className="relative w-[1192px] h-[449px] top-[-150px] left-[-400px]">
        <img className="absolute w-[396px] h-[181px] top-0 left-[400px]" alt="Rectangle" />
        <div className="absolute w-[396px] h-[181px] top-[150px] left-[400px] bg-[#3a6a8b]" />
        <div className="absolute w-[315px] h-[91px] top-[189px] left-[434px] [font-family:'Inria_Serif-Bold',Helvetica] font-bold text-[#f0f0f0] text-[64px] text-center tracking-[0] leading-[normal]">
          New Dr.
        </div>
        <img className="absolute w-[378px] h-[178px] top-1.5 left-[409px]" alt="Logo" />
        <div className="absolute w-[792px] h-[118px] top-[331px] left-[400px] bg-[#dddddd]" />
        <div className="absolute w-[279px] h-[35px] top-[331px] left-[400px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
        <div className="absolute w-[273px] h-[35px] top-[330px] left-[406px] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
          Search...
        </div>
        <div className="absolute w-[141px] h-[35px] top-[414px] left-[1051px] bg-[#ffffffcc] border border-solid border-black shadow-[inset_0px_4px_4px_#00000040]" />
        <div className="absolute w-[141px] h-[35px] top-[413px] left-[1051px] [font-family:'Inria_Serif-Regular',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[normal]">
          Add New Dr.
        </div>
        <img className="absolute w-px h-[299px] top-0 left-[796px] object-cover" alt="Line" />
        <img className="absolute w-px h-[299px] top-0 left-1 object-cover" alt="Line" />
        <img className="absolute w-[792px] h-px top-[180px] left-1 object-cover" alt="Line" />
        <img className="absolute w-[800px] h-[9px] top-[296px] left-0 object-cover" alt="Line" />
      </div>
    </div>
  );
};
