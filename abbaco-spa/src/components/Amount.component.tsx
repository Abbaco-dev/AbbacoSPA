import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

class AmountComponent extends Component<{ amount: number, iconName: string, className: string }, {}> {
  render() {
    return (
        <>
            <FontAwesomeIcon className={this.props.className} icon={this.props.iconName as IconProp} />
            <span>{ this.props.amount }</span>
        </>
        
    )
}
}
export default AmountComponent;