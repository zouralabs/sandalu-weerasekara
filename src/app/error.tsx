"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page empty-state">
      <h1>We couldn’t load this page.</h1>
      <p>Please try again.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
