//@flow
import React, { Component } from 'react';
import Button from './Button';

type State = {
    values: string,
    operators: string[]
};

class Calculator extends Component<{}, State> {
    state = {
        values: '',
        operators: ['/', '-', '+', 'x', '%'],
    }

    renderButton(value: string, name: string = value) {
        return <Button
            key={value}
            value={name}
            onClick={() => this.onClick(value)}/>
    }
    renderNumberButton(value: string, name: string = value) {
        return <Button
            key={value}
            value={name}
            onClick={() => this.onNumberClick(value)}/>
    }

    renderFuncButton(value: string, fn: Function) {
        return <Button
            key={value}
            value={value}
            onClick={() => fn()}/>
    }

    render() {
        const displayString = (this.state !== undefined) ?
            this.state.values.split('').map((val) => {
                const a = (val === '/')?'\u00F7':val; return a
            }) : '';

        return (
            <div className='calculator'>
                <div className='display'>
                    {displayString}
                </div>
                <div>
                    {this.renderFuncButton('clear', this.clear.bind(this))}
                    {this.renderButton('/','\u00F7')}
                    {this.renderButton('-')}
                    {this.renderFuncButton('back', this.goBack.bind(this))}
                </div>
                <div>
                    {this.renderNumberButton('7')}
                    {this.renderNumberButton('8')}
                    {this.renderNumberButton('9')}
                    {this.renderButton('+')}
                </div>
                <div>
                    {this.renderNumberButton('4')}
                    {this.renderNumberButton('5')}
                    {this.renderNumberButton('6')}
                    {this.renderButton('x')}
                </div>
                <div>
                    {this.renderNumberButton('1')}
                    {this.renderNumberButton('2')}
                    {this.renderNumberButton('3')}
                    {this.renderFuncButton('%', this.sum.bind(this))}
                </div>
                <div>
                    {this.renderNumberButton('0')}
                    {this.renderNumberButton('.')}
                    {this.renderFuncButton('=', this.sum.bind(this))}
                </div>
            </div>
        );
    }

    onClick(i: string) {
        const prevI = this.state.values[this.state.values.length -1];
        if (prevI === i){
            return;
        } else if (this.state.operators.indexOf(prevI) > -1) {
            this.setState({ values: this.state.values.slice(0, -1).concat(i) });
        } else {
            this.setState({ values: this.state.values.concat(i) });
        }
    }

    onNumberClick(i: string) {
        this.setState({ values: this.state.values.concat(i) });
    }

    clear() {
        this.setState({values: ''});
    }

    goBack() {
       this.setState({values: this.state.values.slice(0, -1)});
    }

    sum() {
        /*todo*/
    }
}

export default Calculator;