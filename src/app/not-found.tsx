import { EmptyState } from "@/components/common/EmptyState";
export default function NotFound() {
  return (
    <div className="container page">
      <EmptyState
        title="This page isn’t on our shelf."
        description="The page may have moved or the address may be incorrect."
        href="/"
        action="Return home"
      />
    </div>
  );
}
