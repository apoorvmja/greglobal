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
    title: 'Get Discounted GRE Exam Vouchers | Best Deals on GRE Vouchers – GREGoGlobal',
    description: 'Buy discounted GRE exam vouchers at GREGoGlobal. Save on your GRE test fees with the best deals and exclusive offers on GRE vouchers.',
    keywords: ['GRE vouchers', 'discounted GRE exam vouchers', 'buy GRE voucher', 'GRE voucher deals', 'cheap GRE test vouchers', 'GREGoGlobal vouchers'],
    openGraph: {
        title: 'Get Discounted GRE Exam Vouchers | Best Deals on GRE Vouchers',
        description: 'Find the best deals on discounted GRE exam vouchers at GREGoGlobal. Save big on your GRE test fees and get exclusive offers now.',
        url: 'https://gregoglobal.com/voucher',
        images: [
            {
                url: 'https://gregoglobal.com/static/gre-voucher.png',
                alt: 'Discounted GRE Exam Vouchers',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Discounted GRE Exam Vouchers | Best Deals on GRE Vouchers',
        description: 'Save money on your GRE exam with discounted vouchers from GREGoGlobal. Get exclusive deals on GRE test vouchers today.',
        images: ['https://gregoglobal.com/static/gre-voucher.png'],
    },
    alternates: {
        canonical: 'https://gregoglobal.com/voucher',
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
