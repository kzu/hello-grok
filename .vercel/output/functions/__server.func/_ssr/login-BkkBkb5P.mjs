import { g as require_jsx_runtime, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as signIn } from "./client-B0Lqc8Iq.mjs";
import { t as GROK_PROVIDERS } from "./providers-B-AR6wJz.mjs";
import { i as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BkkBkb5P.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-5 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "size-3.5",
					strokeWidth: 2,
					"aria-hidden": true
				}), "Back"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-6 sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-semibold tracking-tight",
						children: "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm text-muted",
						style: { lineHeight: 1.5 },
						children: "Continue to personalize your hello."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-2.5",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => signIn(p.providerId, { callbackURL: "/" }),
							className: "flex h-11 w-full items-center justify-center rounded-lg border border-border bg-bg px-4 text-sm font-medium text-fg transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							children: ["Continue with ", p.label]
						}, p.providerId))
					})
				]
			})]
		})
	});
}
//#endregion
export { Login as component };
