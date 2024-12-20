import { Award, CheckCircle, Clock, ChevronDown } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ToeflVoucherWhyUS() {
    return (
        <div className="container mx-auto py-16 px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-primary text-primary-foreground p-6 bg-gray-50">
                        <CardTitle className="flex items-center gap-3 text-2xl text-black/90">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CheckCircle className="w-8 h-8" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Officially Recognized</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            Registered ETS Partner
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-4">ETS Agent ID: IND00031</Badge>
                        <CardDescription className="text-lg">
                            As an official ETS partner, we provide authentic and up-to-date TOEFL resources.
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="benefits">
                                <AccordionTrigger>Benefits</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-5">
                                        <li>Direct access to ETS materials</li>
                                        <li>Certified TOEFL instructors</li>
                                        <li>Priority registration for TOEFL exams</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardFooter>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-secondary text-secondary-foreground p-6 bg-gray-50">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Award className="w-8 h-8" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Industry Recognition</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            Award-Winning Recognition
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Badge variant="destructive" className="mb-4">Most Registrations in North India</Badge>
                        <CardDescription className="text-lg">
                            Awarded by ETS for our outstanding performance in TOEFL exam registrations.
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="achievements">
                                <AccordionTrigger>Our Achievements</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-5">
                                        <li>Highest success rate in North India</li>
                                        <li>Over 10,000 students placed abroad</li>
                                        <li>98% student satisfaction rate</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardFooter>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-accent text-accent-foreground p-6 bg-gray-50">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Clock className="w-8 h-8" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>25+ Years of Experience</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            Globaly Trusted Since 1998
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Badge variant="outline" className="mb-4">25+ Years of Excellence</Badge>
                        <CardDescription className="text-lg">
                            A leading name in the Study Abroad Industry with over two decades of experience.
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="milestones">
                                <AccordionTrigger>Key Milestones</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-5">
                                        <li>Established in 1998</li>
                                        <li>Expanded to 50+ cities across India</li>
                                        <li>Launched online courses in 2020</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

