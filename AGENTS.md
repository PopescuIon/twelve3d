# Architecture rules
- Contact validation lives in a shared schema with regression tests so all contact forms enforce the same required fields and limits.
- Keep the unused legacy contact function disabled and never record contact details in logs; live forms use EmailJS until a validated server-side delivery service is configured.