import { treaty } from '@elysiajs/eden';
import type { App } from '../../../server/src/index';
import type { PageServerLoad } from './$types';

const api = treaty<App>('http://localhost:3000');

export const load: PageServerLoad = async () => {
    const { data, error } = await api.get();

    if (error) {
        return {
            backendMessage: 'Backend is offline'
        };
    }

    return {
        backendMessage: data 
    };
};