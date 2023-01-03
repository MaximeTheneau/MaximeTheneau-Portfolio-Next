import SvgCategory from '../svgCategory';
import useAnimationSvg from '../../lib/useAnimationSvg';

export default function Sticky({ headerClass, headerElement, transitionEffect }) {
  return (
    <SvgCategory headerElement={headerElement} headerClass={headerClass} transitionEffect={transitionEffect} />
  );
}
