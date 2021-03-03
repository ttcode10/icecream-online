import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button, Typography, Tooltip } from '@material-ui/core';

const OrderSummary: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const tooltipTitle = (
    <Typography variant="body2">No ice cream will actually be delivered</Typography>
  );

  const checkboxLabel = (
    <Typography variant="body1">
      I agree to
      <Tooltip title={tooltipTitle} placement="top">
        <span style={{ color: '#328DFF' }}> Terms and Conditions</span>
      </Tooltip>
    </Typography>
  );

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            name="consentCheckbox"
            color="primary"
            checked={checked}
            onChange={handleCheck}
          />
        }
        label={checkboxLabel}
      />
      <Button variant="contained" color="primary" disabled={!checked}>
        Confirm order
      </Button>
    </>
  );
};

export default OrderSummary;
