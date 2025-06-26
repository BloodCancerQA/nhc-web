import { useEventListener, useGetState } from 'ahooks';
import { debounce } from 'lodash';
import { useCallback, useRef } from 'react';

const useScroll = (node: any) => {
    // 消息列表滚动高度
    const mesListScrollTop = useRef<number>(0);
    // 是否向上滑动,用来判断是否可以自动下滑
    const [isScrollUp, setIsScrollUp, getIsScrollUp]
        = useGetState<boolean>(false);

    // 滑动到底部
    const scrollToBottom = useCallback(
        (must: boolean = false) => {
            // 如果是向上滑动，就不自动向下滑
            if (getIsScrollUp() && !must) {return;}
            requestAnimationFrame(() => {
                node.current?.scrollTo({
                    top: node.current?.scrollHeight,
                    behavior: 'auto'
                });
            });
        },
        [getIsScrollUp()]
    );

    // 监听向上滑动
    const handleScroll = debounce(
        () => {
            if (node.current) {
                const { scrollTop, scrollHeight, clientHeight } = node.current;
                // 判断触底 打开可自动下滑
                if (getIsScrollUp()) {
                    if (scrollTop + clientHeight >= scrollHeight) {
                        console.log('触底');
                        setIsScrollUp(false);
                    }
                }
                // 判断向上滑动 关闭自动下滑
                if (scrollTop < mesListScrollTop.current) {
                    setIsScrollUp(true);
                    mesListScrollTop.current = 0;
                }
                mesListScrollTop.current = scrollTop;
            }
        },
        10,
        {
            leading: true,
            trailing: false
        }
    );

    // 添加监听滑动事件
    useEventListener('scroll', handleScroll, { target: node });

    return {
        scrollToBottom,
        getIsScrollUp,
        setIsScrollUp
    };

};

export default useScroll;
