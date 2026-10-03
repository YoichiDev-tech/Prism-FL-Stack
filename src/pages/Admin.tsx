import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useTools } from "../hooks/useTools";

export default function Admin() {
  const { user, isAdmin, loading: authLoading, signIn, signOut } = useAuth();
  const {
    tools,
    loading,
    error,
    updateToolApproval,
    deleteTool,
    refetch,
  } = useTools({ enabled: isAdmin });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();
    setSigningIn(true);
    setActionError(null);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) setActionError(signInError);
    } catch (signInError) {
      setActionError(
        signInError instanceof Error
          ? signInError.message
          : "An unexpected error occurred while signing in."
      );
    } finally {
      setSigningIn(false);
    }
  }

  async function handleSignOut() {
    setActionError(null);
    try {
      const { error: signOutError } = await signOut();
      if (signOutError) setActionError(signOutError);
    } catch (signOutError) {
      setActionError(
        signOutError instanceof Error
          ? signOutError.message
          : "An unexpected error occurred while signing out."
      );
    }
  }

  async function handleApproval(id: string, isApproved: boolean) {
    setProcessingId(id);
    setActionError(null);
    try {
      const { error: updateError } = await updateToolApproval(id, isApproved);
      if (updateError) setActionError(updateError);
    } catch (updateError) {
      setActionError(
        updateError instanceof Error
          ? updateError.message
          : "An unexpected error occurred while updating the submission."
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Permanently delete "${name}"?`)) return;

    setProcessingId(id);
    setActionError(null);
    try {
      const { error: deleteError } = await deleteTool(id);
      if (deleteError) setActionError(deleteError);
    } catch (deleteError) {
      setActionError(
        deleteError instanceof Error
          ? deleteError.message
          : "An unexpected error occurred while deleting the tool."
      );
    } finally {
      setProcessingId(null);
    }
  }

  if (authLoading) return <Loader />;

  if (!user) {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="text-xl font-semibold text-gray-900">Admin sign in</h1>
        <p className="mt-1 text-sm text-gray-500">
          Sign in with an administrator account to review tool submissions.
        </p>
        <form onSubmit={handleSignIn} className="mt-6 flex flex-col gap-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-amber/30 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-amber/30 sm:text-sm"
            />
          </div>
          {actionError && (
            <p className="text-sm text-red-600" role="alert">
              {actionError}
            </p>
          )}
          <button
            type="submit"
            disabled={signingIn}
            className="min-h-11 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 disabled:opacity-50"
          >
            {signingIn ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg">
        <h1 className="text-xl font-semibold text-gray-900">Access denied</h1>
        <p className="mt-2 text-sm text-gray-600">
          This account does not have administrator permissions.
        </p>
        {actionError && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {actionError}
          </p>
        )}
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-4 min-h-11 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-500"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Submission review
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review submissions and manage published tools.
          </p>
          <p className="mt-1 text-xs text-gray-500">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="min-h-11 self-start rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-500"
        >
          Sign out
        </button>
      </div>

      {actionError && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {actionError}
        </p>
      )}

      <div className="mt-6">
        {loading && <Loader />}
        {!loading && error && (
          <ErrorState
            message={`Failed to load tools: ${error}`}
            onRetry={refetch}
          />
        )}
        {!loading && !error && tools.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">
            No submissions to review.
          </p>
        )}
        {!loading && !error && tools.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 pl-3 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Category</th>
                  <th className="py-2 pr-4 font-medium">Link</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 pr-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.id} className="border-b border-gray-100">
                    <td className="max-w-xs break-words py-2 pl-3 pr-4 text-gray-900">
                      {tool.name}
                    </td>
                    <td className="max-w-xs break-words py-2 pr-4 text-gray-600">
                      {tool.category}
                    </td>
                    <td className="max-w-xs break-all py-2 pr-4 text-gray-600">
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-900"
                      >
                        {tool.link}
                      </a>
                    </td>
                    <td className="py-2 pr-4 text-gray-600">
                      {tool.is_approved ? "Published" : "Pending"}
                    </td>
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleApproval(tool.id, !tool.is_approved)
                          }
                          disabled={processingId === tool.id}
                          className="min-h-11 rounded-md border border-gray-300 px-3 text-xs text-gray-700 hover:border-green-500 hover:text-green-700 disabled:opacity-50"
                        >
                          {tool.is_approved ? "Unpublish" : "Approve"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(tool.id, tool.name)}
                          disabled={processingId === tool.id}
                          className="min-h-11 rounded-md border border-gray-300 px-3 text-xs text-gray-700 hover:border-red-400 hover:text-red-600 disabled:opacity-50"
                        >
                          {processingId === tool.id ? "Working..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
