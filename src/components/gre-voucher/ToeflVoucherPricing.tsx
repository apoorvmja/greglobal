import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BookOpen, Info, Mail, Calendar, Video, FormInputIcon, CheckCircle } from 'lucide-react'

const pricingOptions = [
    {
        price: 16900,
        actualPrice: 23452,
        savings: 5600,
        // description: "You will get the code through watching the youtube video. (Out-dated)",
        description: `Old ETS scheme – valid till 30th Sep 24. New ETS scheme – will update you soon.`, bookingMethod: "youtube_code",
    },
    {
        price: 21500,
        actualPrice: 23452,
        savings: 23452 - 21500,
        description: "You will get the voucher code on your registered Email ID",
        bookingMethod: "buy_voucher",
        popular: true,
        id: "voucher-purchase"
    },
    // {
    //     price: 21000,
    //     actualPrice: 22500,
    //     savings: 1500,
    //     description: "We will book the exam slot for you, you will not get the voucher code",
    //     bookingMethod: "slot_booking",
    //     popular: true,
    // },
]

export default function TOEFLPricing({ onEnquiryButtonClick, openCheckReliabilityModal }: { onEnquiryButtonClick: () => void; openCheckReliabilityModal: () => void }) {
    return (
        <div id="pricing-section" className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">GRE Exam Booking Options</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingOptions.map((option, index) => (
                    <Card id={option.id} key={index} className={`flex flex-col ${option.popular ? 'border-gray-800' : ''}`}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-2xl font-bold">₹{option.price.toLocaleString()}</CardTitle>
                                {option.popular && <Badge variant="default" className={`${option.popular ? 'animate-pulse' : ''}`}>Most Popular!</Badge>}
                            </div>
                            <CardDescription className="text-sm">
                                Actual Price – ₹{option.actualPrice.toLocaleString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <Badge variant="secondary" className="mb-4 text-base">
                                You Save ₹{option.savings.toLocaleString()}
                            </Badge>
                            <p
                                className="text-sm mb-4"
                                dangerouslySetInnerHTML={{ __html: option.description }}
                            />
                            <Separator className="my-4" />
                            {/* <div className="flex items-center text-sm text-muted-foreground">
                                {option.bookingMethod === 'youtube_code' && (
                                    <>
                                        <Video className="mr-2 h-4 w-4" />
                                        <span>Click Down to Watch video</span>
                                    </>
                                )}
                                {option.bookingMethod === 'buy_voucher' && (
                                    <>
                                        <FormInputIcon className="mr-2 h-4 w-4" />
                                        <span>Get Voucher code via whatsapp</span>
                                    </>
                                )}
                                {option.bookingMethod === 'slot_booking' && (
                                    <>
                                        <FormInputIcon className="mr-2 h-4 w-4" />
                                        <span>Voucher code via whatsapp</span>
                                    </>
                                )}
                            </div> */}
                        </CardContent>
                        <CardFooter>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 text-white"
                                            onClick={() => {
                                                if (option.bookingMethod === 'youtube_code') {
                                                    window.open("https://www.youtube.com/watch?v=9CBVCU2EMpY", "_blank", "noopener noreferrer");
                                                }
                                                if (option.bookingMethod === 'buy_voucher') {
                                                    // window.location.href = "https://wa.me/918802880181?text=Hi%2C%20I%E2%80%99m%20interested%20in%20purchasing%20a%20TOEFL%20voucher.%20Could%20you%20share%20the%20details%3F";
                                                    window.open("https://rzp.io/l/k07xk6e", "_blank", "noopener noreferrer");
                                                    // onEnquiryButtonClick()
                                                }
                                                if (option.bookingMethod === 'slot_booking') {
                                                    // window.location.href = "https://wa.me/918802880181?text=Hi%2C%20I%E2%80%99m%20interested%20in%20purchasing%20a%20TOEFL%20voucher.%20Could%20you%20share%20the%20details%3F";
                                                    onEnquiryButtonClick()
                                                }
                                            }}
                                        >
                                            <BookOpen className="mr-2 h-4 w-4" /> {option.bookingMethod === 'youtube_code' && "Watch Now!"} {option.bookingMethod === 'buy_voucher' && " Purchase Now!"} {option.bookingMethod === 'slot_booking' && "Schedule Call!"}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Click to proceed with booking</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardFooter>
                    </Card>
                ))}
                <Card id="reliability-section" className="flex flex-col border-green-500 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center space-x-3 ">
                            <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />
                            </div>
                            <CardTitle className="text-lg font-semibold">Check Reliability</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                            Trusted by 450+ GRE aspirants
                        </div>

                        <CardDescription className="mt-4 text-sm text-muted-foreground">
                            Verified by 450+ students who booked GRE at the lowest price.
                        </CardDescription>
                        <Separator className="my-4" />
                    </CardContent>
                    <CardFooter>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3 text-white"
                                        onClick={() => { openCheckReliabilityModal() }}
                                    >
                                        <BookOpen className="mr-2 h-4 w-4" /> Why Trust Us?
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Click to proceed with booking</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

