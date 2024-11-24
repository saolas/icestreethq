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
import { getCollections, getGender, getSearchResult } from '../../services/productService';
import { useRouter } from 'next/router';
import SelectionButton from '../../components/homepagecomponents/CategoryMenu/selectionButton';
import { getBrand, getBrandProduct } from '../../services/userCategories';

export default function Brand() {

    const [data, setData] = useState([]);
    const [value, setValue] = useState(3)
    const [brandstyle, setBrandStyle] = useState("")
    const [loading, setLoading] = useState(false)
    const { query } = useRouter()
    const [select, setSelect] = useState({ title: "", _id: "" })
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
        const productId = query.brandID
        if (productId) {
            const brandArray = await getBrandProduct(productId)
            console.log(brandArray, "brandArray")
            setData(brandArray)
        }
        setLoading(false)
    }

    useEffect(() => {
        SearchProduct()
    }, [query.brandID])

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
                        <Box overflow="hidden" mt={["20px", "20px", "20px", "30px"]} pos="relative">
                            <Img alt="banner" src="/banner/men.png" />
                            <Center flexDir="column" w="full" textAlign={"center"} fontWeight="700" color="#fff" pos="absolute" top="0px" h="full" bg="#000000b5" fontSize={["24px", "32px", "47px", "57px"]} >
                                <Box>
                                    Shop
                                </Box>
                                <Box>
                                    Men’s Collection
                                </Box>
                            </Center>
                        </Box>
                        {loading ?
                            <Center h="300px" w="full">
                                <Spinner size="xl" />
                            </Center> :
                            data.length < 1 ?
                                <Center flexDir="column" p="20px" w="full">
                                    <Lottie options={defaultOptions}
                                        height={300}
                                        width={300} />
                                    <Box fontWeight="700" mt="10px" fontSize="24px">
                                        No Result
                                    </Box>
                                </Center>
                                :
                                <Grid bg="whitesmoke" p={["20px","20px","20px","30px"]} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)']} gap={[4, 2, 3, 10]}>
                                    {data?.map((item: any, index: number) => {
                                        return (
                                            <Box key={index} mb="20px">
                                                <ProductDisplay item={item} index={index} />
                                            </Box>
                                        )
                                    })
                                    }
                                </Grid>
                        }
                    </MenuLayout>
                </Box>
            </main>
        </>
    )
}