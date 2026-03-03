import { useState, useEffect, ReactNode } from 'react';

import { IntlProvider, MessageFormatElement } from 'react-intl';
import { useAppSelector } from '@/lib/store';

const loadLocaleData = (locale: string) => {
    switch (locale) {
        case 'fr':
            return import('@/lib/utils/locales/fr.json');
        case 'es':
            return import('@/lib/utils/locales/es.json');
        case 'he':
            return import('@/lib/utils/locales/he.json');
        case 'hi':
            return import('@/lib/utils/locales/hi.json');
        default:
            return import('@/lib/utils/locales/en.json');
    }
};

export interface LocalsProps {
    children: ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
    const customization = useAppSelector((state) => state.customization);

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
