
import React from "react";
import { CheckIcon } from "lucide-react";

export const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex w-full items-center max-md:max-w-full">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3702f3fe108e4ad09494698d400b63e7/8577d7c7a6483524e7833dd46995047e0a05a887?placeholderIfAbsent=true"
              className="aspect-[76.92] object-contain w-[76px] stroke-[1px] stroke-black self-stretch shrink flex-1 basis-[0%] my-auto"
              alt="Step connector"
            />
          )}
          {index + 1 < currentStep ? (
            <div
              className="justify-center items-center bg-black self-stretch flex min-h-8 flex-col overflow-hidden w-8 h-8 my-auto rounded-[72px]"
              aria-label={`Step ${index + 1} completed`}
            >
              <CheckIcon className="w-6 h-6 text-white" />
            </div>
          ) : index + 1 === currentStep ? (
            <div
              className="bg-black self-stretch min-h-8 overflow-hidden text-base text-white font-normal whitespace-nowrap w-8 h-8 my-auto rounded-[72px] flex items-center justify-center"
              aria-label={`Step ${index + 1} current`}
            >
              {index + 1}
            </div>
          ) : (
            <div
              className="self-stretch min-h-8 overflow-hidden text-base text-black font-normal whitespace-nowrap w-8 h-8 my-auto rounded-[72px] flex items-center justify-center"
              aria-label={`Step ${index + 1} pending`}
            >
              {index + 1}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
