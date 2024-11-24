import Head from 'next/head'
import MenuLayout from '../../components/MenuLayout'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { Box, Button, Center, Flex, Grid, Img, Input, Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import { COLORS } from '../../services/theme/colors';
import ProductDisplay from '../../components/homepagecomponents/Electronics/ProductDisplay';
import Lottie from 'react-lottie';
import Empty from '../../assets/lottie/empty.json'
import { getCollection, getCollections, getGender, getSearchResult } from '../../services/productService';
import { useRouter } from 'next/router';
import SelectionButton from '../../components/homepagecomponents/CategoryMenu/selectionButton';
import { imagePath } from '../../services/Variable';

export default function Men() {

    const [data, setData] = useState([]);
    const [value, setValue] = useState(3)
    const [brandstyle, setBrandStyle] = useState("1")
    const [loading, setLoading] = useState(false)
    const { query } = useRouter()
    const router = useRouter()
    const [select, setSelect] = useState({ title: "", _id: "123" })
    const [category, setCategory] = useState([])
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Empty,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    async function SearchProduct() {
        setLoading(true);
        const brands = await getCollections(value)
        setCategory(brands)
        setLoading(false)
    }

    useEffect(() => {
        SearchProduct()
    }, [select._id])

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#0dadf7" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Box bg={COLORS.white}>
                    <MenuLayout menu={false} category={false}>
                        <Box onClick={() => SearchProduct()} overflow="hidden" mt={["20px", "20px", "20px", "30px"]} pos="relative">
                            <Img src="/banner/collection.png" />
                            <Center flexDir="column" w="full" textAlign={"center"} fontWeight="700" color="#fff" pos="absolute" top="0px" h="full" bg="#000000b5" fontSize={["24px", "32px", "47px", "57px"]} >
                                <Box>
                                    Shop
                                </Box>
                                <Box>
                                    All Collections
                                </Box>
                            </Center>
                        </Box>
                        <Center h={["100px", "100px", "100px", "197px"]} fontWeight="700" fontSize={["24px", "27px", "47px", "57px"]}>
                            Stay Classy, Stay Trendy
                        </Center>
                        {loading ?
                            <Center h="300px" w="full">
                                <Spinner size="xl" />
                            </Center> :
                            <Box p={["20px", "20px", "20px", "30px"]}>
                                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={[4, 2, 3, 10]}>
                                    {category.map((a: any, index: any) => (
                                        <Box mb="10px" w={["full", "100%", "100%"]} pos="relative" overflow="hidden" cursor="pointer" borderRadius={["8px", "16px", "24px"]} h="320px" key={index}>
                                            <Img h={["100%", "100%", "150%"]} src={a.image ? imagePath + "/" + a.image : "/banner/collectionBanner.png"} />
                                            <Center w="100%" h="100%" fontWeight="900" pos="absolute" background="#00000096" color="#fff" top="0px" justifyContent="start" pl="20px" fontSize="24px">
                                                {a.title}
                                            </Center>
                                            <Button
                                                onClick={() => {
                                                    router.push(`/collection/${a._id}`)
                                                }}
                                                borderRadius={["8px", "16px", "24px"]}
                                                pos="absolute" bottom="20px" left="20px" fontSize="20px" h="53px">
                                                Browse
                                                <svg style={{ marginLeft: 10 }} width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.6667 1.66675L1 13.3334" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M2.16666 1.66675H12.6667V12.1667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </Button>
                                        </Box>
                                    ))}
                                </Grid>
                            </Box>
                        }
                    </MenuLayout>
                </Box>
            </main>
        </>
    )
}
