import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DefaultRootStateProps } from 'types';

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl';

// load locales files
const loadLocaleData = (locale: string) => {
    switch (locale) {
        case 'fr':
            return import('utils/locales/fr.json');
        case 'ro':
            return import('utils/locales/ro.json');
        case 'zh':
            return import('utils/locales/zh.json');
        default:
            return import('utils/locales/en.json');
    }
};

export interface LocalsProps {
    children: React.ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

    useEffect(() => {
        loadLocaleData(customization.locale).then(
            (d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
                setMessages(d.default);
            }
        );
    }, [customization.locale]);

    return (
        <>
            {messages && (
                <IntlProvider locale={customization.locale} defaultLocale="en" messages={messages}>
                    {children}
                </IntlProvider>
            )}
        </>
    );
};

export default Locales;
