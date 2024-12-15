import React from 'react'
import Router, { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { Button, Image, Input, useToast } from '@chakra-ui/react'
import { useLoginCallback } from '../../services/authService';
import SpinLoader from '../../components/Loaders/SpinLoader';
import MenuLayout from '../../components/MenuLayout';
import { forgotPassword, resetPassword } from '../../services';

export default function ForgottenPassword() {

    const toast = useToast()
    const [loading, setLoading] = React.useState(false)
    const [isShown, setIsShown] = React.useState(false)
    const { handleLogin } = useLoginCallback();
    const navigate = useRouter()
    const loginSchema = yup.object({
        otp: yup.string().required('Your OTP is required'),
        email: yup.string().required('Your Email is required'),
        password: yup.string().required('Your Password is required')
    })

    // formik
    const formik = useFormik({
        initialValues: { otp: '', password: '', email:"" },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });

    const submit = async () => {
        setLoading(true)
        if (!formik.dirty) {
            // toast.error("Please Enter Your Email And Password") 
            toast({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
        } else if (!formik.isValid) {
            toast({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
        } else {
            try {
                const response = await resetPassword(formik.values)
                toast({
                    title: "password changed successfully",
                    position: "bottom",
                    status: "success",
                    isClosable: true,
                })
                navigate.push("/login")
            } catch (response: any) {
                toast({
                    title: response.response?.data ? response.response?.data : "Error occured",
                    position: "bottom",
                    status: "error",
                    isClosable: true,
                })
                setLoading(false);
            }
        }
        setLoading(false);
    }

    return (
        <main>
            <MenuLayout pageName='Ice Street SignUp' menu={false} category={false}>
                <div className=' w-full bg-white lg:bg-[#F5F5F5] flex flex-col items-center ' >
                    <div className=' lg:loginShadow w-full lg:w-[600px] font-medium my-12 rounded-xl flex flex-col bg-white py-8 px-4 lg:px-[45px] ' >
                        <p className=' font-bold lg:text-2xl text-center ' >Reset Password</p>
                        <div className=' w-full mt-10 lg:mt-8 ' >
                            <p className=' text-sm font-medium mb-2 ' >Email</p>
                            <Input
                                name="email"
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("email", true, true)
                                }
                                height="45px" border="1px solid #595959E5" placeholder='Enter OTP' fontSize="sm" />
                            <div className="w-full h-auto pt-2">
                                {formik.touched.email && formik.errors.email && (
                                    <motion.p
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-xs font-Inter-Medium text-[#ff0000]"
                                    >
                                        {formik.errors.email}
                                    </motion.p>
                                )}
                            </div>
                            <p className=' text-sm font-medium mb-2 ' >OTP</p>
                            <Input
                                name="otp"
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("otp", true, true)
                                }
                                height="45px" border="1px solid #595959E5" placeholder='Enter OTP' fontSize="sm" />
                            <div className="w-full h-auto pt-2">
                                {formik.touched.otp && formik.errors.otp && (
                                    <motion.p
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-xs font-Inter-Medium text-[#ff0000]"
                                    >
                                        {formik.errors.otp}
                                    </motion.p>
                                )}
                            </div>
                            <p className=' text-sm font-medium mb-2 ' > New Pasword</p>
                            <Input
                                name="password"
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("password", true, true)
                                }
                                height="45px" border="1px solid #595959E5" placeholder='Enter email address' fontSize="sm" />
                            <div className="w-full h-auto pt-2">
                                {formik.touched.password && formik.errors.password && (
                                    <motion.p
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-xs font-Inter-Medium text-[#ff0000]"
                                    >
                                        {formik.errors.password}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                        <Button colorScheme='blackAlpha' bg="black" isLoading={loading} isDisabled={loading} onClick={() => submit()} className=' w-full h-[45px] rounded-[5px] text-white bg-[#0dadf7] font-Inter-Bold text-sm mt-3 '>
                            Submit
                        </Button>
                        <p className=' text-sm text-center mt-6 font-medium ' >Remember your password? <span onClick={() => Router.push("/login")} className=' text-[#0dadf7] cursor-pointer ml-1 font-bold ' >Log In</span></p>
                    </div>
                </div>
            </MenuLayout>
        </main>
    )
} 