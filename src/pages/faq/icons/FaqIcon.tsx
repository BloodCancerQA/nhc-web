/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';

const IconSvg = () => {
    return (
        <svg width="1em" height="1em" viewBox="0 0 13.8617029 12.9437657" version="1.1">
            <g id="第二批p1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="27-1--智能问答-多轮预问诊-发送后可修改" transform="translate(-57.069149, -69.581751)">
                    <g id="编组-41备份-2" transform="translate(40.000000, 56.000000)">
                        <g id="编组" transform="translate(16.000000, 10.000000)">
                            <g id="知识问答默认" transform="translate(0.000000, 2.000000)">
                                <rect id="矩形" x="0" y="0" width="16" height="16"></rect>
                                <path
                                    d="M6.79364307,6.93669933 L10.2734652,6.93669933 L11.3911335,5.54848923 L12.4963489,6.93669933 L12.5349996,6.93669933 C13.6127321,6.93669933 14.486407,7.81037418 14.486407,8.88810673 L14.486407,13.5132088 C14.486407,13.8268312 14.2321658,14.0810724 13.9185434,14.0810724 L13.9185434,14.0810724 L13.9185434,14.0810724"
                                    id="矩形"
                                    stroke="currentColor"
                                    strokeWidth="0.888888889"
                                    strokeLinejoin="round"
                                    transform="translate(10.640025, 9.814781) scale(-1, 1) rotate(-180.000000) translate(-10.640025, -9.814781) "
                                >
                                </path>
                                <path
                                    d="M13.0049255,5.71375038 L13.0049255,10.0554871 C13.0049255,11.133277 12.1312042,12.0069983 11.0534144,12.0069983 L3.46510414,12.0069983 C2.3873143,12.0069983 1.513593,11.133277 1.513593,10.0554871 L1.513593,5.71364665 C1.513593,4.6359141 2.38726786,3.76223925 3.46500041,3.76223925 L8.46627097,3.76223925 L8.46627097,3.76223925 L9.67034894,2.02619559 L10.8610112,3.76223925 L11.0534144,3.76223925 C12.1312042,3.76223925 13.0049255,4.63596054 13.0049255,5.71375038 Z"
                                    id="矩形"
                                    stroke="currentColor"
                                    strokeWidth="0.888888889"
                                    strokeLinejoin="round"
                                    transform="translate(7.259259, 7.016597) rotate(-180.000000) translate(-7.259259, -7.016597) "
                                >
                                </path>
                                <text
                                    id="FAQ"
                                    stroke="currentColor"
                                    strokeWidth="0.145454545"
                                    fontFamily="PingFangSC-Medium, PingFang SC"
                                    fontSize="4.74074074"
                                    fontWeight="400"
                                    letterSpacing="-0.0296296293"
                                    fill="currentColor"
                                >
                                    <tspan x="2.49659259" y="7.96835017">
                                        FAQ
                                    </tspan>
                                </text>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

const IconImg = (props: Partial<CustomIconComponentProps>) => <Icon {...props} component={IconSvg} />;
export default IconImg;
