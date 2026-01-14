import { Button } from "@codegouvfr/react-dsfr/Button";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="fr-container fr-my-4w">
      {/* Hero Section */}
      <section className="fr-py-6w">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
          <div className="fr-col-12 fr-col-md-7">
            <h1 className="fr-h1">
              Visualisez l&apos;impact du climat sur votre territoire
            </h1>
            <p className="fr-text--lead">
              Impact Climat vous permet d&apos;explorer les projections climatiques 
              et leurs conséquences sur la France : élévation du niveau de la mer, 
              risques d&apos;inondation, et évolution des températures à l&apos;horizon 2050-2100.
            </p>
            <div className="fr-btns-group fr-btns-group--inline-lg fr-mt-4w">
              <Button
                linkProps={{
                  href: "/decouverte",
                }}
                iconId="fr-icon-earth-line"
              >
                Découvrir la carte interactive
              </Button>
              <Button
                priority="secondary"
                linkProps={{
                  href: "/donnees",
                }}
                iconId="fr-icon-download-line"
              >
                Accéder aux données
              </Button>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-5">
            <div 
              style={{
                background: "linear-gradient(135deg, #313695 0%, #fee090 50%, #a50026 100%)",
                borderRadius: "12px",
                height: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              <div style={{ textAlign: "center", color: "white", padding: "16px" }}>
                <span className="fr-icon-temp-cold-line fr-icon--lg" aria-hidden="true" />
                <span className="fr-icon-arrow-right-line fr-mx-2w" aria-hidden="true" />
                <span className="fr-icon-sun-line fr-icon--lg" aria-hidden="true" />
                <p style={{ fontSize: "14px", marginTop: "12px", opacity: 0.9 }}>
                  Projections climatiques 2021-2100
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert/Callout */}
      <CallOut
        iconId="fr-icon-information-line"
        title="Données actualisées"
        className="fr-my-4w"
      >
        Impact Climat intègre les projections d&apos;élévation du niveau de la mer (BRGM), 
        les zones à risque d&apos;inondation (Géorisques) et prochainement les projections 
        de température et précipitations (CMIP6/Météo-France).
      </CallOut>

      {/* Three Spaces */}
      <section className="fr-py-4w">
        <h2 className="fr-h2 fr-mb-4w">Nos espaces thématiques</h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-4">
            <Card
              title="Visualiser"
              desc="Explorez visuellement les projections climatiques sur une carte interactive. Sélectionnez les scénarios, horizons temporels et indicateurs climatiques."
              enlargeLink
              linkProps={{
                href: "/decouverte",
              }}
              imageUrl="/images/card-decouverte.svg"
              imageAlt="Carte de France avec visualisation des températures"
              start={
                <ul className="fr-tags-group">
                  <li>
                    <span className="fr-tag fr-tag--sm">Carte interactive</span>
                  </li>
                  <li>
                    <span className="fr-tag fr-tag--sm">Visualisation</span>
                  </li>
                </ul>
              }
            />
          </div>
          <div className="fr-col-12 fr-col-md-4">
            <Card
              title="Données & Produits"
              desc="Téléchargez les données climatiques aux formats NetCDF, CSV ou GeoTIFF. Accédez aux API pour une intégration dans vos applications."
              enlargeLink
              linkProps={{
                href: "/donnees",
              }}
              imageUrl="/images/card-donnees.svg"
              imageAlt="Téléchargement de données"
              start={
                <ul className="fr-tags-group">
                  <li>
                    <span className="fr-tag fr-tag--sm">Téléchargement</span>
                  </li>
                  <li>
                    <span className="fr-tag fr-tag--sm">API</span>
                  </li>
                </ul>
              }
            />
          </div>
          <div className="fr-col-12 fr-col-md-4">
            <Card
              title="Accompagnement"
              desc="Guides d&apos;utilisation, méthodologie scientifique, glossaire et bonnes pratiques pour interpréter et utiliser les projections climatiques."
              enlargeLink
              linkProps={{
                href: "/accompagnement",
              }}
              imageUrl="/images/card-accompagnement.svg"
              imageAlt="Documentation et guides"
              start={
                <ul className="fr-tags-group">
                  <li>
                    <span className="fr-tag fr-tag--sm">Documentation</span>
                  </li>
                  <li>
                    <span className="fr-tag fr-tag--sm">Formation</span>
                  </li>
                </ul>
              }
            />
          </div>
        </div>
      </section>

      {/* Climate Scenarios Overview */}
      <section className="fr-py-4w">
        <h2 className="fr-h2 fr-mb-3w">Les scénarios climatiques</h2>
        <p className="fr-text--lg fr-mb-4w">
          Les projections sont disponibles selon trois scénarios d&apos;émissions de gaz à effet 
          de serre (RCP), représentant différentes trajectoires possibles d&apos;évolution du climat.
        </p>
        
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-4">
            <div 
              className="fr-p-3w" 
              style={{ 
                background: "#f6f6f6",
                borderLeft: "4px solid #2166ac",
                borderRadius: "4px",
              }}
            >
              <h3 className="fr-h5" style={{ color: "#2166ac" }}>RCP 2.6</h3>
              <p className="fr-text--sm">
                Scénario d&apos;atténuation forte avec un réchauffement limité à +2°C 
                d&apos;ici 2100 par rapport à l&apos;ère préindustrielle.
              </p>
              <p className="fr-text--xs fr-mt-2w" style={{ color: "#666" }}>
                Réchauffement : +1.0°C à +2.4°C
              </p>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-4">
            <div 
              className="fr-p-3w" 
              style={{ 
                background: "#f6f6f6",
                borderLeft: "4px solid #fdae61",
                borderRadius: "4px",
              }}
            >
              <h3 className="fr-h5" style={{ color: "#e67e00" }}>RCP 4.5</h3>
              <p className="fr-text--sm">
                Scénario intermédiaire avec stabilisation des émissions 
                après 2050 grâce à des politiques climatiques modérées.
              </p>
              <p className="fr-text--xs fr-mt-2w" style={{ color: "#666" }}>
                Réchauffement : +1.7°C à +3.2°C
              </p>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-4">
            <div 
              className="fr-p-3w" 
              style={{ 
                background: "#f6f6f6",
                borderLeft: "4px solid #d73027",
                borderRadius: "4px",
              }}
            >
              <h3 className="fr-h5" style={{ color: "#d73027" }}>RCP 8.5</h3>
              <p className="fr-text--sm">
                Scénario sans politique climatique avec des émissions 
                continuant à augmenter jusqu&apos;à la fin du siècle.
              </p>
              <p className="fr-text--xs fr-mt-2w" style={{ color: "#666" }}>
                Réchauffement : +3.2°C à +5.4°C
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="fr-py-4w fr-mt-4w" style={{ borderTop: "1px solid #e5e5e5" }}>
        <h2 className="fr-h4 fr-mb-3w">Un service proposé par</h2>
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
          <div className="fr-col-6 fr-col-md-3" style={{ textAlign: "center" }}>
            <Image src="/logos/meteo-france.svg" alt="Météo-France" width={140} height={50} style={{ maxWidth: "100%", height: "auto" }} />
          </div>
          <div className="fr-col-6 fr-col-md-3" style={{ textAlign: "center" }}>
            <Image src="/logos/ipsl.svg" alt="IPSL" width={120} height={50} style={{ maxWidth: "100%", height: "auto" }} />
          </div>
          <div className="fr-col-6 fr-col-md-3" style={{ textAlign: "center" }}>
            <Image src="/logos/cerfacs.svg" alt="CERFACS" width={140} height={50} style={{ maxWidth: "100%", height: "auto" }} />
          </div>
          <div className="fr-col-6 fr-col-md-3" style={{ textAlign: "center" }}>
            <Image src="/logos/mte.svg" alt="Ministère de la Transition Écologique" width={160} height={60} style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
