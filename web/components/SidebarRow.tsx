import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    onClick?: () => {}
}

function SidebarRow({Icon, onClick}: Props) {
  return (
    <div onClick={() => onClick?.()} className='flex group max-w-fit items-center space-x-2 px-4 py-3 rounded-full  cursor-pointer hover:bg-gray-100 transition-all duration-200'>
        <Icon className="h-6 w-6" />
    </div>
  )
}

export default SidebarRow