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

export default function Page() {
    return (
        <ContentLayout title="Gre Exam Voucher">
            <VoucherPage />
        </ContentLayout>
    );
}
