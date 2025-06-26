import { useState } from 'react';

interface IContent {
    title: string;
    pdfs: any[];
}

const usePdfState = () => {
    // 当前 pdf 列表
    const [pdf, setPdf] = useState<IContent>({
        title: '罗氏血液科文献',
        pdfs: []
    });

    const [pdfList, setPdfList] = useState<IContent[]>([]);

    const [pdfs, setPdfs] = useState<IContent[]>([]);

    const [pdfname, setPdfname] = useState<string>('罗氏血液科文献');

    return {
        pdfname,
        setPdfname,
        pdf,
        setPdf,
        pdfList,
        setPdfList,
        pdfs,
        setPdfs
    };
};

export default usePdfState;
