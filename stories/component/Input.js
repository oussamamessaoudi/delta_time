import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '../../src/component/Input';

storiesOf('Input', module)
    .add('Simple', () => <Input />)
    .add('Simple With label', () => <Input label={"Name :"}/>)
    .add('With Value', () => (<Input value={"Hello"}/>))
    .add('With Error Msg' , () => <Input isValid={false}/>)
    .add("Complete" , () => <Input isValid={false} label={"Hello :"} value={"10"} id={"5"} onChange={ e => e }/>)
;