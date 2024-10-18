import { GithubOutlined } from '@ant-design/icons'
import React from 'react'

function Header() {
    return (
        <div className='bg-[#001529] py-8 px-10 border-b-[2px] border-white'>
            <div className='flex items-center space-x-10'>
                <GithubOutlined className='scale-[3] text-white' />
                <h2 className='text-[22px] text-white font-semibold'>Admin panel</h2>
            </div>
        </div>
    )
}

export default Header