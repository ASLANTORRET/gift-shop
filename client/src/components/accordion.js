import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import PlusIcon from 'react-icons/lib/fa/plus'
import MinusIcon from 'react-icons/lib/fa/minus'

class Accordion extends Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = { collapse: false };
    }
   
  
    toggle() {
      this.setState({ collapse: !this.state.collapse });
    }
  
    render() {
      const {title, content} = this.props  
      return (
        <div className="accordion">
          <div onClick={this.toggle} className="accordion-title">{ title }
          <span className="pull-right">{!this.state.collapse ? <PlusIcon/> : <MinusIcon/>}</span>
          </div>
          <Collapse isOpen={this.state.collapse}>
            {content}
          </Collapse>
        </div>
      );
    }
  }

  export default Accordion