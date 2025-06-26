import { ConfigProvider, type ThemeConfig } from 'antd';
import { StyleProvider, ThemeProvider } from 'antd-style';

// import { commonToken } from '@baidu/ihud';

export const BaseTheme: ThemeConfig = {
    components: {
        // ...commonToken.theme.components,
        Menu: {
            // ...commonToken.theme?.components?.Menu,
            itemBg: '#ffffff',
            subMenuItemBg: '#ffffff',
            itemColor: ' rgba(31,31,31,0.90)',
            itemHoverColor: '#88C1D0',
            itemSelectedBg: '#EFF3F7',
            itemSelectedColor: '#88C1D0',
            itemHoverBg: '#EFF3F7'
            // popupItemColor: '#88C1D0'
        },
        Button: {
            // ...commonToken.theme?.components?.Button,
            colorPrimaryHover: '#7FB8C8',
            colorPrimaryActive: '#88C1D0',
            colorLink: '#88C1D0',
            colorLinkActive: '#88C1D0',
            colorLinkHover: '#7FB8C8',
            primaryShadow: 'none',
            fontSize: 12
        },
        Modal: {
            // ...commonToken.theme?.components?.Modal,
            titleFontSize: 16
        },
        Card: {
            borderRadiusLG: 4
        },
        Tabs: {
            // ...commonToken.theme?.components?.Tabs,
            horizontalItemPadding: '8px 16px',
            horizontalItemPaddingLG: '0px 0px 16px 0px',
            horizontalMargin: '0px'
        },
        Form: {
            labelFontSize: 12,
            fontSize: 12
        },
        Input: {
            fontSize: 12
        },
        Select: {
            optionFontSize: 12,
            fontSize: 12
        },
        Radio: {
            fontSize: 12,
            borderRadius: 4
        },
        Checkbox: {
            fontSize: 14,
            borderRadiusSM: 2
        },
        Table: {
            // ...commonToken.theme?.components?.Table,
            fontWeightStrong: 400
        }
        // AutoComplete: {
        //     borderRadius: 2,
        //     selectorBg: '#ff0000'
        // }
    },
    token: {
        // ...commonToken.theme.token,
        colorPrimary: '#88C1D0',
        fontSize: 14
    }
};

ConfigProvider.config({
    prefixCls: 'nhc-ant5',
    theme: BaseTheme
});

export const AppProvider = (props: any) => {
    let children = props.children;
    return (
        <StyleProvider hashPriority="high" transformers={[]}>
             <ThemeProvider theme={BaseTheme} prefixCls="nhc-ant5">
                 <ConfigProvider autoInsertSpaceInButton={false}>{children}</ConfigProvider>
             </ThemeProvider>
        </StyleProvider>
    );
};
