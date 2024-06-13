/* eslint-disable react/prop-types */
import { useState } from 'react';
import cv2 from '../../assets/Kehinde-Gabriel-Adigun-Resume.jpg';
import cv from '../../assets/Kehinde-Gabriel-Adigun-Resume.pdf';
import tailwinding from '../../assets/tailwind.svg';
import Button from '../others/button';
import SkillsList from './skillsList';

const Skills = function (props) {
  const [selectedOption, setSelectedOption] = useState('');
  const [inMenu, setInMenu] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // console.log(selectedOption);
  };
  // console.log(selectedOption);
  const itemList = [
    {
      id: 'm1',
      name: 'HTML',
      link: (
        // <svg
        //   width="30"
        //   height="30"
        //   viewBox="0 0 30 30"
        //   fill="white"
        //   xmlns="http://www.w3.org/2000/svg"
        // >
        //   <g id="icomoon-free:html-five" clipPath="url(#clip0_155_41)">
        //     <path
        //       id="Vector"
        //       d="M2.5619 0.72168L4.8688 26.5934L15.2211 29.4681L25.6003 26.5898L27.9108 0.72168H2.5637H2.5619ZM22.8892 9.1839H10.7474L11.0367 12.434H22.6017L21.7304 22.1755L15.2211 23.9793L8.72082 22.1755L8.27705 17.1916H11.4625L11.6889 19.7248L15.2229 20.6771L15.2301 20.6753L18.7659 19.7212L19.1324 15.6069H8.13511L7.27991 6.01102H23.1749L22.8892 9.1839Z"
        //       fill="white"
        //     />
        //   </g>
        //   <defs>
        //     <clipPath id="clip0_155_41">
        //       <rect
        //         width="28.7464"
        //         height="28.7464"
        //         fill="white"
        //         transform="translate(0.862305 0.72168)"
        //       />
        //     </clipPath>
        //   </defs>
        // </svg>
        <img
          alt="svgImg"
          className="h-9 sm:h-9 md:h-11"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiMwN2M1MTQiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoNS4xMiw1LjEyKSI+PHBhdGggZD0iTTQ1LjI3MzQ0LDIuMzI0MjJjLTAuMTg3NSwtMC4yMDcwMyAtMC40NTcwMywtMC4zMjQyMiAtMC43MzgyOCwtMC4zMjQyMmgtMzkuMDcwMzFjLTAuMjgxMjUsMCAtMC41NTA3OCwwLjExNzE5IC0wLjczODI4LDAuMzI0MjJjLTAuMTkxNDEsMC4yMDcwMyAtMC4yODUxNiwwLjQ4NDM4IC0wLjI1NzgxLDAuNzY1NjNsMy41MTk1MywzOS40MjU3OGMwLjAzNTE2LDAuNDE0MDYgMC4zMjQyMiwwLjc1NzgxIDAuNzIyNjYsMC44NzVsMTYuMDExNzIsNC41NzAzMWMwLjA4NTk0LDAuMDI3MzQgMC4xNzk2OSwwLjAzOTA2IDAuMjczNDQsMC4wMzkwNmMwLjA5Mzc1LDAgMC4xODM1OSwtMC4wMTE3MiAwLjI3MzQ0LC0wLjAzOTA2bDE2LjAyMzQ0LC00LjU3MDMxYzAuMzk4NDQsLTAuMTE3MTkgMC42ODM1OSwtMC40NjA5NCAwLjcyMjY2LC0wLjg3NWwzLjUxNTYzLC0zOS40MjU3OGMwLjAyNzM0LC0wLjI4MTI1IC0wLjA2NjQxLC0wLjU1ODU5IC0wLjI1NzgxLC0wLjc2NTYyek0zNi44NDc2NiwxNS45MTc5N2gtMTguODEyNWwwLjQ0OTIyLDUuMDg5ODRoMTcuOTEwMTZsLTEuMzQzNzUsMTUuMDQyOTdsLTEwLjA1ODU5LDMuMDM5MDZsLTAuMDk3NjYsLTAuMDMxMjVsLTkuOTQxNDEsLTMuMDExNzJsLTAuNTQyOTcsLTYuMTI4OTFoNC44NzEwOWwwLjIxMDk0LDIuMzc4OTFsNS41NTg1OSwxLjE2NDA2bDUuNDU3MDMsLTEuMTY0MDZsMC41ODIwMywtNi40Mzc1aC0xNy4wNDI5N2wtMS4zMjQyMiwtMTQuODA0NjloMjQuNTU4NTl6Ij48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"
        />
      ),
    },
    {
      id: 'm2',
      name: 'CSS',
      link: (
        <img
          alt="svgImg"
          className="h-9 sm:h-9 md:h-11"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiMwN2M1MTQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoNS4xMiw1LjEyKSI+PHBhdGggZD0iTTQyLDZsLTMsMzRsLTE0LDRsLTE0LC00bC0zLC0zNHpNMTYuODAwNzgsMjhoNGwwLjA5NzY2LDIuNWw0LjEwMTU2LDEuMzk4NDRsNC4xMDE1NiwtMS4zOTg0NGwwLjI5Njg4LC00LjVoLTguNzk2ODdsLTAuMjAzMTIsLTRoOS4yMDMxM2wwLjI5Njg4LC00aC0xMy43OTY4N2wtMC4zMDA3OCwtNGgxOC4zMDA3OGwtMC41LDhsLTAuNzAzMTIsMTEuNWwtNy44OTg0NCwyLjYwMTU2bC03Ljg5ODQ0LC0yLjYwMTU2eiI+PC9wYXRoPjwvZz48L2c+Cjwvc3ZnPg=="
        />
      ),
    },
    {
      id: 'm3',
      name: 'JS',
      link: (
        <img
          alt="svgImg"
          className="h-9 sm:h-9 md:h-11"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiMwN2M1MTQiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoNS4xMiw1LjEyKSI+PHBhdGggZD0iTTQzLjMzNTk0LDRoLTM2LjY2Nzk3Yy0xLjQ3MjY2LDAgLTIuNjY3OTcsMS4xOTUzMSAtMi42Njc5NywyLjY2Nzk3djM2LjY2NDA2YzAsMS40NzI2NiAxLjE5NTMxLDIuNjY3OTcgMi42Njc5NywyLjY2Nzk3aDM2LjY2NDA2YzEuNDcyNjYsMCAyLjY2Nzk3LC0xLjE5NTMxIDIuNjY3OTcsLTIuNjY0MDZ2LTM2LjY2Nzk3YzAsLTEuNDcyNjYgLTEuMTk1MzEsLTIuNjY3OTcgLTIuNjY0MDYsLTIuNjY3OTd6TTI3LDM2LjE4MzU5YzAsMy45OTYwOSAtMi4zNDM3NSw1LjgxNjQxIC01Ljc2NTYyLDUuODE2NDFjLTMuMDkzNzUsMCAtNS4zMjQyMiwtMi4wNzQyMiAtNi4yMzQzNywtNGwzLjE0NDUzLC0xLjkwMjM0YzAuNjA1NDcsMS4wNzQyMiAxLjUyNzM0LDEuOTAyMzQgMi44NTU0NywxLjkwMjM0YzEuMjY5NTMsMCAyLC0wLjQ5NjA5IDIsLTIuNDI1Nzh2LTEyLjU3NDIyaDR6TTM1LjY3NTc4LDQyYy0zLjU0Mjk3LDAgLTUuNTU0NjksLTEuNzg1MTYgLTYuNjc1NzgsLTRsMywtMmMwLjgxNjQxLDEuMzM1OTQgMS43MDcwMywyLjYxMzI4IDMuNTg5ODQsMi42MTMyOGMxLjU4MjAzLDAgMi40MTAxNiwtMC43ODkwNiAyLjQxMDE2LC0xLjg4MjgxYzAsLTEuMzA0NjkgLTAuODU5MzcsLTEuNzY5NTMgLTIuNTk3NjYsLTIuNTMxMjVsLTAuOTUzMTIsLTAuNDEwMTZjLTIuNzUzOTEsLTEuMTcxODcgLTQuNTg1OTQsLTIuNjQwNjIgLTQuNTg1OTQsLTUuNzVjMCwtMi44NTkzNyAyLjE4MzU5LC01LjAzOTA2IDUuNTg5ODQsLTUuMDM5MDZjMi40MjU3OCwwIDQuMTY3OTcsMC44NDM3NSA1LjQyNTc4LDMuMDU0NjlsLTIuOTY4NzUsMS45MTAxNmMtMC42NTYyNSwtMS4xNzU3OCAtMS4zNTkzNywtMS42MzY3MiAtMi40NTcwMywtMS42MzY3MmMtMS4xMTcxOSwwIC0xLjgyNDIyLDAuNzEwOTQgLTEuODI0MjIsMS42MzY3MmMwLDEuMTQ0NTMgMC43MDcwMywxLjYwNTQ3IDIuMzQzNzUsMi4zMTY0MWwwLjk1MzEzLDAuNDEwMTZjMy4yNDYwOSwxLjM4NjcyIDUuMDc0MjIsMi44MDQ2OSA1LjA3NDIyLDUuOTkyMTljMCwzLjQzMzU5IC0yLjY5OTIyLDUuMzE2NDEgLTYuMzI0MjIsNS4zMTY0MXoiPjwvcGF0aD48L2c+PC9nPgo8L3N2Zz4="
        />
      ),
    },
    {
      id: 'm4',
      name: 'REACT',
      link: (
        <img
          className="h-9 sm:h-9 md:h-11"
          alt="svgImg"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiMwN2M1MTQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoNS4xMiw1LjEyKSI+PHBhdGggZD0iTTM0LjU1NDY5LDMuOTg0MzhjLTAuNzc5NjksLTAuMDI2MjIgLTEuNTk1OCwwLjEwOTcyIC0yLjQxNDA2LDAuMzc1Yy0xLjYzNjUyLDAuNTMwNTcgLTMuMzUxNDIsMS41NjQ1MSAtNS4xMTEzMywyLjk5NjA5Yy0wLjY4OTcxLDAuNTYxMDQgLTEuMzg1NjcsMS4yMDIzNiAtMi4wODM5OCwxLjg4MjgxYy0wLjY4MjkxLC0wLjY2MzE4IC0xLjM2NDU4LC0xLjI4NzI4IC0yLjAzOTA2LC0xLjgzNTk0Yy0xLjc1ODQ5LC0xLjQzMDQzIC0zLjQ2ODc1LC0yLjQ2NDc4IC01LjEwMTU2LC0yLjk5NDE0Yy0xLjYzMjgxLC0wLjUyOTM2IC0zLjI1NzQ2LC0wLjU0NTc3IC00LjU5MTgsMC4yMjQ2MWMtMS4zMzQzMywwLjc3MDM4IC0yLjEzMjI3LDIuMTg0NTQgLTIuNDkwMjQsMy44NjMyOGMtMC4zNTc5NiwxLjY3ODc0IC0wLjMxODUzLDMuNjc3OSAwLjA0MTAyLDUuOTE2MDJjMC4xMjQ4OSwwLjc3NzQgMC4zMDMsMS41OTI5NyAwLjUwNTg2LDIuNDIzODNjLTAuNzYyNDQsMC4yMzEwNyAtMS41MDI4NSwwLjQ3NDAyIC0yLjE4OTQ1LDAuNzQyMTljLTIuMDcyMSwwLjgwOTMxIC0zLjc4NjYzLDEuNzc3NTQgLTUuMDM1MTYsMi45Mjk2OWMtMS4yNDg1MywxLjE1MjE1IC0yLjA1NDY5LDIuNTUwNDkgLTIuMDU0NjksNC4wODU5NGMwLDEuNTM1NDUgMC44MDYxNiwyLjkzMTgzIDIuMDU0NjksNC4wODM5OGMxLjI0ODUyLDEuMTUyMTUgMi45NjMwNiwyLjEyMjMzIDUuMDM1MTYsMi45MzE2NGMwLjczNDE3LDAuMjg2NzUgMS41MjkwNCwwLjU0NDk1IDIuMzQ5NjEsMC43ODkwNmMtMC4yOTUxNiwxLjEwMjg0IC0wLjUzNDI5LDIuMTczMDMgLTAuNjk3MjcsMy4xODc1Yy0wLjM1OTg0LDIuMjM5OTIgLTAuMzk3ODMsNC4yMzkzMyAtMC4wMzkwNiw1LjkyMTg3YzAuMzU4NzgsMS42ODI1NSAxLjE1NzEyLDMuMTA0NzIgMi40OTgwNSwzLjg3ODkxYzEuMzQwOTMsMC43NzQxOSAyLjk3Mjg2LDAuNzU1MTggNC42MDkzOCwwLjIyNDYxYzEuNjM2NTIsLTAuNTMwNTcgMy4zNDk0NywtMS41NjI1NiA1LjEwOTM4LC0yLjk5NDE0YzAuNjgzMzYsLTAuNTU1ODcgMS4zNzQ2LC0xLjE4OTk4IDIuMDY2NDEsLTEuODYzMjhjMC42OTU0MywwLjY3NzM2IDEuMzg5NDQsMS4zMTQ0MyAyLjA3NjE3LDEuODczMDVjMS43NTg0OSwxLjQzMDQzIDMuNDcwNywyLjQ2MjgyIDUuMTAzNTIsMi45OTIxOWMxLjYzMjgxLDAuNTI5MzYgMy4yNTc0NywwLjU0NTc3IDQuNTkxOCwtMC4yMjQ2MWMxLjMzNDMzLC0wLjc3MDM4IDIuMTMwMzIsLTIuMTg0NTQgMi40ODgyOCwtMy44NjMyOGMwLjM1Nzk2LC0xLjY3ODc0IDAuMzE4NTMsLTMuNjc1OTUgLTAuMDQxMDIsLTUuOTE0MDZjLTAuMTYzNDEsLTEuMDE3MjIgLTAuNDAyNywtMi4wOTA5NiAtMC42OTkyMiwtMy4xOTcyN2MwLjg0NzY4LC0wLjI1MDA2IDEuNjY3NjUsLTAuNTE1MiAyLjQyMzgzLC0wLjgxMDU1YzIuMDcyMSwtMC44MDkzMSAzLjc4NjYzLC0xLjc3OTQ5IDUuMDM1MTYsLTIuOTMxNjRjMS4yNDg1MywtMS4xNTIxNSAyLjA1NDY5LC0yLjU0ODU0IDIuMDU0NjksLTQuMDgzOThjMCwtMS41MzU0NSAtMC44MDYxNiwtMi45MzM3OSAtMi4wNTQ2OSwtNC4wODU5NGMtMS4yNDg1MywtMS4xNTIxNSAtMi45NjMwNiwtMi4xMjAzNyAtNS4wMzUxNiwtMi45Mjk2OWMtMC42OTY0NSwtMC4yNzIwMiAtMS40NDgyMywtMC41MTgxMyAtMi4yMjI2NiwtMC43NTE5NWMwLjIwNDUxLC0wLjgzNTk1IDAuMzg2MDgsLTEuNjU3MzcgMC41MTE3MiwtMi40Mzk0NWMwLjM1OTgzLC0yLjIzOTkxIDAuMzk3ODQsLTQuMjQxMjggMC4wMzkwNiwtNS45MjM4M2MtMC4zNTg3NywtMS42ODI1NSAtMS4xNTkwNywtMy4xMDI3NyAtMi41LC0zLjg3Njk1Yy0wLjY3MDQ3LC0wLjM4NzA5IC0xLjQxMzY3LC0wLjU3NTM1IC0yLjE5MzM2LC0wLjYwMTU2ek0zNC40NjI4OSw2LjAxOTUzYzAuNDg5MjYsMC4wMTMzOCAwLjkwNjY0LDAuMTI5ODEgMS4yNjM2NywwLjMzNTk0YzAuNzE0MDYsMC40MTIyNiAxLjI0MTg2LDEuMjE0NjIgMS41MjM0NCwyLjUzNTE2YzAuMjgxNTgsMS4zMjA1MyAwLjI3MTg1LDMuMTA0NyAtMC4wNjA1NSw1LjE3MzgzYy0wLjExMzgxLDAuNzA4NDMgLTAuMjc5MDUsMS40NTkyNCAtMC40NjY4LDIuMjI4NTJjLTIuMDQ1NSwtMC40OTIyNyAtNC4yODY5MSwtMC44NTc1NyAtNi42NzU3OCwtMS4wNzIyN2MtMS4xOTkyNCwtMS42NjEzNyAtMi40MzE0NywtMy4xNzQ5MiAtMy42NzM4MywtNC41MTc1OGMwLjY1NzE0LC0wLjY0MTQ2IDEuMzEwMDIsLTEuMjQxNCAxLjk0NzI3LC0xLjc1OTc3YzEuNjI1NzEsLTEuMzIyNDMgMy4xNjQ4MSwtMi4yMjIyNiA0LjQ0OTIyLC0yLjYzODY3YzAuNjQyMiwtMC4yMDgyMSAxLjIwNDEsLTAuMjk4NTQgMS42OTMzNiwtMC4yODUxNnpNMTUuNDg2MzMsNi4wMjUzOWMwLjQ5MjA5LC0wLjAxMzc0IDEuMDU1MTYsMC4wNzYzNSAxLjY5OTIyLDAuMjg1MTZjMS4yODgxMSwwLjQxNzYxIDIuODI5OTEsMS4zMTcwNSA0LjQ1NzAzLDIuNjQwNjNjMC42MjQ0NiwwLjUwNzk2IDEuMjYyNzIsMS4wOTY0OCAxLjkwNjI1LDEuNzIyNjZjLTEuMjUxNTUsMS4zNTM2NSAtMi40OTM5NywyLjg4MDMxIC0zLjcwMTE3LDQuNTU2NjRjLTIuMzc4NzcsMC4yMTg2MSAtNC42MTEwNSwwLjU4NTg4IC02LjY0NjQ4LDEuMDgwMDhjLTAuMTg2MzUsLTAuNzY1MDEgLTAuMzUxNjEsLTEuNTExOTYgLTAuNDY0ODQsLTIuMjE2OGMtMC4zMzI2OSwtMi4wNzA5MiAtMC4zNDA5OSwtMy44NTUzNSAtMC4wNTg1OSwtNS4xNzk2OWMwLjI4MjM5LC0xLjMyNDM0IDAuODE0NSwtMi4xMzI3NiAxLjUzNTE2LC0yLjU0ODgzYzAuMzYwMzIsLTAuMjA4MDMgMC43ODEzNSwtMC4zMjYxMSAxLjI3MzQ0LC0wLjMzOTg0ek0yNC45NzY1NiwxMi4xNDI1OGMwLjgxNDYxLDAuODg2NDkgMS42MjkzOSwxLjg1NjU4IDIuNDM3NSwyLjkwMDM5Yy0wLjc5NDAzLC0wLjAzMzExIC0xLjU5Nzc3LC0wLjA1Mjc0IC0yLjQxNDA2LC0wLjA1Mjc0Yy0wLjgzMjU0LDAgLTEuNjUxNTksMC4wMjAyNiAtMi40NjA5NCwwLjA1NDY5YzAuODA4MjksLTEuMDQ0NjIgMS42MjI2OSwtMi4wMTUxOCAyLjQzNzUsLTIuOTAyMzR6TTI1LDE3LjAwOTc3YzEuMzU5ODksMCAyLjY4NTM1LDAuMDU1ODggMy45NzQ2MSwwLjE1MDM5YzAuODg3MTIsMS4yNzQxNiAxLjc1NDA0LDIuNjI1OSAyLjU4MDA4LDQuMDU2NjRjMC43MjU4MiwxLjI1NzE1IDEuMzgyNjQsMi41MTIzNyAxLjk4MDQ3LDMuNzUxOTVjLTAuNjA0MTQsMS4yNTYwMyAtMS4yNzE5NywyLjUyODIyIC0yLjAwNzgxLDMuODAyNzNjLTAuNjQ3NzQsMS4xMjE5MSAtMS4zMjQxNSwyLjE4NzQ2IC0yLjAxMTcyLDMuMjE0ODRjLTEuNDU2MzEsMC4xMjE3MiAtMi45NjUzMiwwLjE4OTQ1IC00LjUxNTYyLDAuMTg5NDVjLTEuNTg3NjIsMCAtMy4xMzA1NCwtMC4wNzE3NSAtNC42MTkxNCwtMC4xOTkyMmMtMC42NzYxMiwtMS4wMTI2MSAtMS4zNDExMiwtMi4wNjIwMiAtMS45Nzg1MiwtMy4xNjYwMmMtMC43MzQxNiwtMS4yNzE2IC0xLjM5ODc3LC0yLjU0MTQ3IC0yLjAwMTk1LC0zLjc5NDkyYzAuNjA1NzIsLTEuMjYwNTMgMS4yNzMzMSwtMi41Mzc0NSAyLjAxMTcyLC0zLjgxNjQxYzAuODIxNzEsLTEuNDIzMjQgMS42ODYxLC0yLjc2NzE2IDIuNTY4MzYsLTQuMDM1MTZjMS4zMDMxNCwtMC4wOTY2NCAyLjY0Mzk4LC0wLjE1NDMgNC4wMTk1MywtMC4xNTQzek0zMS41NDg4MywxNy40MTAxNmMxLjY0ODQ3LDAuMjA1NjggMy4xOTYyNiwwLjQ5MTI1IDQuNjM2NzIsMC44MzM5OGMtMC40Mjc0MiwxLjQwMTE1IC0wLjk1Mzg5LDIuODY0NjcgLTEuNTkxOCw0LjM3NWMtMC40MTQxOCwtMC43OTg0MiAtMC44NDMxNSwtMS41OTk1NiAtMS4zMDY2NCwtMi40MDIzNGMtMC41NjE2OSwtMC45NzI4NyAtMS4xNDY3LC0xLjkwMDM4IC0xLjczODI4LC0yLjgwNjY0ek0xOC4zNDM3NSwxNy40MjU3OGMtMC41NzkxLDAuODg5MzIgLTEuMTQ4OTEsMS43OTg4IC0xLjY5OTIyLDIuNzUxOTVjLTAuNDY5NDQsMC44MTMwOSAtMC45MDczMSwxLjYyNSAtMS4zMjYxNywyLjQzMzU5Yy0wLjYzMjQsLTEuNTAxMjUgLTEuMTU1NywtMi45NTY0NSAtMS41ODAwOCwtNC4zNDk2MWMxLjQyOTcyLC0wLjM0MzM2IDIuOTY4NDgsLTAuNjI3OTEgNC42MDU0NywtMC44MzU5NHpNMzguMTY0MDYsMTguNzc1MzljMC43MDg4OCwwLjIxNDQ5IDEuMzkzNSwwLjQzODMyIDIuMDIxNDgsMC42ODM1OWMxLjkxMDE1LDAuNzQ2MDYgMy40MjExLDEuNjI5NTEgNC40MDAzOSwyLjUzMzJjMC45NzkyOSwwLjkwMzY5IDEuNDA0MywxLjc2NTUxIDEuNDA0MywyLjYwMTU2YzAsMC44MzYwNSAtMC40MjUwMSwxLjY5Nzg3IC0xLjQwNDMsMi42MDE1NmMtMC45NzkyOSwwLjkwMzY5IC0yLjQ5MDI0LDEuNzg3MTQgLTQuNDAwMzksMi41MzMyYy0wLjY5Nzg1LDAuMjcyNTYgLTEuNDY0NTksMC41MTk3MyAtMi4yNjE3MiwwLjc1MzkxYy0wLjU2ODYzLC0xLjc1ODc4IC0xLjI5NDQyLC0zLjU5MzY1IC0yLjE1ODIsLTUuNDY2OGMwLjk5MzE2LC0yLjE1MDU0IDEuNzk1NDYsLTQuMjQ3MzQgMi4zOTg0NCwtNi4yNDAyM3pNMTEuODAyNzMsMTguNzg1MTZjMC41OTYwNywxLjk3MzAxIDEuMzg4MDgsNC4wNDg5NiAyLjM2NzE5LDYuMTc3NzNjLTAuODY5NDUsMS44ODQwNiAtMS41OTg4MywzLjcyOTM2IC0yLjE2OTkyLDUuNDk4MDVjLTAuNzY5MDQsLTAuMjI4MDIgLTEuNTA5NzksLTAuNDY4NDkgLTIuMTg1NTUsLTAuNzMyNDJjLTEuOTEwMTUsLTAuNzQ2MDYgLTMuNDIxMSwtMS42Mjk1MSAtNC40MDAzOSwtMi41MzMyYy0wLjk3OTI5LC0wLjkwMzY5IC0xLjQwNDMsLTEuNzY1NTEgLTEuNDA0MywtMi42MDE1NmMwLC0wLjgzNjA1IDAuNDI1MDEsLTEuNjk3ODcgMS40MDQzLC0yLjYwMTU2YzAuOTc5MjksLTAuOTAzNjkgMi40OTAyNCwtMS43ODcxNCA0LjQwMDM5LC0yLjUzMzJjMC42MTgzMiwtMC4yNDE1IDEuMjkxNDYsLTAuNDYyMTUgMS45ODgyOCwtMC42NzM4M3pNMjUsMjBjLTIuNzQ5NTgsMCAtNSwyLjI1MDQyIC01LDVjMCwyLjc0OTU4IDIuMjUwNDIsNSA1LDVjMi43NDk1OCwwIDUsLTIuMjUwNDIgNSwtNWMwLC0yLjc0OTU4IC0yLjI1MDQyLC01IC01LC01ek0xNS4zNDE4LDI3LjM2NTIzYzAuNDIwNywwLjgxMjYyIDAuODU4MjMsMS42MjgwNSAxLjMzMDA4LDIuNDQ1MzFjMC4zNjkxNywwLjYzOTQzIDAuNzQ2MiwxLjI2MTg1IDEuMTI4OTEsMS44NzMwNWMtMS4zNDI5NiwtMC4xODYyMiAtMi42MTk1NSwtMC40MjE5OSAtMy44MTgzNiwtMC43MDExN2MwLjM4MTIzLC0xLjE2NzYxIDAuODM3MzIsLTIuMzc5NjMgMS4zNTkzOCwtMy42MTcxOXpNMzQuNjE5MTQsMjcuMzY1MjNjMC41MjQxNCwxLjI0MDQ5IDAuOTgwNDcsMi40NTQ0NSAxLjM2MzI4LDMuNjI1Yy0xLjIwMjYxLDAuMjc4ODYgLTIuNDgzMTMsMC41MTM4MiAtMy44MzAwOCwwLjY5OTIyYzAuMzg3NzMsLTAuNjE4NjcgMC43NzA2NCwtMS4yNDg4OCAxLjE0NDUzLC0xLjg5NjQ4YzAuNDY4MzgsLTAuODExMjUgMC45MDQyMSwtMS42MjEwNSAxLjMyMjI3LC0yLjQyNzczek0xMy40MDYyNSwzMi45MjM4M2MxLjgwOTgyLDAuNDI4NzQgMy43NzE0NywwLjc1ODA4IDUuODUxNTYsMC45NzI2NmMxLjM4ODU3LDIuMDA4MzggMi44MzUxNiwzLjgxMzAxIDQuMjkxMDIsNS4zOTA2M2MtMC42NTEwMiwwLjYzNDc1IC0xLjI5NjI2LDEuMjMwNDcgLTEuOTI3NzMsMS43NDQxNGMtMS42MjU3MSwxLjMyMjQzIC0zLjE2Njc3LDIuMjIwMzEgLTQuNDUxMTcsMi42MzY3MmMtMS4yODQ0MSwwLjQxNjQxIC0yLjI0Mjk4LDAuMzYxNDggLTIuOTU3MDMsLTAuMDUwNzhjLTAuNzE0MDYsLTAuNDEyMjYgLTEuMjM5OSwtMS4yMTQ2MiAtMS41MjE0OSwtMi41MzUxNmMtMC4yODE1OCwtMS4zMjA1MyAtMC4yNzM4LC0zLjEwMjc1IDAuMDU4NTksLTUuMTcxODdjMC4xNTA3OSwtMC45Mzg2NiAwLjM3NjE1LC0xLjk0Mzc4IDAuNjU2MjUsLTIuOTg2MzN6TTM2LjU2MDU1LDMyLjkzMTY0YzAuMjgyNDQsMS4wNDg5MSAwLjUwODQ3LDIuMDU3NzEgMC42NjAxNiwzLjAwMTk1YzAuMzMyNjksMi4wNzA5MiAwLjM0MDk5LDMuODU1MzUgMC4wNTg1OSw1LjE3OTY5Yy0wLjI4MjM5LDEuMzI0MzQgLTAuODEwNiwyLjEzNDcxIC0xLjUzMTI1LDIuNTUwNzhjLTAuNzIwNjUsMC40MTYwNyAtMS42ODg0NSwwLjQ3MDM1IC0yLjk3NjU2LDAuMDUyNzNjLTEuMjg4MTEsLTAuNDE3NjEgLTIuODI5OTEsLTEuMzE3MDUgLTQuNDU3MDMsLTIuNjQwNjJjLTAuNjM2MDEsLTAuNTE3MzYgLTEuMjg1NzMsLTEuMTE3OTEgLTEuOTQxNDEsLTEuNzU3ODFjMS40NjU2MiwtMS41ODM3NyAyLjkyMjQyLC0zLjM5NzYgNC4zMjAzMSwtNS40MTc5N2MyLjA4NTM0LC0wLjIxMzE0IDQuMDUyNDMsLTAuNTQwNTIgNS44NjcxOSwtMC45Njg3NXpNMjEuODY3MTksMzQuMTAxNTZjMS4wMjY3NiwwLjA1NTk2IDIuMDY3MDYsMC4wOTM3NSAzLjEzMjgxLDAuMDkzNzVjMS4wMzA1LDAgMi4wMzcwNiwtMC4wMzU1MiAzLjAzMTI1LC0wLjA4Nzg5Yy0xLjAxNjI5LDEuMzcxMTcgLTIuMDUyMjIsMi42MTc3MyAtMy4wODM5OCwzLjc0MDIzYy0xLjAzMTE0LC0xLjEyNDkgLTIuMDY1MTIsLTIuMzczNjkgLTMuMDgwMDgsLTMuNzQ2MDl6Ij48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"
        />
      ),
    },
    {
      id: 'm5',
      name: 'TAILWIND CSS',
      link: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 54 33">
          <g clip-path="url(#prefix__clip0)">
            <path
              fill="#fff"
              fill-rule="evenodd"
              d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
              clip-rule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="prefix__clip0">
              <path fill="#fff" d="M0 0h54v32.4H0z" />
            </clipPath>
          </defs>
        </svg>
      ),
      // link: tailwinding,
    },
  ];

  // for the select element
  // const downloadHandler = (event) => {
  //   event.preventDefault();
  //   console.log(event);
  //   setSelectedOption(event.target.value);

  //   const link = document.createElement('a');
  //   link.download = 'Kehinde Gabriel Adigun CV';

  //   if (selectedOption === 'download-img') {
  //     link.href = cv;
  //     setInMenu(false);
  //   }
  //   if (selectedOption === 'download-pdf') {
  //     link.href = cv2;
  //     setInMenu(false);
  //   }

  //   link.click();
  // };

  // for the list element using the download resume button
  const pdfResume = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.download = 'Kehinde Gabriel Adigun CV';
    link.href = cv;
    link.click();

    setInMenu(false);
  };
  const imgResume = (event) => {
    event.preventDefault();
    console.log('Download Img resume');
    const link = document.createElement('a');
    link.download = 'Kehinde Gabriel Adigun CV';
    link.href = cv2;
    link.click();

    setInMenu(false);
  };

  const showDownloadOptions = (event) => {
    event.stopPropagation();
    setInMenu(true);
  };
  const hideDownloadOptions = () => {
    setInMenu(false);
  };
  // props.menuActive(inMenu);
  // console.log(props);

  return (
    <div className="" onClick={hideDownloadOptions}>
      <h1 className="font-judson mb-12 text-primary text-4xl sm:text-5xl md:text-6xl">
        My Skills
      </h1>
      <div className="skillsList__item flex flex-col gap-8">
        {itemList.map((item) => (
          <SkillsList key={item.id} name={item.name} link={item.link} />
        ))}
      </div>
      <div className="skills__button mt-12 flex sm:flex-row md:flex-col md:gap-2">
        <Button link="" name="Download Resume" action={showDownloadOptions} />

        {inMenu ? (
          <ul className="sm:w-[250px] md:w-[300px] p-2 flex flex-col gap-2 rounded  bg-white/30 backdrop-blur-lg border border-white/20 rounded-lg max-w-sm">
            <li
              className="cursor-pointer border-b  border-primary hover:text-primary"
              onClick={pdfResume}
            >
              Download pdf
            </li>
            <li
              className="cursor-pointer hover:text-primary"
              onClick={imgResume}
            >
              Download Image
            </li>
          </ul>
        ) : (
          ''
        )}
      </div>
      {/* 
      <select
        id="fruit"
        className="py-4 px-6 border rounded-full transition-all duration-500 font-bold bg-primary text-black text-base sm:text-base lg:text-3xl border-primary cursor-pointer hover:text-primary hover:border-primary hover:bg-transparent"
        name="fruit"
        onChange={downloadHandler}
      >
        <option value="download-pdf">Download pdf</option>
        <option value="download-img">Download Image</option>
      </select> */}

      {/* <div className="w-[400px] sm:w-[400px] md:w-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div
          className={`bg-black text-white p-4  flex-col m-0 mx-auto ${
            !inMenu ? 'hidden' : 'block'
          } `}
        >
          <div className="border-b border-gray-300 pb-1 text-xl ">
            Download via
          </div>
          <div className="flex flex-col gap-3 pt-4 border-b border-gray-300 pb-1">
            <a
              href="#"
              onClick={downloadOptions}
              className="p-2 bg-red-500 w-max cursor-pointer"
            >
              Download Image
            </a>
            <a
              href="#"
              onClick={downloadOptions}
              className="p-2 bg-red-500 w-max cursor-pointer"
            >
              Download pdf
            </a>
          </div>
          <div className="flex justify-end p-2 flex-wrap">
            <a
              className=" fflex-wrap bg-red-500 px-4 py-2 cursor-pointer  rounded inline-block"
              onClick={downloadOptions}
            >
              close
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Skills;
