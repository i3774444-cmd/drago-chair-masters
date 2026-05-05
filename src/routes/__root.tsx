import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

import appCss from "../styles.css?url";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://drago.by/#business",
  name: "DRAGO",
  description: "Ремонт и перетяжка офисных и компьютерных кресел в Минске.",
  url: "https://drago.by",
  telephone: "+375291234567",
  email: "hello@drago.by",
  image: "https://drago.by/og-image.jpg",
  priceRange: "BYN 15–320",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Притыцкого, 62, цех 4",
    addressLocality: "Минск",
    addressCountry: "BY",
  },
  geo: { "@type": "GeoCoordinates", latitude: 53.9023, longitude: 27.4489 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ],
  sameAs: ["https://t.me/drago_minsk"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87" },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DRAGO — ремонт и перетяжка кресел в Минске" },
      { name: "description", content: "DRAGO: ремонт и перетяжка офисных и компьютерных кресел в Минске с 2013 года." },
      { name: "author", content: "DRAGO" },
      { property: "og:title", content: "DRAGO — ремонт и перетяжка кресел в Минске" },
      { property: "og:description", content: "DRAGO: ремонт и перетяжка офисных и компьютерных кресел в Минске с 2013 года." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "theme-color", content: "#ff6b35" },
      { name: "twitter:title", content: "DRAGO — ремонт и перетяжка кресел в Минске" },
      { name: "twitter:description", content: "DRAGO: ремонт и перетяжка офисных и компьютерных кресел в Минске с 2013 года." },
    { property: "og:image", content: "https://drago.by/og-image.jpg" },
      { name: "twitter:image", content: "https://drago.by/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusinessSchema) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <StickyMobileCTA />
      <Toaster />
    </>
  );
}
