import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BookOpen, Info, Mail, Calendar, Video, FormInputIcon } from 'lucide-react'

const pricingOptions = [
    {
        price: 16900,
        actualPrice: 22500,
        savings: 5600,
        description: "You will get the code through watching the youtube video. (Out-dated)",
        bookingMethod: "youtube_code",
    },
    {
        price: 21500,
        actualPrice: 22500,
        savings: 1000,
        description: "You will get the voucher code on your registered Email ID",
        bookingMethod: "buy_voucher",
    },
    {
        price: 21000,
        actualPrice: 22500,
        savings: 1500,
        description: "We will book the exam slot for you, you will not get the voucher code",
        bookingMethod: "slot_booking",
        popular: true,
    },
]

export default function TOEFLPricing({ onEnquiryButtonClick }: { onEnquiryButtonClick: () => void }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">GRE Exam Booking Options</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingOptions.map((option, index) => (
                    <Card key={index} className={`flex flex-col ${option.popular ? 'border-gray-800' : ''}`}>
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
                            <p className="text-sm mb-4">{option.description}</p>
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
            </div>
        </div>
    )
}

