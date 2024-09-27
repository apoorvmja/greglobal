import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import VoucherPage from "@/components/gre-voucher/VoucherPage";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gre Discount Code | Save Rs5600',
    description: 'Buy discounted GRE exam vouchers at GREGoGlobal. Save on your GRE test fees with the best deals and exclusive offers on GRE vouchers.',
    keywords: ['GRE vouchers', 'discounted GRE exam vouchers', 'buy GRE voucher', 'GRE voucher deals', 'cheap GRE test vouchers', 'GREGoGlobal vouchers', "gre discount code", "gre voucher code"],
    openGraph: {
        title: 'Get Discounted GRE Exam Vouchers | Best Deals on GRE Vouchers',
        description: 'Find the best deals on discounted GRE exam vouchers at GREGoGlobal. Save big on your GRE test fees and get exclusive offers now.',
        url: 'https://gregoglobal.com/GreGoGlobalLandingPage.webp',
        images: [
            {
                url: 'https://gregoglobal.com/GreGoGlobalLandingPage.webp',
                alt: 'Discounted GRE Exam Vouchers',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Discounted GRE Exam Vouchers | Best Deals on GRE Vouchers',
        description: 'Save money on your GRE exam with discounted vouchers from GREGoGlobal. Get exclusive deals on GRE test vouchers today. Enter GRE agent code and discount code to get Rs5600 of on GRE Registration.',
        images: ['https://gregoglobal.com/GreGoGlobalLandingPage.webp'],
    },
    alternates: {
        canonical: 'https://gregoglobal.com/gre-voucher',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function Page() {
    return (
        <ContentLayout title="Gre Exam Voucher">
            <VoucherPage />
        </ContentLayout>
    );
}
