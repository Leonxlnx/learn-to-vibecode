import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    type?: string;
}

const SEO = ({
    title = 'Learn2Vibecode - Master AI-Assisted Development',
    description = 'Learn vibecoding - the future of software development with AI. Free courses on AI Studio, prompt engineering, and building with AI assistants.',
    canonical = 'https://learn2vibecode.vercel.app',
    image = 'https://learn2vibecode.vercel.app/images/og-image.png',
    type = 'website'
}: SEOProps) => {
    const fullTitle = title.includes('Learn2Vibecode') ? title : `${title} | Learn2Vibecode`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Learn2Vibecode" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#0a0a0a" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Structured Data - Organization */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "EducationalOrganization",
                    "name": "Learn2Vibecode",
                    "url": "https://learn2vibecode.vercel.app",
                    "description": "Learn vibecoding - AI-assisted development education platform",
                    "sameAs": [
                        "https://discord.gg/xrCufejEa3",
                        "https://twitter.com/learn2vibecode"
                    ]
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
