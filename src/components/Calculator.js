//@flow
import React, { Component } from 'react';
import Button from './Button';

class Calculator extends Component {

    constructor(props){
        super(props);
        this.state = {
            values: '',
        }
    }

    renderButton(value: string|number, name = value) {
        return <Button
            key={value}
            value={name}
            onClick={() => this.onClick(value)}/>
    }

    renderFuncButton(value: string, fn: Function) {
        return <Button
            key={value}
            value={value}
            onClick={() => fn()}/>
    }

    render() {
        const displayString = this.state.values.split('').map((val) => {
            const a = (val === '/')?'\u00F7':val; return a;
        });

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
                    {this.renderButton(7)}
                    {this.renderButton(8)}
                    {this.renderButton(9)}
                    {this.renderButton('+')}
                </div>
                <div>
                    {this.renderButton(4)}
                    {this.renderButton(5)}
                    {this.renderButton(6)}
                    {this.renderButton('x')}
                </div>
                <div>
                    {this.renderButton(1)}
                    {this.renderButton(2)}
                    {this.renderButton(3)}
                    {this.renderFuncButton('%', this.sum.bind(this))}
                </div>
                <div>
                    {this.renderButton('0')}
                    {this.renderButton('.')}
                    {this.renderFuncButton('=', this.sum.bind(this))}
                </div>
            </div>
        );
    }

    onClick(i) {
        if (isNaN(this.state.values[this.state.values.length -1]) && isNaN(i)) return;
        this.setState({values: this.state.values.concat(i)});
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