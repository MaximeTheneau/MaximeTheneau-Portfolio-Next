import PropTypes from 'prop-types';
import SvgCategory from '../svgCategory';

export default function Sticky({ headerClass, headerElement, transitionEffect }) {
  return (
    <SvgCategory
      headerElement={headerElement}
      headerClass={headerClass}
      transitionEffect={transitionEffect}
    />
  );
}

Sticky.propTypes = {
  headerClass: PropTypes.string.isRequired,
  headerElement: PropTypes.string.isRequired,
  transitionEffect: PropTypes.bool.isRequired,
};
