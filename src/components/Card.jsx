//import React from 'react'
import PropTypes from "prop-types";
import {FaRegFileAlt} from "react-icons/fa";
import {IoClose} from "react-icons/io5";
import {LuDownload} from "react-icons/lu";
import { motion } from "framer-motion";
import { MdDeleteSweep } from "react-icons/md";
function Card({data, reference, onDelete}) {
  return (
    <motion.div drag dragConstraints={reference} whileDrag={{scale: 1.2}} className="relative flex-shrink-0 w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden">
      <FaRegFileAlt />
      <button onClick={()=> onDelete(data._id)} className=" absolute top-9 right-5 text-xl hover:text-red-500"><MdDeleteSweep/></button>
      <p className="text-s leading-tight mt-5 font-semibold">{data.desc}</p>
      <div className="footer absolute bottom-0 w-full left-0">
        <div className="flex items-center justify-between py-3 px-8 ">
          <h5> {data.filesize} </h5>
          <span className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center">
            {data.close ? <IoClose/> : <LuDownload size="0.9em" color="#fff"/> }  
          </span>
        </div>
        {data.tag.isOpen && (
            <div className={`tag w-full py-3 ${data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"} flex items-center justify-center`}>
              <h3 className="text-sm font-semibold ">{data.tag.tagTitle}</h3>
            </div>
          )
        } 
      </div>
    </motion.div>
  )
};

Card.propTypes = {
  data: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    filesize: PropTypes.string.isRequired,
    close: PropTypes.bool.isRequired,
    tag: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      tagTitle: PropTypes.string.isRequired,
      tagColor: PropTypes.string.isRequired,
    }).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  reference: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;