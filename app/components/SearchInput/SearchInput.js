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
        const { isFetching, emptyState, hasResults } = this.props;

        if(isFetching ){
            return <div className="search-loader"> Loading... </div>
        }
        else if(this.props.value.length || hasResults){
            return <Icon name="REMOVE" onClick={this.props.clearResults} className={classNames({ 'no-results': emptyState })}/>
        }
        else{
            return <Icon name="SEARCH" />
        }
    }


    render = () => {

        const icon = this.getIcon();
        const { className,  emptyState, size, placeholder } = this.props;

        return(
            <div className={classNames('search-input-wrapper', className, `size-${size}`)}>
               <input onChange={this.onChange}
                      placeholder={placeholder || "חיפוש מם"}
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

