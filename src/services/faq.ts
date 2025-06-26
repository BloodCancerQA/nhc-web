import request from '@/utils/request';

interface WebResponse {
    code: number;
    info: string;
}

// 获取页面配置出参结构
export interface CallLink extends WebResponse {
    data: {
        appName: string;
        customStatement: string;
        customStatementOnOff: string;
        customWelcomeOnOff: string;
        doctorDetailURLOnOff: string;
        faqOnOff: string;
        geriatricsDownYear: number;
        go2URL: string;
        goUrlType: string;
        neonatologyUpDay: number;
        paediatricsUpYear: number;
        registrationURLOnOff: string;
        showProductNameOnOff: string;
        speechOnOff: string;
        telephone: string;
        themeColor: string;
        time2go: number;
        useTelephoneOnOff: string;
        welcomeStatement: string;
    };
}

// 获取医院查询问题类型出参
export interface QueryTypeList extends WebResponse {
    data: Array<{
        id: number;
        title: string;
    }>;
}

// 根据查询问题类型获取问题列表出参
export interface QuestionList extends WebResponse {
    data: {
        answer: null;
        id: number;
        source: string;
        title: string;
        typeId: number;
        typeTitle: string;
    };
}

// 根据问题列表获取问题详情出参
export interface QuestionItem extends WebResponse {
    data: {
        exact: {
            answer: string;
            id: number;
            source: string;
            title: string;
            typeId: number;
            typeTitle: string;
        };
        faqTelephone: string | null;
        similars: Array<{
            answer: null | string;
            id: number;
            source: string;
            title: string;
            typeId: number;
            typeTitle: string;
        }>;
    };
}

// 选择了性别和年龄的 input faq咨询出参
export interface YesSexQueryData extends WebResponse {
    data: {
        type: string;
        departmentResult: {
            departmentInfos: Array<{
                departmentCode: string;
                departmentName: string;
                departmentRegisterUrl: string | null;
                doctorInfo: Array<{
                    code: string;
                    departmentCode: string;
                    departmentTitle: string;
                    detailUrl: string;
                    name: string;
                    picture: string;
                    score: number;
                    specialty: string;
                    title: string;
                    registrationUrl: string;
                }> | null;
            }>;
            hasMatchedDepartments: boolean | null;
            phoneNo: string;
        };
        noneMedical: {
            message: string;
            telephone: number | null;
        };
        symptoms: Array<{
            id: number;
            oralTitle: string | null;
            part: string | null;
            show: number;
            symptoms: string | null;
            title: string;
        }>;
    };
}

// 没有选择性别和年龄的input faq咨询出参
export interface NotSexQueryData extends WebResponse {
    data: {
        medical: boolean;
        message: null | string;
        query: string;
        telephone: null | string;
    };
}

// 医院咨询出参
export interface QueryHospitalData extends WebResponse {
    data: {
        exact?: FaqResponseItem;
        faqTelephone: string | null;
        similars: FaqResponseItem[];
    };
}

export interface FaqResponseItem {
    answer: string;
    id: number;
    source: string;
    title: string;
    typeId: number;
    typeTitle: string;
}

// 记录满意度出参
export interface SurveyData extends WebResponse {
    data: any | null;
}

// 获取配置
export const getCallLink = async (appId: string): Promise<CallLink> => {
    return await request.get('/fz-c-api/diagnosis/configure/data', {
        params: {
            appId
        }
    });
};

// 获取查询问题类型
export const getQueryTypeList = async (appId: string): Promise<QueryTypeList> => {
    return await request.get('/fz-c-api/diagnosis/faq/type-list', {
        params: {
            appId
        }
    });
};

// 根据查询问题类型获取问题类型
export const getQueryTypeQuestionList = async (obj: any): Promise<QuestionList> => {
    return await request.get('/fz-c-api/diagnosis/faq/question-list', {
        params: obj
    });
};

// 根据问题列表获取问题详情内容
export const getQueryQuestionItem = async (obj: any): Promise<QuestionItem> => {
    return await request.get('/fz-c-api/diagnosis/faq/question', {
        params: obj
    });
};

// 分导诊 选择了性别和年龄 input输入框咨询问题
export const getYesSexQueryData = async (obj: any): Promise<YesSexQueryData> => {
    return await request.post('/fz-c-api/diagnosis/fdz/query', {
        data: { ...obj, requestType: 'form' }
    });
};

// 分导诊 未选择性别和年龄 input输入框咨询问题
export const getNotSexQueryData = async (obj: any): Promise<NotSexQueryData> => {
    return await request.post('/fz-c-api/diagnosis/medical/query', {
        data: { ...obj, requestType: 'form' }
    });
};

// 医院咨询 input输入框咨询问题
export const getHospitalQueryData = async (obj: any): Promise<QueryHospitalData> => {
    return await request.post('/faq', {
        data: obj
    });
};
// 扁鹊公益输入框咨询问题
export const postCharityQueryData = async (obj: any): Promise<QueryHospitalData> => {
    return await request.post('/faq', {
        data: obj
    });
};

// 满意度记录
export const setSurveyData = async (obj: any): Promise<SurveyData> => {
    return await request.post('/fz-c-api/diagnosis/survey/back', {
        data: { ...obj, requestType: 'form' }
    });
};

// 埋点
export const setPageLog = async (obj: any): Promise<any> => {
    return await request.post('/fz-b-api/ywz/report/post/data', {
        data: obj
    });
};
export const getIamAuthfunc = async (id: number = 2001) => {
    return await request.get(`/api/iam/prod/${id}/authfunc`, { isMock: false });
};


export const queryModelCollection = async (obj: any, collection: string): Promise<QueryHospitalData> => {
    return await request.post(`/qa_api/search/${collection}`, {
        data: obj
    });
};
