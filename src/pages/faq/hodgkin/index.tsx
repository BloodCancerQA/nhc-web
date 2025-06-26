import FaqTemplate from "@/pages/faq/component/FaqTemplate";

const HodgkinPage: React.FC = () => {
    return (
        <FaqTemplate
            title={"霍奇金淋巴瘤"}
            allowUpload={false}
            chatMind={true}
            collection={"Hodgkin"}
        />
    )
};

export default HodgkinPage;
