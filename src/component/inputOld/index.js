import React, { Component } from 'react';
import "./input.css"

// const options = [
//   { value: "one", label: "One" },
//   { value: "two", label: "Two" }
// ];

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderOption = dataArr => {
        // const {state, name, submitStatus} = this.props
        return dataArr.map((data, index) => {
            if (index===0) return (
            <option 
                key={index} 
                value='' 
                hidden>
                {data}
            </option>
            )

            return (
            <option 
            key={index} 
            value={data}>
                {data}
                </option>
            )
        })
    }

    renderInput = () => {
        const {label, name, dataArr, focus, blur, typeTx, handleChange, accept, state, placeholder, fixValue} = this.props
       if(typeTx==="select") { 
           return ( 
            <div>
                <h5>{label}</h5>
                <select 
                    name={name.toLowerCase()} 
                    className="selectOpt" 
                    onChange={handleChange}
                    // value={value} 
                    required>
                    {this.renderOption(dataArr)}
                </select>
             </div>
           )
       }

       if(typeTx==="radio") return (
        <div >
            <h5>{label}</h5>
            <input 
                className="radioInput" 
                type={typeTx} 
                value="Male" 
                name={name.toLowerCase()} 
                onChange={handleChange}
                required/> Male 
            <input 
                className="radioInput" 
                type={typeTx} 
                value="Female" 
                name={name.toLowerCase()} 
                onChange={handleChange}/> Female 
        </div>
       )

       if(typeTx==="file") return (
        <div>
            <h5>{label}</h5>
            <input 
                id={`isFocus${name}`} 
                className="fileInput" 
                type={typeTx} 
                onFocus={focus} 
                onBlur={blur} 
                name={name.toLowerCase()} 
                onChange={handleChange} 
                accept={accept} 
                value={state[`${name.toLowerCase()}`]} required/>
        </div>
        )

    return (<div>
                <h5>{label}</h5>
                <input 
                    id={`isFocus${name}`} 
                    className="input" 
                    type={typeTx} 
                    onFocus={focus} 
                    onBlur={blur} 
                    name={name.toLowerCase()} 
                    onChange={handleChange} 
                    value={fixValue? fixValue : state[`${name.toLowerCase()}`]}
                    placeholder={state[`isFocus${name}`] ? placeholder : ''}
                    required/>
            </div>)
    }

    renderAlert = () => {
        const { state, name} = this.props
        if (state[`${name.toLowerCase()}`]==='' && state['submitStatus']) return <span className="textALert">*Must Be Filled</span>

        return ''
    }

    render() {
        const { state, icon, name } = this.props
        return (
            <>
            <div 
                className={`input-div ${ state[`isFocus${name}`] ? 'focus' : ''} ${ state[`${name.toLowerCase()}`]==='' && state['submitStatus'] ? 'redAlert' : ''}`}>
                <div className="i">
                    {icon}      
                </div>
                {this.renderInput()}
            </div>
            {this.renderAlert()}
            </>
        );
    }
}

export default Input;