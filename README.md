# Workplace Initiative Jamaica

Standalone site for the Jamaica Workplace Initiative and PodWash Jamaica partnership.

## Vercel environment variables

Set these in the Vercel project so the interest-list form can keep writing to the existing AFC Supabase leads table:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The build writes those public values into `static/config.js`.

## Deploy

Import this repository into Vercel and use the repository defaults. `vercel.json` runs `npm run build` and serves the `static` directory.


## SEO

The build generates:

- `robots.txt`
- `sitemap.xml`
- canonical URL
- Open Graph / Twitter metadata
- Organization structured data

For the final custom domain, set this Vercel environment variable:

- `SITE_URL=https://your-final-domain.example`

If `SITE_URL` is not set, the build falls back to Vercel's production URL. After the final domain is connected, set `SITE_URL` and redeploy before submitting the sitemap to Google Search Console.

Google Search Console sitemap URL:

- `https://your-final-domain.example/sitemap.xml`
