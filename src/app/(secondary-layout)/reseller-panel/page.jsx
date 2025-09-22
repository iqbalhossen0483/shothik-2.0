import WaitlistForm from "../../../components/resellerPanel/WaitingForm";
import WaitingpageContainer from "../../../components/waitingPages/WaitingpageContainer";

export async function generateMetadata() {
  return {
    title: "Reseller Panel | Shothik AI",
    description: "This is our Reseller Panel page",
  };
}

export default function ResellerPanel() {
  return (
    <WaitingpageContainer title='Reseller Program'>
      <WaitlistForm userType='reseller' />
    </WaitingpageContainer>
  );
}
