import { Suspense } from "react";
import { Catalog } from "@/components/common/Catalog";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata = {
	title: "Accessories | Sandalu Isiwara",
	description: "Browse calculators and study accessories from Sandalu Isiwara.",
};

export default function AccessoriesPage() {
	return (
		<main className="container page">
			<Breadcrumbs items={[{ label: "Accessories" }]} />
			<SectionHeader
				page
				eyebrow="THE STUDY ESSENTIALS"
				title="Study accessories"
				description="Calculators and everyday essentials for your studies."
			/>
			<Suspense fallback={<p role="status">Loading accessories…</p>}>
				<Catalog kind="accessories" />
			</Suspense>
		</main>
	);
}
