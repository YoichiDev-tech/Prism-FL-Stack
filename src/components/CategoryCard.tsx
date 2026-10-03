import { Link } from "react-router-dom";
import { Category } from "../types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/tools?category=${encodeURIComponent(category.name)}`}
      className="block rounded-xl border border-ink/8 bg-white p-4 text-center shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <span className="font-display text-sm font-semibold text-ink">
        {category.name}
      </span>
    </Link>
  );
}