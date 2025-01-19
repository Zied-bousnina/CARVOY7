"use client";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import Card from "@/components/ui/Card";
import TermsComponent from "@/components/partials/devis/TermsComponent";
import BillingForm from "@/components/partials/BillingForm/BillingForm";
import StripeContainer from "@/components/partials/payment/StripeContainer";

const Devis = ({params}) => {
  const { id } = params;
  const [isDark] = useDarkMode();
  return (
    <div className="min-h-screen flex justify-center  space-x-4">
     <Card
     className="custom-class  bg-white w-1/2"
      title={  "Conditions particulières" }
      headerslot={false}>
      <TermsComponent/>



      </Card>
      <Card
      className="custom-class  bg-white w-1/2"
      title={  "Facturation et commentaire" }
      headerslot={false}>

<BillingForm missionId={id}  />
<StripeContainer
id={id}
 />

      </Card>
    </div>
  );
};

export default Devis;
