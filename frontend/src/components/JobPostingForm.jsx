import React, { useState, useRef, useEffect } from 'react';
import CreateJob from '../pages/CreateJob';
import SelectionCriteriaForm from '../pages/SelectionCriteriaForm';

const JobPostingForm = () => {
   return(
      <div className='space-y-8'>
          <CreateJob/>
          <SelectionCriteriaForm/>
      </div>
   )
};

export default JobPostingForm;