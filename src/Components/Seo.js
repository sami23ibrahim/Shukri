import { Helmet } from "react-helmet-async";

const SITE_URL = "https://vivecura.com";
const DEFAULT_IMAGE = `${SITE_URL}/Assets/logo6.png`;
const SITE_NAME = "ViveCura";

function Seo({ title, description, path, image, type = "website" }) {
  const fullTitle = title
    ? `${title} – ${SITE_NAME}`
    : `${SITE_NAME} – Funktionelle Medizin, Prävention & Longevity in Berlin`;
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

export default Seo;
