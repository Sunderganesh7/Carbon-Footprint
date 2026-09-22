export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white" role="contentinfo">
      <div className="mx-auto max-w-[1600px] px-6 py-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <svg
              className="h-5 w-5 text-emerald-500"
              viewBox="0 0 100 100"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M50 30 C40 30 35 45 35 50 C35 60 40 70 50 70 C60 70 65 60 65 50 C65 45 60 30 50 30Z" />
            </svg>
            <span>CarbonWise AI &mdash; Making sustainability personal</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a
              href="#"
              className="transition-colors hover:text-emerald-500"
              aria-label="Privacy Policy"
            >
              Privacy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-emerald-500"
              aria-label="Terms of Service"
            >
              Terms
            </a>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
