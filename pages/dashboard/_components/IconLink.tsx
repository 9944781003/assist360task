import React from 'react'
import {BsGear} from "react-icons/bs"

type IconLinkProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &{
    title?: string,
    titleColor?: string,
    icon?: React.ReactNode
}


export default function IconLink(props:IconLinkProps) {
  return (
   <div role='button' className='mt-4' onClick={props.onClick}>
    <div className="d-inline">
     {props.icon ? props.icon : <BsGear/>}
     <span style={{
      color: props.titleColor || 'black'
     }} className='ms-3'>{props.title}</span>
   </div>
   </div>
  )
}
