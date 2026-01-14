"use client";

import { Footer as DsfrFooter } from "@codegouvfr/react-dsfr/Footer";

export function Footer() {
  return (
    <DsfrFooter
      brandTop={
        <>
          RÉPUBLIQUE
          <br />
          FRANÇAISE
        </>
      }
      homeLinkProps={{
        href: "/",
        title: "Accueil - Impact Climat",
      }}
      accessibility="partially compliant"
      accessibilityLinkProps={{
        href: "/accessibilite",
      }}
      contentDescription={
        <>
          Impact Climat est le portail français de référence pour visualiser les projections 
          climatiques et leurs impacts sur le territoire. Anticipez les effets du changement 
          climatique pour mieux vous adapter.
          <br />
          <br />
          Données issues de Météo-France, BRGM, Géorisques et Copernicus.
        </>
      }
      partnersLogos={{
        main: {
          alt: "Météo-France",
          imgUrl: "/logos/meteo-france.svg",
          linkProps: {
            href: "https://meteofrance.com",
            title: "Météo-France",
          },
        },
        sub: [
          {
            alt: "IPSL",
            imgUrl: "/logos/ipsl.svg",
            linkProps: {
              href: "https://www.ipsl.fr",
              title: "IPSL",
            },
          },
          {
            alt: "CERFACS",
            imgUrl: "/logos/cerfacs.svg",
            linkProps: {
              href: "https://cerfacs.fr",
              title: "CERFACS",
            },
          },
          {
            alt: "Ministère de la Transition Écologique",
            imgUrl: "/logos/mte.svg",
            linkProps: {
              href: "https://www.ecologie.gouv.fr",
              title: "Ministère de la Transition Écologique",
            },
          },
        ],
      }}
      bottomItems={[
        {
          text: "Plan du site",
          linkProps: {
            href: "/plan-du-site",
          },
        },
        {
          text: "Mentions légales",
          linkProps: {
            href: "/mentions-legales",
          },
        },
        {
          text: "Données personnelles",
          linkProps: {
            href: "/donnees-personnelles",
          },
        },
        {
          text: "Gestion des cookies",
          linkProps: {
            href: "/cookies",
          },
        },
      ]}
      termsLinkProps={{
        href: "/mentions-legales",
      }}
    />
  );
}
