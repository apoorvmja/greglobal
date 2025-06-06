import { GraduationCap, Copy, CheckCircle, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from "framer-motion"


export default function GREVoucherHero({ onEnquiryButtonClick }: { onEnquiryButtonClick: () => void }) {
    const offers = [
        { amount: 1500, type: "Exam Booking", Avaiable: "Available" },
        { amount: 1000, type: "Voucher", Avaiable: "Available" },
        { amount: 5600, type: "Discount Code", Avaiable: "Not Available" },
    ];
    return (
        <div className="min-h-screen dark:bg-none bg-gradient-to-b from-slate-50 to-slate-100">
            <Card className="mx-auto max-w-5xl overflow-hidden">
                <CardHeader className="space-y-4 p-6 md:p-8 text-center">
                    <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        MJ Study Abroad × ETS Partnership
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Exclusive GRE exam discounts for students
                    </p>
                </CardHeader>

                <CardContent className="grid gap-8 p-6 md:p-8 lg:grid-cols-2">
                    <div className="space-y-6">

                        <div
                            onClick={() => {
                                const target = document.getElementById('pricing-section');
                                target?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent"
                        >
                            <div className="rounded-full bg-purple-100 p-2.5 dark:bg-purple-900">
                                <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="font-medium">Save on GRE Discount Code</p>
                                <div className="flex items-center space-x-2 gap-2">
                                    <Badge variant="secondary" className="text-lg">
                                        INR 5,600
                                    </Badge>
                                    Not Available
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                const target = document.getElementById('voucher-purchase');
                                if (target) {
                                    const topOffset = target.getBoundingClientRect().top + window.scrollY - 100 // adjust -100 as needed
                                    window.scrollTo({ top: topOffset, behavior: 'smooth' })
                                }
                            }}
                            className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent"
                        >
                            <div className="rounded-full bg-purple-100 p-2.5 dark:bg-purple-900">
                                <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="font-medium">Save on GRE Voucher</p>
                                <div className="flex items-center space-x-2 gap-2">
                                    <Badge variant="secondary" className="text-lg">
                                        INR 3,450
                                    </Badge>
                                    Available
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent">
                            <div className="rounded-full bg-purple-100 p-2.5 dark:bg-purple-900">
                                <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="font-medium">Save on GRE Exam Booking</p>
                                <div className="flex items-center space-x-2 gap-2">
                                    <Badge variant="secondary" className="text-lg">
                                        INR 1,500
                                    </Badge>
                                    Available
                                </div>
                            </div>
                        </div> */
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                onClick={() => {
                                    const target = document.getElementById('reliability-section')
                                    if (target) {
                                        const topOffset = target.getBoundingClientRect().top + window.scrollY - 100 // adjust -100 as needed
                                        window.scrollTo({ top: topOffset, behavior: 'smooth' })
                                    }
                                }}
                            >
                                <Card className="group transition-shadow hover:shadow-lg border-green-200 dark:border-green-800 cursor-pointer">
                                    <CardHeader className="flex flex-row items-center space-x-4 p-4">
                                        <div className="rounded-full bg-green-100 dark:bg-green-900 p-2.5 transition-transform duration-300 group-hover:scale-105">
                                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-lg font-semibold">Check Reliability</p>
                                            <p className="text-sm text-muted-foreground">
                                                Verified by 450+ students who booked GRE at the lowest price.
                                            </p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-xs text-green-700 dark:text-green-300 italic">
                                            Trusted by top scorers across India.
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>}

                    </div>

                    <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                        <Image
                            width={500}
                            height={500}
                            src="/greDiscountCodeHero.webp"
                            alt="Student saving money on GRE exam"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </CardContent>

                <Separator />

                <CardFooter className="flex flex-col space-y-4 p-6 md:p-8">
                    <div className="flex w-full flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <Button
                            onClick={onEnquiryButtonClick}
                            className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 text-white transition-all hover:shadow-lg sm:w-auto"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                Enquire Now!
                            </span>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Button>
                        <p className="text-center text-sm text-muted-foreground sm:text-right">
                            Limited time offer. Expires soon.
                        </p>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}

