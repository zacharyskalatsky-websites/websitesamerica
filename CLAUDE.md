# Mandatory Security Standard

This repository follows the ZV1 Website Security Standard defined in `SECURITY.md`.

Read `SECURITY.md` before making architectural, backend, authentication, API, database, form, dependency, deployment, or infrastructure changes.

Security requirements are mandatory.

## While Coding

Always:

- Keep secrets server-side.
- Treat browser-visible information as public.
- Validate untrusted input server-side.
- Enforce authorization server-side.
- Use least privilege.
- Minimize dependencies.
- Minimize the public attack surface.
- Protect public forms against abuse.
- Use safe database queries.
- Sanitize untrusted HTML.
- Protect sensitive endpoints.
- Preserve appropriate security headers.
- Keep production errors free of sensitive information.

Never weaken a security control merely to make code work.

Never disable authentication, authorization, validation, CSP, TLS verification, CORS protections, or another security mechanism simply to resolve an implementation problem.

If the correct solution requires a manual action from the owner, stop and clearly identify that action.

## Before Production

Before declaring this project production-ready:

1. Read the complete `SECURITY.md`.
2. Audit the repository against it.
3. Fix safely remediable findings.
4. Run dependency/security checks.
5. Run linting.
6. Run type checking.
7. Run tests where configured.
8. Run the production build.
9. Verify security changes did not break core functionality or SEO.
10. Report remaining risks.

Finish the review with exactly one classification:

- **DO NOT DEPLOY**
- **DEPLOY AFTER MANUAL ACTIONS**
- **READY FOR PRODUCTION**

Never claim a security issue is fixed without verifying the remediation where practical.
