"use client";

import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <DsfrHeader
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
      serviceTitle="Impact Climat"
      serviceTagline="Projections climatiques pour la France"
      quickAccessItems={[
        {
          iconId: "fr-icon-account-circle-line",
          text: "Mon compte",
          linkProps: {
            href: "/compte",
          },
        },
        {
          iconId: "fr-icon-question-line",
          text: "Aide",
          linkProps: {
            href: "/accompagnement/guide",
          },
        },
      ]}
      navigation={[
        {
          text: "Accueil",
          linkProps: {
            href: "/",
          },
          isActive: pathname === "/",
        },
        {
          text: "Visualiser",
          linkProps: {
            href: "/visualiser",
          },
          isActive: pathname.startsWith("/visualiser"),
        },
        {
          text: "Données & Produits",
          linkProps: {
            href: "/donnees",
          },
          isActive: pathname.startsWith("/donnees"),
        },
        {
          text: "Accompagnement",
          menuLinks: [
            {
              text: "Guide d'utilisation",
              linkProps: {
                href: "/accompagnement/guide",
              },
            },
            {
              text: "Méthodologie",
              linkProps: {
                href: "/accompagnement/methodologie",
              },
            },
            {
              text: "Glossaire",
              linkProps: {
                href: "/accompagnement/glossaire",
              },
            },
            {
              text: "Bonnes pratiques",
              linkProps: {
                href: "/accompagnement/bonnes-pratiques",
              },
            },
          ],
        },
      ]}
    />
  );
}
