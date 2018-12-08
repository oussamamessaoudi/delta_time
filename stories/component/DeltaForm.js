import React from 'react';
import { storiesOf } from '@storybook/react';
import DeltaForm from '../../src/component/DeltaForm';

storiesOf('DeltaForm', module)
    .add('Simple', () => <DeltaForm />)
    .add('Complete', () => <DeltaForm onValid={e =>e}
                                      numberOfDays={10}
                                      from={{isValid:false ,label: "From :", value:"10", id:"5"}}
                                      to={{isValid:true ,label: "To :", value:"5", id:"4"}}/>)
;