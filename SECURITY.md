# ZV1 Website Security Standard

**Version:** 1.0
**Status:** Mandatory
**Applies to:** All ZV1 websites, applications, landing pages, content sites, internal tools, and production deployments.

---

## 1. Core Security Principle

Every ZV1 website must be designed under the assumption that it will eventually be:

- crawled by bots,
- scanned for vulnerabilities,
- submitted malicious input,
- probed for hidden routes,
- tested for exposed credentials,
- hit with automated spam,
- and accessed in ways the developer did not intend.

Security is part of the architecture, not a final feature added before launch.

The preferred ZV1 architecture is:

> Static wherever possible. Dynamic only where necessary. Private operations stay server-side. Every input is untrusted. Every privilege must be explicitly authorized.

Never weaken a security control merely to make an error, warning, build failure, or Claude Code permission request disappear.

## 2. Minimize the Attack Surface

Prefer the simplest architecture capable of accomplishing the site's purpose.

For informational, SEO, educational, and marketing websites:

- Prefer static generation.
- Avoid databases unless genuinely required.
- Avoid user accounts unless genuinely required.
- Avoid public admin systems unless genuinely required.
- Avoid unnecessary APIs.
- Avoid unnecessary third-party JavaScript.
- Avoid unnecessary npm packages.
- Avoid unnecessary server-side functionality.

Every additional service, dependency, API, login system, database, plugin, script, and integration creates another potential security boundary.

Do not add infrastructure simply because it is convenient.

## 3. Secrets Are Never Public

Never hardcode:

- API keys
- passwords
- database credentials
- access tokens
- private keys
- authentication secrets
- SMTP credentials
- service-role keys
- Cloudflare credentials
- AWS credentials
- GitHub tokens
- payment credentials
- webhook secrets

Secrets belong in protected environment variables or an appropriate secrets-management system.

Private `.env` files must not be committed to Git.
`.gitignore` must cover sensitive environment files.
Example environment files must contain placeholders only.

### NEXT_PUBLIC Rule

Anything exposed through a variable such as `NEXT_PUBLIC_*` must be treated as completely public.

Never place private credentials in a client-exposed environment variable.

### Browser Rule

If information reaches the browser, assume anyone can read it.

There is no such thing as a secret hidden inside frontend JavaScript.

## 4. If a Secret Is Exposed, Rotate It

Removing an exposed credential from the current source code is not sufficient.

If a real credential has ever been:

- committed to Git,
- pushed to GitHub,
- exposed in client JavaScript,
- printed into logs,
- published in HTML,
- included in a public build,
- or otherwise made public,

assume the credential has been compromised.

The credential must be revoked or rotated.

Never print discovered secrets into Claude Code's security report.
Identify the affected service without reproducing the credential.

## 5. Server-Side Security Is Mandatory

Client-side security is not security.

Never rely exclusively on:

- hidden buttons,
- hidden navigation,
- React state,
- JavaScript validation,
- disabled form controls,
- obscure URLs,
- client-side redirects,
- frontend authentication checks.

Authorization must be enforced server-side.

If a user should not be able to perform an action, the server must reject the action.

## 6. Every Input Is Untrusted

Treat all external input as hostile until validated.

This includes:

- forms
- URLs
- query parameters
- route parameters
- cookies
- headers
- JSON
- API requests
- uploaded files
- Markdown
- CMS content
- database content originating from users
- webhook payloads

Validate data server-side.

Where appropriate validate:

- type
- format
- allowed values
- minimum length
- maximum length
- payload size
- authentication
- authorization

Reject invalid input.

Do not attempt to intelligently "fix" malicious or malformed requests.

## 7. Protect Against Injection

All ZV1 applications must be reviewed for:

- Cross-Site Scripting (XSS)
- SQL injection
- NoSQL injection
- command injection
- HTML injection
- template injection
- path traversal
- Server-Side Request Forgery (SSRF)
- open redirects

Never construct database queries directly from untrusted input.

Use:

- parameterized queries,
- reputable ORMs,
- validated structured inputs,
- safe framework APIs.

Never pass raw user input directly into operating-system commands.

## 8. Raw HTML Requires Special Review

Search the application for `dangerouslySetInnerHTML` and equivalent raw HTML rendering.

Every use must have a legitimate reason.

Untrusted HTML must be sanitized using an appropriate maintained library.

CMS content must not automatically be considered trusted.

Markdown renderers and rich-text systems must also be reviewed for unsafe HTML behavior.

Framework escaping should remain enabled whenever possible.

## 9. Authentication Is Not Authorization

Authentication answers: **Who is this person?**
Authorization answers: **Is this person allowed to perform this specific action?**

Both must exist where required.

Every protected operation must independently verify authorization.

This includes:

- pages
- APIs
- server actions
- database operations
- file access
- administrative functions
- update operations
- delete operations

Never assume that because someone can access an application they should have access to every object within it.

## 10. Prevent IDOR

Any application containing user-specific or organization-specific data must be checked for Insecure Direct Object Reference vulnerabilities.

A user must not be able to change `/account/123` to `/account/124` and access another user's information.

The same rule applies to:

- API IDs
- database IDs
- file IDs
- invoice IDs
- document IDs
- organization IDs
- URL parameters

Authorization must be verified against the requested resource.

## 11. API Security

Every API endpoint, route handler, server action, and webhook must be intentionally reviewed.

Verify:

- authentication
- authorization
- input validation
- allowed HTTP methods
- request size limits
- rate limits where appropriate
- safe error responses
- origin requirements
- CSRF considerations
- webhook signatures where applicable

Do not expose unnecessary APIs.

Remove abandoned and experimental endpoints before deployment.

## 12. Forms Must Be Abuse Resistant

Public forms must include appropriate:

- server-side validation
- field-length limits
- payload limits
- rate limiting
- spam controls

Depending on risk, use:

- honeypots,
- Cloudflare Turnstile,
- CAPTCHA,
- IP-based throttling,
- behavioral controls.

Forms must never become an open email relay.

Email/API provider credentials must remain server-side.

## 13. Security Headers

Production sites should implement appropriate security headers.

Review:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- CSP `frame-ancestors`

Configure them intentionally rather than copying a generic configuration blindly.

### Content Security Policy

CSP should be as restrictive as practical.

Avoid broad rules such as `default-src *`.
Avoid `unsafe-eval`.
Avoid `unsafe-inline` wherever the application's architecture reasonably permits.

Only allow third-party domains actually required by the site.

## 14. HTTPS Everywhere

Production traffic must use HTTPS.

HTTP should redirect to HTTPS.

Never transmit:

- passwords
- session identifiers
- sensitive form information
- authentication tokens
- private information

over unencrypted HTTP.

Enable HSTS where appropriate.

## 15. Cookies and Sessions

Authentication/session cookies should use appropriate:

- `Secure`
- `HttpOnly`
- `SameSite`
- expiration
- domain
- path

settings.

Session identifiers must be unpredictable.

Logout should invalidate sessions appropriately.

Do not place sensitive authentication credentials in browser-accessible storage when secure server-managed cookies are appropriate.

## 16. CSRF

Authenticated state-changing operations must be reviewed for Cross-Site Request Forgery.

Use framework-supported protections where available.

Use appropriate:

- SameSite cookie settings,
- CSRF tokens,
- origin validation,

depending on the application's architecture.

## 17. CORS

CORS must follow least privilege.

Do not use `Access-Control-Allow-Origin: *` for private or authenticated APIs.

Only permit origins genuinely required by the application.

Never combine credentials with dangerously permissive origin policies.

## 18. Rate Limiting

Rate-limit abuse-sensitive endpoints where appropriate.

Priority endpoints include:

- login
- signup
- password reset
- contact forms
- lead forms
- search
- AI endpoints
- expensive APIs
- SMS endpoints
- email endpoints

Rate limiting must be enforced server-side or at the infrastructure/CDN layer.

## 19. Database Security

Databases must not be publicly exposed unnecessarily.

Private database credentials remain server-side.

Use least-privilege database accounts.

Avoid giving an application broader database permissions than it requires.

Database operations must be protected against injection.

### Supabase

When Supabase is used:

- Review Row Level Security.
- Verify policies manually.
- Test unauthorized access.
- Protect service-role keys.
- Never expose the service-role key to the browser.

The existence of Supabase does not mean the database is automatically secure.

## 20. File Uploads

If the application accepts files, enforce:

- authentication where required
- authorization where required
- file-size limits
- allowed file types
- extension validation
- MIME validation
- randomized storage names
- safe storage paths
- path traversal protection

Never trust the filename supplied by the browser.

Never allow arbitrary executable uploads.

## 21. Third-Party JavaScript

Every external script is part of the site's security surface.

Maintain an inventory of:

- analytics
- tag managers
- chat widgets
- advertising scripts
- embeds
- tracking scripts
- CDN scripts

Remove scripts that are no longer necessary.

Do not add third-party JavaScript casually.

## 22. Dependencies

Dependencies must be treated as executable third-party code.

Before adding a package, ask: **Do we actually need this dependency?**

Prefer established, maintained packages.

Regularly review:

- dependency vulnerabilities
- abandoned packages
- unused packages
- duplicate packages
- unnecessary dependencies

Use lockfiles.

Do not blindly upgrade major versions during a security audit.
Breaking upgrades should be reviewed separately.

## 23. GitHub Security

Production repositories should use available GitHub security features where appropriate:

- Dependabot alerts
- Dependabot security updates
- secret scanning
- push protection
- dependency review
- protected branches

GitHub Actions should receive the minimum permissions necessary.

Secrets must never be printed into CI/CD logs.

## 24. Production Error Handling

Users should receive useful but generic production errors.

Never expose:

- stack traces
- environment variables
- server filesystem paths
- database credentials
- SQL details
- API credentials
- authentication secrets
- internal infrastructure information

Detailed debugging information belongs in protected logs.

Logs themselves must not contain secrets.

## 25. Remove Development Infrastructure

Before production deployment search for:

- `/debug`
- `/dev`
- `/test`
- `/api/debug`
- `/api/test`
- temporary admin routes
- development authentication bypasses
- mock APIs
- test credentials
- staging credentials
- development banners
- console debugging
- abandoned preview functionality

Anything unnecessary should be removed.

Anything necessary must be properly protected.

## 26. Next.js Standard

For Next.js applications:

Disable unnecessary framework disclosure:

```js
poweredByHeader: false
```

Keep sensitive code in server-only contexts.

Never expose private environment variables through client components.

Review:

- middleware
- route handlers
- server actions
- API routes
- redirects
- rewrites
- image configuration
- remote image domains
- CSP
- caching behavior

Security controls must work in the deployed environment, not merely during local development.

## 27. Cloudflare Standard

When Cloudflare is used, review appropriate:

- HTTPS enforcement
- TLS settings
- DNS configuration
- WAF protections
- bot protections
- rate limiting
- caching
- security rules

Cloudflare supplements application security.
It does not replace secure application code.

Never assume that because Cloudflare sits in front of the site the application itself can be insecure.

## 28. Claude Code Security

Claude Code must follow this security standard.

Claude must never:

- hardcode credentials,
- expose secrets to the browser,
- disable authentication to solve a bug,
- disable authorization to solve a bug,
- weaken CORS simply to eliminate an error,
- disable CSP simply to make a script work,
- expose a database directly merely for convenience,
- turn off certificate verification,
- bypass input validation,
- add unnecessary dependencies,
- or weaken security controls simply to complete a task.

### Claude Code Hooks

Treat hooks as privileged code.

Do not create hooks that execute arbitrary untrusted input.

Review `.claude` and project-level Claude configuration.

Use least privilege.

Use sandboxing for risky shell operations where appropriate.

## 29. SEO Must Not Override Security

Security changes should preserve legitimate:

- indexing
- metadata
- canonical URLs
- structured data
- redirects
- internal links
- sitemaps
- robots directives
- analytics

However: SEO convenience never justifies exposing private information or weakening application security.

## 30. Sensitive Industries

Sites involving healthcare, behavioral health, legal services, financial information, or other sensitive industries require additional scrutiny.

Do not collect sensitive information unless there is a legitimate business requirement and the infrastructure is appropriate for storing and processing it.

For healthcare-related informational sites, prefer collecting the minimum information necessary.

Never assume a normal contact form, analytics service, database, or CRM is appropriate for protected or regulated information.

## 31. Security Review Before Every Production Launch

Before deploying a new ZV1 website, Claude Code must perform a final security audit.

The audit must include:

1. Secrets scan
2. Client/server boundary review
3. Authentication review
4. Authorization review
5. API review
6. Input validation review
7. XSS review
8. Injection review
9. Dependency audit
10. Security header review
11. CSP review
12. CORS review
13. CSRF review
14. Rate-limit review
15. Form abuse review
16. Database security review
17. Third-party script review
18. Production error review
19. Development-route review
20. Production build

Run:

- linting,
- type checking,
- tests,
- and production build

where configured.

A security audit is not complete if the production build fails.

## 32. Security Changes Must Be Verified

Claude must never report "Fixed." without verifying the change where practical.

After security modifications:

- run the relevant test,
- run linting,
- run type checking,
- run the production build,
- inspect affected routes,
- and confirm expected behavior remains intact.

Do not confuse code changes with successful remediation.

## 33. Never Hide Security Failures

Claude must not suppress:

- vulnerability warnings
- dependency warnings
- security errors
- TypeScript errors
- build errors

merely to obtain a successful build.

Fix the underlying problem.

If the problem cannot safely be fixed automatically, stop and report it.

## 34. ZV1 Severity Levels

Every security audit must classify findings.

**CRITICAL** — Immediate compromise, unauthorized access, credential exposure, remote execution, major sensitive-data exposure, or similarly severe risk. Production deployment is prohibited.

**HIGH** — Meaningful vulnerability that could realistically be exploited. Resolve before production deployment.

**MEDIUM** — Security weakness or defense-in-depth problem that should be addressed.

**LOW** — Minor hardening opportunity.

## 35. Deployment Decision

Every final security audit must end with exactly one deployment classification:

**DO NOT DEPLOY** — Critical or significant high-risk vulnerabilities remain.

**DEPLOY AFTER MANUAL ACTIONS** — Application code is reasonably hardened but external actions are still required. Examples:

- rotate credentials,
- configure Cloudflare,
- change database permissions,
- enable GitHub security,
- configure DNS,
- enable MFA.

**READY FOR PRODUCTION** — No known Critical or High security issues remain following the completed review.

"Ready for Production" does not mean the application can never be compromised.
It means the required security review was completed and no known deployment-blocking vulnerability remains.

## 36. Final ZV1 Rule

When choosing between convenience and unnecessary exposure, choose the smaller attack surface.

When choosing between client-side and server-side enforcement, choose server-side.

When choosing between collecting more information and collecting less, collect less.

When choosing between adding another dependency and using existing secure functionality, avoid the dependency.

When something appears secure only because nobody knows the URL, it is not secure.

When a credential reaches the browser, it is public.

When authorization exists only in the interface, it does not exist.

When a security control causes a problem, fix the implementation — do not simply remove the control.

**Build simple. Expose little. Validate everything. Grant the minimum access necessary. Verify before deployment.**
