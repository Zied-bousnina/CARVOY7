"use client";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";

const PrivacyPolicy = () => {
  const [isDark] = useDarkMode();
  return (
    <>
      <div className="privacy-wrapper h-screen flex flex-col bg-white dark:bg-slate-800">
        <header className="py-4 px-6 bg-slate-100 dark:bg-slate-900 shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <img
                src={
                  isDark
                    ? "/assets/images/logo/logo-white.svg"
                    : "/assets/images/logo/logo.svg"
                }
                alt="CarVoy7"
                className="h-8"
              />
            </Link>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">
              Politique de Confidentialité
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Bienvenue sur la politique de confidentialité de CarVoy7. Cette
              page décrit comment nous collectons, utilisons et protégeons vos
              informations personnelles. En utilisant notre plateforme, vous
              acceptez les pratiques décrites dans cette politique.
            </p>

            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Introduction</h2>
              <p className="text-slate-600 dark:text-slate-400">
                CarVoy7 s'engage à protéger votre vie privée. Cette politique
                explique les types d'informations que nous collectons, comment
                elles sont utilisées et les mesures prises pour les protéger.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">
                Informations que nous collectons
              </h2>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400">
                <li>Nom et prénom</li>
                <li>Adresse e-mail</li>
                <li>Données de connexion et d'utilisation</li>
                <li>Informations liées à vos interactions avec nos services</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">
                Comment nous utilisons vos informations
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Nous utilisons vos données pour :
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-4">
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience</li>
                <li>Respecter les obligations légales</li>
                <li>Communiquer avec vous au sujet de nos services</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">
                Sécurité de vos données
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Nous prenons des mesures techniques et organisationnelles pour
                protéger vos données contre tout accès non autorisé, perte ou
                altération. Cependant, aucun système n'est entièrement sécurisé.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Vos droits</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Conformément aux lois applicables, vous avez le droit de :
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-4">
                <li>Accéder à vos données personnelles</li>
                <li>Corriger ou mettre à jour vos informations</li>
                <li>Demander la suppression de vos données</li>
                <li>Refuser certains types de traitement</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Contactez-nous</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Si vous avez des questions ou des préoccupations concernant
                cette politique, vous pouvez nous contacter à :
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                <a
                  href="mailto:support@carvoy7.com"
                  className="text-slate-900 dark:text-white font-medium underline"
                >
                  support@carvoy7.com
                </a>
              </p>
            </section>
          </div>
        </main>
        <footer className="py-4 bg-slate-100 dark:bg-slate-900 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Copyright {new Date().getFullYear()} © CarVoy7. Tous droits réservés.
          </p>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;
