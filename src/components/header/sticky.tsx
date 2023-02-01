import * as React from 'react';
import PropTypes from 'prop-types';
import SvgCategory from '../svgCategory';

type Props = {
  headerClass: string;
  headerElement: string;
  transitionEffect: boolean;
};

const Sticky = ({ headerClass, headerElement, transitionEffect }: Props) => {
  return (
    <SvgCategory
      headerElement={headerElement}
      headerClass={headerClass}
      transitionEffect={transitionEffect}
    />
  );
}

export default Sticky;

Sticky.propTypes = {
  headerClass: PropTypes.string.isRequired,
  headerElement: PropTypes.string.isRequired,
  transitionEffect: PropTypes.bool.isRequired,
};
