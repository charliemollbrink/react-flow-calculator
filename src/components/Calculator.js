//@flow
import React, { Component } from 'react';
import Button from './Button';

type State = {
    values: string,
    operators: string[],
    input: string[],
};

class Calculator extends Component<{}, State> {
    state = {
        values: '',
        operators: ['/', '-', '+', 'x', '%'],
        input: [],
    }

    renderOpButton(value: string, name: string = value) {
        return <Button
            key={value}
            value={name}
            onClick={() => this.onOpClick(value)}/>
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
            this.state.input.map((val) => {
                const a = (val === '/')?'\u00F7':val; return a
            }):'';

        return (
            <div className='calculator'>
                <div className='display'>
                    {displayString}
                </div>
                <div>
                    {this.renderFuncButton('clear', this.clear.bind(this))}
                    {this.renderOpButton('/','\u00F7')}
                    {this.renderOpButton('-')}
                    {this.renderFuncButton('back', this.goBack.bind(this))}
                </div>
                <div>
                    {this.renderNumberButton('7')}
                    {this.renderNumberButton('8')}
                    {this.renderNumberButton('9')}
                    {this.renderOpButton('+')}
                </div>
                <div>
                    {this.renderNumberButton('4')}
                    {this.renderNumberButton('5')}
                    {this.renderNumberButton('6')}
                    {this.renderOpButton('x')}
                </div>
                <div>
                    {this.renderNumberButton('1')}
                    {this.renderNumberButton('2')}
                    {this.renderNumberButton('3')}
                    {this.renderNumberButton('.')}
                </div>
                <div>
                    {this.renderNumberButton('0')}
                    {this.renderNumberButton('.')}
                    {this.renderFuncButton('=', this.sum.bind(this))}
                </div>
            </div>
        );
    }

    onOpClick(operator: string) {
        const input = this.state.input.slice(),
            prevOperator = input[input.length -1];
        if (prevOperator === operator){
            return;
        } else if (this.state.operators.indexOf(prevOperator) > -1) {
            input.splice(-1, 1);
            this.setState({
                input: [...input, operator]
            });
        } else {
            this.setState({
                input: [...input, operator]
            });
        }
    }

    onNumberClick(num: string) {
        const input = this.state.input.slice();
        if (input[input.length -1] !== undefined &&
            this.state.operators.indexOf(input[input.length -1]) === -1)
        {
            num = input.splice(-1, 1) + num;
        }
        this.setState({
            input: [...input, num]
        });
    }

    clear() {
        this.setState({input: []});
    }

    goBack() {
        const input = this.state.input.slice();
        input.splice(-1, 1);
        this.setState({input: [...input]});
    }

    sum() {
        const input = this.parseInput(this.state.input.slice());
        this.setState({ input: [input] });
    }

    parseInput(input: string|number[], firstRound: Boolean = true): string|number[]{
        let a = '/', b = 'x', newInput = [], newVal;
        if (input.indexOf(a) === -1 && input.indexOf(b) === -1) firstRound = false;
        if(!firstRound){
            a = '+';
            b = '-';
        }
        input.forEach((val, i ) => {
            const prev = (input[i-1] !== undefined) ? input[i-1] : false;
            const next = (input[i+1] !== undefined) ? input[i+1] : false;
            if(prev === a || prev === b) {
                switch (prev) {
                    case '/':
                        newVal = parseFloat(input[i - 2]) / parseFloat(val);
                        newInput.push(newVal);
                        input[i] = newVal;
                        break;
                    case 'x':
                        newVal = parseFloat(input[i - 2]) * parseFloat(val);
                        newInput.push(newVal);
                        input[i] = newVal;
                        break;
                    case '-':
                        newVal = parseFloat(input[i - 2]) - parseFloat(val);
                        newInput.push(newVal);
                        input[i] = newVal;
                        break;
                    case '+':
                        newVal = parseFloat(input[i - 2]) + parseFloat(val);
                        newInput.push(newVal);
                        input[i] = newVal;
                        break;
                    default:
                        break;
                }
            }else if (next !== a && val !== a && next !== b && val !== b) {
                newInput.push(val);
            }
        });
        return (firstRound) ? this.parseInput(newInput, false) : newInput;
    }
}

export default Calculator;