import React from 'react'

import SelectionCriteriaForm from '../pages/SelectionCriteriaForm';
import CreateIntership from '../pages/CreateIntership';

const IntershipForm = () => {
  return (
    <div className='space-y-8'>
        <CreateIntership/>
        <SelectionCriteriaForm/>
    </div>
  )
}

export default IntershipForm ;