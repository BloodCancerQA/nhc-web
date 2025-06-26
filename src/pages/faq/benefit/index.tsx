import FaqTemplate from "@/pages/faq/component/FaqTemplate";

const BenefitPage: React.FC = () => {
    return (
        <FaqTemplate
            title={"扁鹊公益问答"}
            allowUpload={true}
            chatMind={true}
            collection={"faq_benefit"}
        />
    )
};

export default BenefitPage;
