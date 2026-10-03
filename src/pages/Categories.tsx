import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useCategories } from "../hooks/useCategories";

// Categories page: lists all categories as clickable cards.
// Clicking a category takes the user to the Home page pre-filtered.
export default function Categories() {
  const { categories, loading, error } = useCategories();

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
      <p className="mt-1 text-sm text-gray-500">
        Browse tools grouped by category.
      </p>

      <div className="mt-6">
        {loading && <Loader />}
        {!loading && error && (
          <ErrorState message={`Failed to load categories: ${error}`} />
        )}
        {!loading && !error && categories.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">
            No categories yet.
          </p>
        )}
        {!loading && !error && categories.length > 0 && (
          <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:grid-cols-3 sm:gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
