
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel';

export function RadioSelecter({lr, setLr}) {
  return (
    <RadioGroup value={lr} onChange={e=>{setLr(e.target.value)}} row>
      <FormControlLabel value={1E-1} control={<Radio size='small'/>} label="1E-1"/>
      <FormControlLabel value={1E-2} control={<Radio size='small'/>} label="1E-2"/>
      <FormControlLabel value={1E-3} control={<Radio size='small'/>} label="1E-3"/>
      <FormControlLabel value={1E-4} control={<Radio size='small'/>} label="1E-4"/>
      <FormControlLabel value={1E-5} control={<Radio size='small'/>} label="1E-5"/>
      <FormControlLabel value={1E-6} control={<Radio size='small'/>} label="1E-6"/>
    </RadioGroup>
  )
}