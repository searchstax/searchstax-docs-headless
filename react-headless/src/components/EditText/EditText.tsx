import React, { useState } from 'react'
import './EditText.css'

// MUI
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

// MUI Icons
import SaveAsIcon from '@mui/icons-material/SaveAs';

function EditText(props: { text?: string, fieldName?: string, update: void }) {
  const {
    text = '',
    fieldName = '',
    update
  } = props;
  const [fieldValue, setFieldValue] = useState<string>(text);

  return (
    <OutlinedInput
      error={text !== fieldValue}
      size="small"
      value={fieldValue}
      onChange={(e) => { setFieldValue(e.target.value); }}
      endAdornment={
        <InputAdornment position="end">
          {text !== fieldValue ? (
            <IconButton>
              <SaveAsIcon
                onClick={() => {
                  update(fieldName, fieldValue); 
                }}
              />
            </IconButton>
          ) : ''}
        </InputAdornment>
      }
      sx={{ width: 260 }}
    />
  )
}

export default EditText
