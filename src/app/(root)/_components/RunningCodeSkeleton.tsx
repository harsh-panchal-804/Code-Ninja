'use client';
import React from 'react';

const RunningCodeSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-[100%] w-[100%] overflow-hidden bg-gray-900">
      <div className="hourglassBackground">
        <div className="hourglassContainer">
          <div className="hourglassCurves"></div>
          <div className="hourglassCapTop"></div>
          <div className="hourglassGlassTop"></div>
          <div className="hourglassSand"></div>
          <div className="hourglassSandStream"></div>
          <div className="hourglassCapBottom"></div>
          <div className="hourglassGlass"></div>
        </div>
      </div>
    </div>
  );
};

export default RunningCodeSkeleton;
