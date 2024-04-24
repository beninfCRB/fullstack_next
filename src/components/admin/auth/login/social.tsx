"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export default function Social() {
    function google() {

    }

    function github() {

    }

    return (
        <div className='flex items-center w-full gap-x-2'>
            <Button
                size={'lg'}
                className='w-full'
                variant={'outline'}
                onClick={google}
            >
                <FcGoogle className='h-5 w-5' />
            </Button>
            <Button
                size={'lg'}
                className='w-full'
                variant={'outline'}
                onClick={github}
            >
                <FaGithub className='h-5 w-5' />
            </Button>
        </div>
    )
}
