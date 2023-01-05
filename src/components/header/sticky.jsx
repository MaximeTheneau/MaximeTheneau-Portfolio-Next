import SvgCategory from '../svgCategory';

export default function Sticky({ headerClass, headerElement, transitionEffect }) {
  return (
    <SvgCategory headerElement={headerElement} headerClass={headerClass} transitionEffect={transitionEffect} />
  );
}
