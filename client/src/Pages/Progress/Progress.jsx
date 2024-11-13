import React from 'react'
import ProgressChart from '../../Components/progress/ProgressChart'
import Charts from '../../Components/charts/Charts'
import Roundchart from '../../Components/charts/Roundchart'

const Progress = () => {
  return (
  <>
  <div className='container mt-4'>
     <div className='row text-center'>
      <h1 style={{color:'white'}}>Progress Report</h1>
     </div>
  <div className='row text-center mt-4'>
     <div className='col-md-6'>
<Charts/>
     </div>
     <div className='col-md-6'>
<Roundchart/>
     </div>
    </div>
    <div className='row'>
     <div className='col-md-8'>
     <ProgressChart/>
     </div>
    </div>
  </div>
  </>
  )
}

export default Progress