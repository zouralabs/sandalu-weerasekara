import { Suspense } from "react";
import { Catalog } from "@/components/common/Catalog";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata = {
	title: "Accessories | Sandalu Isiwara",
	description: "Browse study accessories and stationery.",
};

export default function AccessoriesPage() {
	return (
		<main className="container page">
			<Breadcrumbs items={[{ label: "Accessories" }]} />
			<SectionHeader
				page
				eyebrow="THE STUDY ESSENTIALS"
				title="Accessories"
				description="Practical accessories for a better study routine. Product listings are illustrative until real stock is added."
			/>
			<Suspense fallback={<p role="status">Loading accessories…</p>}>
				<Catalog kind="accessories" />
			</Suspense>
		</main>
	);
}
