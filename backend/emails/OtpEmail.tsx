import {
    Html,
    Head,
    Body,
    Container,
    Text,
    Section,
    Button,
    Tailwind,
    Hr,
    Img
  } from '@react-email/components';
  
  interface OtpEmailProps {
    userEmail: string;
    otpCode: string;
  }
  
  export const OtpEmail = ({ userEmail, otpCode }: OtpEmailProps) => {
    return (
      <Html>
        <Head />
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
              <Section className="mt-[20px] text-center">
                {/* Optional: Add a logo for professionalism */}
                {/* <Img
                  src="https://yourdomain.com/logo.png" // Replace with your logo URL
                  width="80"
                  height="80"
                  alt="Inventory Insights Logo"
                  className="my-0 mx-auto"
                /> */}
                <Text className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                  Inventory Insights
                </Text>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                Hello <strong className="font-semibold">{userEmail}</strong>,
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Thank you for trying out Inventory Insights.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Use the following One-Time Password (OTP) to complete your login:
              </Text>
              <Section className="text-center my-[20px]">
                <Text className="text-4xl font-bold text-indigo-600 tracking-[0.25em] m-0">
                  {otpCode}
                </Text>
                <Text className="text-xs text-gray-500 mt-2">
                  This OTP is valid for 10 minutes.
                </Text>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                If you did not request this OTP, please ignore this email.
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This email was sent from Inventory Insights.
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default OtpEmail;