import {HTMLAttributes} from "@builder.io/qwik";


const ArrowIcon = (props: HTMLAttributes<any>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M5 12L19 12M19 12L12 5M19 12L12 19" stroke="white" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
    </svg>

);
export default ArrowIcon