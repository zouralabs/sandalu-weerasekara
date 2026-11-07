import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata = {
	title: "Accessories | Sandalu Isiwara",
	description: "Study accessories are coming soon.",
};

export default function AccessoriesPage() {
	return (
		<main className="container page">
			<Breadcrumbs items={[{ label: "Accessories" }]} />
			<SectionHeader
				page
				eyebrow="THE STUDY ESSENTIALS"
				title="Coming soon"
				description="Study accessories are on their way. Please check back soon."
			/>
		</main>
	);
}
