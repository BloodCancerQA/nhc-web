import FaqTemplate from "@/pages/faq/component/FaqTemplate";

const NonHodgkin: React.FC = () => {
    return (
        <FaqTemplate
            title={"非霍奇金淋巴瘤"}
            allowUpload={false}
            chatMind={true}
            collection={"non_Hodgkin"}
        />
    )
};

export default NonHodgkin;
