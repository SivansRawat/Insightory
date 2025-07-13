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
  
  interface WelcomeEmailProps {
    userEmail: string;
  }
  
  export const WelcomeEmail = ({ userEmail }: WelcomeEmailProps) => {
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
                  alt="Insightory Logo"
                  className="my-0 mx-auto"
                /> */}
                <Text className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                  Insightory
                </Text>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                Hello <strong className="font-semibold">{userEmail}</strong>,
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Welcome to Insightory! Your email has been successfully verified.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                We're excited to help you gain valuable insights into your product inventory.
              </Text>
              <Section className="text-center my-[20px]">
                <Button
                  href="http://localhost:3000/dashboard/overview" // Adjust to your deployed dashboard URL
                  className="bg-indigo-600 text-white rounded px-5 py-3 text-[12px] font-semibold no-underline"
                >
                  Go to Dashboard
                </Button>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                If you have any questions, feel free to reach out to our support team.
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This email was sent from Insightory.
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default WelcomeEmail;
