import React from 'react';

function Button(props: Object) {
    return (
        <button onClick={props.onClick}>{props.value}</button>
    )
}

export default Button;