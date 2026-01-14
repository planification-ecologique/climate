import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import { Button } from "@codegouvfr/react-dsfr/Button";

export default function DonneesPage() {
  return (
    <div className="fr-container fr-my-4w">
      <nav role="navigation" className="fr-breadcrumb" aria-label="vous êtes ici :">
        <ol className="fr-breadcrumb__list">
          <li>
            <a className="fr-breadcrumb__link" href="/">Accueil</a>
          </li>
          <li>
            <a className="fr-breadcrumb__link" aria-current="page">Données & Produits</a>
          </li>
        </ol>
      </nav>

      <h1 className="fr-h1 fr-mt-4w">Données & Produits</h1>
      <p className="fr-text--lead fr-mb-4w">
        Téléchargez les projections climatiques aux formats de votre choix 
        ou accédez aux données via notre API STAC.
      </p>

      <CallOut
        iconId="fr-icon-road-map-line"
        title="En cours de développement"
      >
        L&apos;espace de téléchargement des données sera bientôt disponible. 
        En attendant, vous pouvez explorer les données via l&apos;espace Visualiser.
      </CallOut>

      <div className="fr-mt-4w">
        <Button
          linkProps={{
            href: "/visualiser",
          }}
          iconId="fr-icon-earth-line"
        >
          Explorer les données sur la carte
        </Button>
      </div>

      <section className="fr-mt-6w">
        <h2 className="fr-h2">Formats disponibles</h2>
        <div className="fr-grid-row fr-grid-row--gutters fr-mt-3w">
          <div className="fr-col-12 fr-col-md-4">
            <div className="fr-tile">
              <div className="fr-tile__body">
                <h3 className="fr-tile__title">NetCDF</h3>
                <p className="fr-tile__desc">
                  Format standard pour les données climatiques multidimensionnelles.
                  Idéal pour les analyses scientifiques.
                </p>
              </div>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-4">
            <div className="fr-tile">
              <div className="fr-tile__body">
                <h3 className="fr-tile__title">CSV</h3>
                <p className="fr-tile__desc">
                  Séries temporelles pour un point ou une région.
                  Compatible avec tous les tableurs.
                </p>
              </div>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-4">
            <div className="fr-tile">
              <div className="fr-tile__body">
                <h3 className="fr-tile__title">GeoTIFF</h3>
                <p className="fr-tile__desc">
                  Données géoréférencées pour intégration SIG.
                  Compatible avec QGIS, ArcGIS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fr-mt-6w">
        <h2 className="fr-h2">Accès API</h2>
        <p className="fr-text">
          Les données sont accessibles via une API compatible STAC 
          (SpatioTemporal Asset Catalog) pour une intégration programmatique.
        </p>
        <pre className="fr-mt-2w" style={{ 
          background: "var(--background-alt-grey)", 
          padding: "1rem", 
          borderRadius: "4px",
          overflow: "auto"
        }}>
          <code>{`# Exemple d'accès à l'API STAC
curl https://api.impact-climat.fr/stac/collections

# Recherche de données
curl -X POST https://api.impact-climat.fr/stac/search \\
  -H "Content-Type: application/json" \\
  -d '{"collections": ["temperature"], "bbox": [-5, 41, 10, 51]}'`}</code>
        </pre>
      </section>
    </div>
  );
}
