import { memo } from "react";
import TextButton from "../buttons/TextButton";
import { getCurrentYear } from "../../utils/date";
import Text from "../text";

const Footer = memo(() => {
  return (
    <div className="px-6 py-2 flex justify-between items-center sm:flex-row flex-col-reverse gap-4 sm:gap-0 w-full border-t-[0.5px] border-border-light">
      <Text>Copyright © {getCurrentYear()} justblank</Text>
      <div className="flex gap-4 flex-wrap justify-center">
        <TextButton>Contact Us</TextButton>
        <TextButton>Terms of Service</TextButton>
        <TextButton>Privacy Policy</TextButton>
        <TextButton>Refund Policy</TextButton>
        <TextButton>Shipping Policy</TextButton>
      </div>
    </div>
  );
});

export default Footer;
