import { districts, subjects, levels, mediums } from "@/data/categories";
import { Search } from "lucide-react";
export function QuickClassSearch() {
  return (
    <form action="/classes/" className="quick-class-search">
      {[
        { name: "level", label: "Grade", options: levels },
        { name: "subject", label: "Subject", options: subjects },
        { name: "district", label: "District", options: districts },
        { name: "medium", label: "Medium", options: mediums },
        {
          name: "type",
          label: "Class type",
          options: ["Online", "Physical", "Hybrid"],
        },
      ].map((field) => (
        <label key={field.name}>
          {field.label}
          <select name={field.name} defaultValue="">
            <option value="">All {field.label.toLowerCase()}s</option>
            {field.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      ))}
      <button type="submit" className="button primary">
        <Search size={17} />
        Find classes
      </button>
    </form>
  );
}
