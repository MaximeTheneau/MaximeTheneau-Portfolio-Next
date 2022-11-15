import { element } from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import {FindScroll}  from "../components/header/FindScroll";

const useLinkAnchor = () => {
    const ref = useRef(null);
    useEffect(() => {

        function updatePosition( event) {
            console.log( FindScroll() );

          }
          document.addEventListener('scroll', updatePosition)
          updatePosition()
          return () => document.removeEventListener('scroll', updatePosition)
        }, []);
    return [ref];
}


export default useLinkAnchor;

