import WaitlistForm from "../../../components/resellerPanel/WaitingForm";
import WaitingpageContainer from "../../../components/waitingPages/WaitingpageContainer";

export async function generateMetadata() {
  return {
    title: "Affiliate Marketing | Shothik AI",
    description: "This is our Affiliate Marketing page",
  };
}

export default function AffiliateMarketing() {
  return (
    <WaitingpageContainer title='Affiliate Program'>
      <WaitlistForm userType='affiliate' />
    </WaitingpageContainer>
  );
}
