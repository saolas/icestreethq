import { Box, IconButton, Flex, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type props = {
    title: string,
    label: boolean,
    type?: { color: string, Header_Color: string, title: string },
    createdBy?: string,
    color?: any
}

export default function CategoryLabel({ title, label, type, createdBy, color }: props) {

    const navigate = useRouter()

    const clickHandler = () => {
        if (createdBy) {
            navigate.push(`/categories?category=${title}&&id=${createdBy}`)
        } else{
            navigate.push("/collection")
        }
    }

    useEffect(() => {
        console.log(type, "type")
    }, [])

    return (
        <Box className=' w-full' color={type && type.Header_Color ? type.Header_Color : ""} >
            <Box className={` w-full h-[60px] flex text-white justify-between items-center lg:pl-[32px] px-6 lg:pr-[55px] `} >
                <Box fontSize={["18px","20px","24px","36px"]} color={type?.Header_Color} className=' font-bold' >{type && type.title ? type.title : ""}</Box>
                <Center style={type ? { color: type.Header_Color } : {}} onClick={() => clickHandler()} className=' font-semibold ' >
                    <Box fontSize={["10px","12px","12px","14px"]} cursor="pointer">
                        See all
                    </Box>
                    <svg style={{ marginLeft: 20 }} width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.53845 15.5506H24.5628" stroke={type && type.Header_Color ? type.Header_Color : ""} stroke-width="2.5749" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.8381 23.2753L24.5628 15.5506" stroke={type && type.Header_Color ? type.Header_Color : ""} stroke-width="2.5749" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.8381 7.82587L24.5628 15.5506" stroke={type && type.Header_Color ? type.Header_Color : ""} stroke-width="2.5749" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </Center>
            </Box>
        </Box>
    )
} 