import React from "react";

interface IconProps {
  handleOpen: (link: string) => void;
}

const WebBrowserIcon: React.FC = (props) => (
  <svg
    width="50px"
    height="50px"
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g
      id="Icon-Set-Filled"
      transform="translate(-258.000000, -673.000000)"
      fill="#0ea5e9"
    >
      <path
        d="M258,701 C258,703.209 259.791,705 262,705 L286,705 C288.209,705 290,703.209 290,701 L290,683 L258,683 L258,701 L258,701 Z M271,679 C270.448,679 270,678.553 270,678 C270,677.448 270.448,677 271,677 C271.552,677 272,677.448 272,678 C272,678.553 271.552,679 271,679 L271,679 Z M267,679 C266.448,679 266,678.553 266,678 C266,677.448 266.448,677 267,677 C267.552,677 268,677.448 268,678 C268,678.553 267.552,679 267,679 L267,679 Z M263,679 C262.448,679 262,678.553 262,678 C262,677.448 262.448,677 263,677 C263.552,677 264,677.448 264,678 C264,678.553 263.552,679 263,679 L263,679 Z M286,673 L262,673 C259.791,673 258,674.791 258,677 L258,681 L290,681 L290,677 C290,674.791 288.209,673 286,673 L286,673 Z"
        id="browser"
      />
    </g>
  </svg>
);

export const BrowserIcon: React.FC<IconProps> = ({ handleOpen }) => {
  return (
    <button onClick={() => handleOpen("Home Page")}>
      <div className="h-18 w-18 m-2 flex flex-col items-center justify-center">
        <WebBrowserIcon />
        <span className=" mt-1 font-chicago text-xs text-white">
          Web Browser
        </span>
      </div>
    </button>
  );
};
