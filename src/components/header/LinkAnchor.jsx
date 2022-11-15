import useLinkAnchor from '../../hooks/useLinkAnchor';
import { FindScroll }  from './FindScroll';

export const LinkAnchor = ({children }) => {
    const ref = useLinkAnchor();
    const rect = FindScroll(ref, 'test');
    return (
        <div ref={ref} >
            {children}
        </div>
    );
};