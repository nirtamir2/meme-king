import React, { Component } from 'react';
import classNames from 'classnames';

// components
import Icon from 'components/Icon/Icon';

class SearchInput extends Component {

    onChange = ({ target }) => {
        const { value } = target;
        const { onChange }  = this.props;
        onChange(value);
    };

    getIcon = () => {
        const { isFetching } = this.props;

        if(isFetching ){
            return <div className="search-loader"> Loading... </div>
        }
        else if(this.props.value.length){
            return <Icon name="REMOVE" onClick={this.props.clearResults}/>
        }
        else{
            return <Icon name="SEARCH" />
        }
    }


    render = () => {

        const icon = this.getIcon();
        const { className,  emptyState, size } = this.props;

        return(
            <div className={classNames('search-input-wrapper', className, `size-${size}`)}>
               <input onChange={this.onChange}
                      placeholder="חיפוש מם"
                      value={this.props.value}
                      className={classNames({'empty' : emptyState}, className)}
               />
              {icon}
           </div>
        )
    }
}


SearchInput.defaultProps = {
    size: 'md'
};

export default SearchInput;

