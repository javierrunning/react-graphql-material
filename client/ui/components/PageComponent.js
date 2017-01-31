import React from 'react';
import styles from '../styles/components/PageComponent.scss';

export default class PageComponent extends React.Component {
  render() {
    const { children, heading } = this.props;
    return (
      <div>
        <h1 className={styles.heading}>
          {heading && heading}
        </h1>
        <hr />
        {children && children}
      </div>
    );
  }
}
