//import React from 'react'
import { useRef, useState } from "react";
import Card from "./Card";


function ForeGround() {

  const ref = useRef(null);

  const data = [
    {
      desc: "Lorem ipsum dolor sit amet consectetur hola.",
      filesize: "0.9 mb",
      close: true,
      tag: {isOpen: true, tagTitle: "Download Now", tagColor: "green"}, 
    },
    {
      desc: "Lorem ipsum dolor sit amet consectetur hola.",
      filesize: "0.9 mb",
      close: true,
      tag: {isOpen: true, tagTitle: "Download Now", tagColor: "green"}, 
    },
    {
      desc: "Lorem ipsum dolor sit amet consectetur hola.",
      filesize: "0.9 mb",
      close: true,
      tag: {isOpen: true, tagTitle: "Download Now", tagColor: "blue"}, 
    },
  ];

  useState()

  return (
    <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap p-5">
        {data.map((item,index) => (
          <Card key={index} data={item} reference={ref}/>
        ))}
    </div>
  );
};

export default ForeGround;