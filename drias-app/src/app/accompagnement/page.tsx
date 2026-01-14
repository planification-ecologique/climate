import { Card } from "@codegouvfr/react-dsfr/Card";

export default function AccompagnementPage() {
  return (
    <div className="fr-container fr-my-4w">
      <nav role="navigation" className="fr-breadcrumb" aria-label="vous êtes ici :">
        <ol className="fr-breadcrumb__list">
          <li>
            <a className="fr-breadcrumb__link" href="/">Accueil</a>
          </li>
          <li>
            <a className="fr-breadcrumb__link" aria-current="page">Accompagnement</a>
          </li>
        </ol>
      </nav>

      <h1 className="fr-h1 fr-mt-4w">Accompagnement</h1>
      <p className="fr-text--lead fr-mb-4w">
        Ressources et documentation pour comprendre et utiliser les projections 
        climatiques dans vos projets d&apos;adaptation.
      </p>

      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <Card
            title="Guide d'utilisation"
            desc="Apprenez à naviguer dans Impact Climat et à exploiter les différentes fonctionnalités de visualisation et de téléchargement."
            enlargeLink
            linkProps={{
              href: "/accompagnement/guide",
            }}
            imageUrl=""
            imageAlt=""
          />
        </div>
        <div className="fr-col-12 fr-col-md-6">
          <Card
            title="Méthodologie"
            desc="Découvrez les modèles climatiques utilisés, les méthodes de régionalisation et les incertitudes associées aux projections."
            enlargeLink
            linkProps={{
              href: "/accompagnement/methodologie",
            }}
            imageUrl=""
            imageAlt=""
          />
        </div>
        <div className="fr-col-12 fr-col-md-6">
          <Card
            title="Glossaire"
            desc="Définitions des termes techniques utilisés dans le domaine des projections climatiques et de l'adaptation."
            enlargeLink
            linkProps={{
              href: "/accompagnement/glossaire",
            }}
            imageUrl=""
            imageAlt=""
          />
        </div>
        <div className="fr-col-12 fr-col-md-6">
          <Card
            title="Bonnes pratiques"
            desc="Recommandations pour l'utilisation des projections climatiques dans les études d'impact et les plans d'adaptation."
            enlargeLink
            linkProps={{
              href: "/accompagnement/bonnes-pratiques",
            }}
            imageUrl=""
            imageAlt=""
          />
        </div>
      </div>

      <section className="fr-mt-6w">
        <h2 className="fr-h2">Questions fréquentes</h2>
        
        <div className="fr-accordions-group fr-mt-3w">
          <section className="fr-accordion">
            <h3 className="fr-accordion__title">
              <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-1">
                Quelle est la différence entre RCP et SSP ?
              </button>
            </h3>
            <div className="fr-collapse" id="accordion-1">
              <p>
                Les RCP (Representative Concentration Pathways) décrivent des trajectoires 
                de concentrations de gaz à effet de serre, tandis que les SSP 
                (Shared Socioeconomic Pathways) combinent ces trajectoires avec des 
                scénarios socio-économiques. Les deux approches sont complémentaires et 
                utilisées dans les rapports du GIEC.
              </p>
            </div>
          </section>

          <section className="fr-accordion">
            <h3 className="fr-accordion__title">
              <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-2">
                Quelle résolution spatiale ont les données ?
              </button>
            </h3>
            <div className="fr-collapse" id="accordion-2">
              <p>
                Les projections climatiques sont disponibles à une résolution de 8 km sur la 
                France métropolitaine, obtenue par descente d&apos;échelle statistique des 
                modèles climatiques globaux (résolution d&apos;environ 100 km).
              </p>
            </div>
          </section>

          <section className="fr-accordion">
            <h3 className="fr-accordion__title">
              <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-3">
                Comment interpréter les incertitudes ?
              </button>
            </h3>
            <div className="fr-collapse" id="accordion-3">
              <p>
                Les projections climatiques comportent plusieurs sources d&apos;incertitude : 
                le scénario d&apos;émissions choisi, la réponse des modèles climatiques, et 
                la variabilité naturelle du climat. Impact Climat fournit des ensembles de 
                simulations permettant d&apos;évaluer cette incertitude.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
